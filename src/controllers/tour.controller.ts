/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express'
import { tourServices } from '../services/tour.service'
import catchAsyncFunction from '../utils/catchAsync'
import sendSuccessResponse from '../utils/sendResponse'

// const fn = async () => {
//   const anotherFn = async () => {}
//   return anotherFn
// }

//HOF - Higher Order Function
// recieves a function as an argument/ parameter and / or returns a function
// const catchAsyncFunction = (fn: RequestHandler) => {
//   return (req: Request, res: Response, next: NextFunction) => {
//     Promise.resolve(fn(req, res, next)).catch((error: any) => next(error))
//   }
//   //{
//   // name : 'Rahim',
//   // age: 30
//   // }
// }
// X calls Y -> Y call Z
//catchAsync --> call korle ekta function ashbe -> shei function ke router call korbe sathe req, res,next diye dibe -> jei function ta router call korsilo shei function  amader nijosho function call kore dibe with req, res next
// const createTour = (req: Request, res: Response, next: NextFunction) => {
//   Promise.resolve(fn(req, res, next)).catch((error: any) => next(error))

//    catchAsyncFunction(async (req: Request, res: Response) => {
//      const tourData = req.body
//      const result = await tourServices.createTour(tourData)
//      sendSuccessResponse(res, {
//        statusCode: 201,
//        message: 'Tour created successfully',
//        data: result,
//      })
//    })
// }

//middleware e data validate kore req.body data put kore 

const createTour = catchAsyncFunction(async (req: Request, res: Response) => {
  //req.body theke user theke data  nicchi
  //zod schema diye user data ke parse kortesi
  console.log(req.body, "from controller");
  const tourData = req.body

  const result = await tourServices.createTour(tourData)
  sendSuccessResponse(res, {
    statusCode: 201,
    message: 'Tour created successfully',
    data: result,
  })
})

// app vitore next call -> router -> controller -> response -> but error hoise -> next(error) ->

const getAllTours = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await tourServices.getAllTours(req.query)
  // throw new Error('Something went wrong')
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Tour fetched successfully',
    data: result,
  })
})
const getSingleTour = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await tourServices.getSingleTour(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Single Tour fetched successfully',
      data: result,
    })
  },
)
const updateTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const tourData = req.body
  const id = req.params.id
  const result = await tourServices.updateTour(id, tourData)
  res.status(200).json({
    status: 'success',
    message: 'Tour updated successfully',
    data: result,
  })
})
const getNextSchedule = catchAsyncFunction(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result = await tourServices.getNextSchedule(id)
    sendSuccessResponse(res, {
      statusCode: 200,
      message: 'Next Schedule fetched successfully',
      data: result,
    })
  },
)
const deleteTour = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = req.params.id
  await tourServices.deleteTour(id)
  sendSuccessResponse(res, {
    statusCode: 200,
    message: 'Tour deleted successfully',
    data: null,
  })
})

export const tourController = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
