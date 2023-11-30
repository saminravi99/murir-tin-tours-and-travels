/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express'
import { tourController } from '../controllers/tour.controller'

const router = express.Router()

// const catchAsyncFunction = (fn: any) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res)).catch((error: any) => next(error))
//   }
// }

router.post('/create-tour', tourController.createTour)
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
