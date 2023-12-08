import { Query } from 'mongoose'
import { TQueryObj } from '../types/TQueryObj'

export const select = <T>(modelQuery: Query<T[], T>, query: TQueryObj) => {
  if (query.fields) {
    const fields = query.fields.split(',').join(' ')
    console.log(fields, 'fields')
    modelQuery.select(fields)
  }

  return modelQuery
}
