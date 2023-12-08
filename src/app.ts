/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express'
import { userRoutes } from './routes/user.route'
import cors from 'cors'
import { tourRoutes } from './routes/tour.route'
import { reviewRoutes } from './routes/review.route'
import globalErrorHandler from './middlewares/globalErrorHandler'
import notFound from './middlewares/notFound'
import globalRoute from './routes'

const app: Application = express()

app.use(express.json())
app.use(cors())

app.use('/api/v1', globalRoute)
//ber hoye jabe

//app.get(middleware-1, middleware-2, middleware-3, controller)
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to  Murir Tin Tours & Travels',
  })
})

//catch all route - Trying to catch a Not Found Route
//Controller Approach
// Way-1
// app.all('*', (req: Request, res: Response) => {
//   console.log(req.originalUrl)
//   res.status(404).json({
//     status: 'fail',
//     message: `Route Not Found for ${req.originalUrl}`,
//   })
// })

// Way-2
// app.get('*', notFound)
// app.post('*', notFound)

//Middleware Approach
// app.use("*", notFound)
// app.all('*', notFound)
app.use(notFound)

//Global Error Handler - Mini Version
app.use(globalErrorHandler)
// app.use((err: any, req: Request, res: Response, next: NextFunction) => {
//   const statusCode = err.statusCode || 500
//   const message = err.message || 'Something went wrong'
//   const status = err.status || 'error'

//   res.status(statusCode).json({
//     status,
//     message,
//   })
// })

//express app - train

export default app
