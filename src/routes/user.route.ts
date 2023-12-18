import express, { NextFunction, Request, Response } from 'express'
import { userController } from '../controllers/user.controller'
import User from '../models/user.model'
import checkAuth from '../middlewares/checkAuth'
import { USER_ROLE } from '../constants/users.constant'

const router = express.Router()

router.post(
  '/create-user',
  async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email, password })

    //Authentication
    if (!user) {
      res.status(403).json({
        status: 'fail',
        message: 'Invalid email or password',
      })
    }

    //Authorization
    if (user?.role !== 'admin') {
      res.status(403).json({
        status: 'fail',
        message: 'You are not authorized to create user',
      })
    }

    next()
  },
  userController.createUser,
)
router.get(
  '/',
  checkAuth(USER_ROLE.admin),
  //   async (req: Request, res: Response, next: NextFunction) => {
  //     const email = req.body.email
  //     const password = req.body.password

  //     const user = await User.findOne({ email, password })

  //     //Authentication
  //     if (!user) {
  //       //   res.status(403).json({
  //       //     status: 'fail',
  //       //     message: 'Invalid email or password',
  //       //   })
  //       next(new Error('Invalid email or password'))
  //     }

  //     //Authorization
  //     // if (user?.role !== 'admin') {
  //     //   res.status(403).json({
  //     //     status: 'fail',
  //     //     message: 'You are not authorized to create user',
  //     //   })
  //     // }

  //     next()
  //   },
  userController.getAllUsers,
)
router.get(
  '/:id',
  checkAuth(USER_ROLE.user, USER_ROLE.admin),
  userController.getSingleUser,
)
router.patch('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

export const userRoutes = router
