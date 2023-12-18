/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { authServices } from '../services/auth.service'
import catchAsyncFunction from '../utils/catchAsync'
import sendSuccessResponse from '../utils/sendResponse'
import config from '../config'

const register = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await authServices.register(req.body)

  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'User registered successfully',
    data: result,
  })
})

const login = catchAsyncFunction(async (req: Request, res: Response) => {
  const { accessToken, refreshToken } = await authServices.login(req.body)

  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: config.node_env === 'production',
  })

  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'User logged in successfully',
    data: { accessToken },
  })
})

const changePassword = catchAsyncFunction(
  async (req: Request, res: Response) => {
    // const token = req.headers.authorization
    // if (!token) {
    //   throw new Error('Invalid token')
    // }
    // const decodedToken = jwtHelpers.verifyToken(token, config.jwt_access_secret)
    const decodedToken = req.user
    const result = await authServices.changePassword(decodedToken, req.body)

    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Password changed successfully',
      data: result,
    })
  },
)

const refreshToken = catchAsyncFunction(async (req: Request, res: Response) => {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    throw new Error('Invalid token')
  }
  const result = await authServices.refreshToken(refreshToken)

  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Token refreshed successfully',
    data: result,
  })
})

export const authController = {
  register,
  login,
  changePassword,
  refreshToken,
}
