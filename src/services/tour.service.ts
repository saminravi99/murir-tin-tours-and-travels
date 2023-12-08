/* eslint-disable @typescript-eslint/no-explicit-any */
import { getQuery } from '../helpers/getQuery'
import { ITour } from '../interfaces/tour.interface'
import Tour from '../models/tour.model'
import { TQueryObj } from '../types/TQueryObj'

const createTour = async (tourData: any): Promise<ITour> => {
  const result = await Tour.create(tourData)

  return result
}

// const filter = <T>(modelQuery: Query<T[], T>, queryObj: TQueryObj) => {
//   const excludedFields = [
//     'page',
//     'searchTerm',
//     'limit',
//     'sortBy',
//     'sortOrder',
//     'fields',
//   ]
//   excludedFields.forEach((keyword) => delete queryObj[keyword])

//   modelQuery = modelQuery.find(queryObj)
//   return modelQuery
// }

const getAllTours = async (query: TQueryObj): Promise<ITour[]> => {
  // const queryObj = { ...query }
  // console.log(queryObj, 'before delete')
  // // {
  // //   name : "Dhaka-Cox's Bazaar",
  // //   page : "3",
  // //   limit : "10",
  // //   searchTerm : "Dhaka",
  // //   sortBy : "price",
  // //   sortOrder : "asc",
  // //   fields : "name"

  // // }
  // //reserved keywords for filtering

  // console.log(queryObj, 'after delete')
  // const result = await Tour.find(queryObj)
  // return result
  console.log(query, 'from service')
  // const result = await filter(
  //   Tour.find(
  //     // less than, greater than, less than equal, greater than equal, not equal, equal
  //     // lt, gt, lte, gte, ne, eq
  //     // ?price[lt]=1200
  //     // req.query = { price: { lt: 1200 }}

  //     // ?price[$gt]=1200
  //     // req.query = { price: { $gt: 1200 }}
  //     // { price: { $lt: 1200 } },
  //   ),
  //   query,
  // )
  //exact match

  // const modelQuery = filter(Tour.find(), query)

  // partial match - searching
  // if (query.searchTerm) {
  //   // const searchableFields = ['name', 'startLocation']
  //   console.log(modelQuery.model.schema.paths, 'paths er object of object')
  //   // {
  //   //   name : {
  //   //     path : "name",
  //   //     instance : "String",
  //   //.........................//
  //   //   },
  //   //   startLocation : {
  //   //     path : "startLocation",
  //   //     instance : "String",
  //   //.........................//
  //   // },
  //   //   price : {
  //   //     path : "price",
  //   //     instance : "Number",
  //   // }
  //   // }
  //   // console.log(modelQuery.model.schema.paths, 'paths array')
  //   const fieldValues = Object.values(modelQuery.model.schema.paths)
  //   const searchableFields = fieldValues
  //     .filter((fieldObj) => {
  //       if (fieldObj.instance === 'String') {
  //         return true
  //       }
  //     })
  //     .map((fieldObj) => ({
  //       [fieldObj.path]: { $regex: query.searchTerm, $options: 'i' },
  //     }))
  //   console.log(searchableFields, 'searchableFields')
  //   // console.log(fieldValues)
  //   //  const searchRegex = new RegExp(query.searchTerm, 'i')
  //   //  modelQuery.find({ name: searchRegex })

  //   modelQuery.find({
  //     // name: { $regex: query.searchTerm, $options: 'i' },
  //     // startLocation: { $regex: query.searchTerm, $options: 'i' },

  //     //or operator
  //     // $or: [
  //     //   {
  //     //     name: { $regex: query.searchTerm, $options: 'i' },
  //     //   },
  //     //   {
  //     //     startLocation: { $regex: query.searchTerm, $options: 'i' },
  //     //   },
  //     // ],

  //     $or: searchableFields,
  //   })
  // }

  // if (query.sortBy && query.sortOrder) {
  //   const sortBy = query.sortBy //"price" | "duration" | "ratingsAverage"
  //   const sortOrder = query.sortOrder //"asc" | "desc"
  //   const sortStr = `${sortOrder === 'desc' ? '-' : ''}${sortBy}`
  //   searchedQuery.sort(sortStr)
  //   // Tour.find().sort('price')
  // }

  //100 tours

  //limit = 10
  //1 page - 10 tours : Tour no1 - Tour no10
  //2 page - 10 tours : Tour no11 - Tour no20

  //limit = 20
  // 1 page - 20 tours : Tour no1 - Tour no20
  // 2 page - 20 tours : Tour no21 - Tour no40 => skip 20 tours
  // 3 page - 20 tours : Tour no41 - Tour no60 => skip 40 tours

  // page = 3
  // limit =20
  // skip = (page-1) * limit
  //skip = (3-1) * 20 = 40

  // if (query.fields) {
  //   const fields = query.fields.split(',').join(' ')
  //   console.log(fields, 'fields')
  //   paginatedQuery.select(fields)
  // }
  const result  = await getQuery(Tour.find(), query)
  // const result = await modelQuery

  return result
}

const getSingleTour = async (id: string): Promise<ITour | null> => {
  const result = await Tour.findById(id).populate('reviews')
  return result
}

const updateTour = async (
  id: string,
  tourData: ITour,
): Promise<ITour | null> => {
  const result = await Tour.findByIdAndUpdate(id, tourData, {
    new: true,
    runValidators: true,
  })

  return result
}

const deleteTour = async (id: string): Promise<ITour | null> => {
  const result = await Tour.findByIdAndDelete(id)
  return result
}

const getNextSchedule = async (id: string): Promise<any> => {
  const tour = await Tour.findById(id)
  const nextSchedule = tour?.getNextNearestStartDateAndEndDate()

  return {
    tour,
    nextSchedule,
  }
}

export const tourServices = {
  createTour,
  getAllTours,
  getSingleTour,
  updateTour,
  deleteTour,
  getNextSchedule,
}
