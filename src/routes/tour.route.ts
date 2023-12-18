/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { tourController } from '../controllers/tour.controller'
// import { validateRequest } from '../middlewares/validateRequest'
// import { createTourZodSchema } from '../validations/tour.validation'

const router = express.Router()

// const catchAsyncFunction = (fn: any) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res)).catch((error: any) => next(error))
//   }
// }

//Higher Order Function & Middleware
// const validateRequest = (schema: ZodSchema) => {
//   return async (req: Request, res: Response, next: NextFunction) => {
//     const result = await schema.safeParseAsync(req.body)
//     if (!result.success) {
//       next(result.error)
//     } else {
//       req.body = result.data
//       next()
//     }
//   }
// }

router.post(
  '/create-tour',
  // validateRequest(createTourZodSchema),
  tourController.createTour,
)
router.get('/', tourController.getAllTours)
// router.get('/', catchAsyncFunction() ------> (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res)).catch((error: any) => next(error))
//   })
//router jokhon funtion ke call kore tokhon o oi function er modhe req, res, next ei 3 ta diye dey
//tourController.getAllTours(req, res, next)
router.get('/:id', tourController.getSingleTour)
router.patch('/:id', tourController.updateTour)
router.delete('/:id', tourController.deleteTour)
router.get('/:id/next-schedule', tourController.getNextSchedule)

export const tourRoutes = router
