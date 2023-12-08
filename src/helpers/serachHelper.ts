import { FilterQuery, Query } from 'mongoose'
import { TQueryObj } from '../types/TQueryObj'

export const search = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.searchTerm) {
    // console.log(modelQuery.model.schema.path('names'), 'path function')
    // console.log(modelQuery.model.schema.paths, 'paths array')
    const fieldValues = Object.values(modelQuery.model.schema.paths)
    const searchableFields = fieldValues
      .filter((fieldObj) => {
        if (fieldObj.instance === 'String') {
          return true
        }
      })
      .map(
        (fieldObj) =>
          ({
            [fieldObj.path]: { $regex: query.searchTerm, $options: 'i' },
          }) as FilterQuery<T>,
      )
    //   [
    //     {
    //         name: { $regex: query.searchTerm, $options: 'i' },
    //         },
    //         {
    //         startLocation: { $regex: query.searchTerm, $options: 'i' },
    //     }
    //   ]

    modelQuery.find({
      $or: searchableFields,
    })
  }

  return modelQuery
}
