import express from 'express'
import routes from '../constants/routes.constants.'

const globalRoute = express.Router()

routes.forEach((routeObject) => {
  globalRoute.use(routeObject.path, routeObject.route)
})

export default globalRoute
