import { Query } from 'mongoose'
import { TQueryObj } from '../types/TQueryObj'

export const filter = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  const queryObj = { ...query }
  //exact match
  const excludedFields = [
    'page',
    'searchTerm',
    'limit',
    'sortBy',
    'sortOrder',
    'fields',
  ]
  excludedFields.forEach((keyword) => delete queryObj[keyword])

  modelQuery = modelQuery.find(queryObj)
  return modelQuery
}
