import { JwtPayload } from 'jsonwebtoken'
import config from '../config'
import { jwtHelpers } from '../helpers/jwtHelpers'
import { IUser } from '../interfaces/user.interface'
import User from '../models/user.model'
import { passwordHelpers } from './../helpers/passwordHelpers'

interface IRegister
  extends Omit<IUser, 'userStatus' | 'role' | 'passwordChangedAt'> {}

const register = async (payload: IRegister) => {
  const password = payload.password
  //generates random bytes of 16 characters. Hexadecimal number
  //combined random bytes with password
  const hashedPassword = await passwordHelpers.hashPassword(password)

  const result = await User.create({
    ...payload,
    password: hashedPassword,
    userStatus: 'active',
    role: 'user',
  })

  return result
}

interface ILogin {
  email: string
  password: string
}

const login = async (payload: ILogin) => {
  //if the user exists
  const user = await User.findOne({ email: payload.email }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  const plainTextPassword = payload.password
  const hashedPassword = user.password

  const isCorrectPassword = await passwordHelpers.comparePassword(
    plainTextPassword,
    hashedPassword,
  )
  if (!isCorrectPassword) {
    throw new Error('Invalid credentials')
  }

  //JWT - 3 Parts
  //Header - Payload - Signature
  //Header - Algorithm + Type
  //Payload - Data ( email, role, userId, name)
  //Signature - Secret Key

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  }
  // const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret, {
  //   expiresIn: config.jwt_access_expires_in,
  // })

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  )

  const refreshToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_refresh_secret,
    {
      expiresIn: config.jwt_refresh_expires_in,
    },
  )

  return {
    accessToken,
    refreshToken,
  }
}

// if the user is authorized to change password
//old password, new password
const changePassword = async (
  decodedToken: JwtPayload,
  payload: {
    oldPassword: string
    newPassword: string
  },
) => {
  const { email, iat } = decodedToken
  console.log(iat, 'iat')

  const user = await User.findOne({ email }).select('+password')

  if (!user) {
    throw new Error('Invalid credentials')
  }

  if (!iat) {
    throw new Error('Invalid token')
  }

  console.log(user.passwordChangedAt, 'passwordChangedAt')
  //token issued before password changed
  //after the change of the change of the password, we should not allow the user to use the old token
  if (user.passwordChangedAt && iat < user.passwordChangedAt.getTime() / 1000) {
    throw new Error('Old token')
  }

  const isCorrectPassword = await passwordHelpers.comparePassword(
    payload.oldPassword,
    user.password,
  )

  if (!isCorrectPassword) {
    throw new Error('Invalid credentials')
  }

  const hashedPassword = await passwordHelpers.hashPassword(payload.newPassword)

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    {
      password: hashedPassword,
      passwordChangedAt: new Date(),
    },
    {
      new: true,
    },
  )

  return updatedUser

  //old token = token1
  //old password = password1

  //new password = password2
  //old token = token1 -> invalid
}

const refreshToken = async (refreshToken: string) => {
  const decodedToken = jwtHelpers.verifyToken(
    refreshToken,
    config.jwt_refresh_secret,
  )

  const { email } = decodedToken as JwtPayload

  const user = await User.findOne({ email })

  if (!user) {
    throw new Error('Invalid token')
  }

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  }

  const accessToken = jwtHelpers.createToken(
    jwtPayload,
    config.jwt_access_secret,
    {
      expiresIn: config.jwt_access_expires_in,
    },
  )

  return {
    accessToken,
  }
  //accessToken - 1d
  //refreshToken - 30d
  //after 1d, the user will be logged out
  // after 1d , if the user is logged in and he is browsing the site, we will issue a new accessToken. So that the user will not be logged out
}

// const forgetPassword = async (payload: {}) => {}

export const authServices = {
  register,
  login,
  changePassword,
  refreshToken,
}
