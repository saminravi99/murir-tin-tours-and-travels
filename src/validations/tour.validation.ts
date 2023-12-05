import { z } from 'zod'

export const createTourZodSchema = z
  .object({
    name: z.string().refine(
      (data) => {
        if (data.length < 5) {
          return false
        }
      },
      {
        message: 'Name must be less than 5 characters',
      },
    ),
    durationHours: z
      .number()
      .int()
      .positive()
      .min(1)
      .refine(
        (data) => {
          if (data < 5) {
            return false
          }
        },
        {
          message: 'Duration must be greater than 5 hours',
        },
      ),
    ratingAverage: z.number().int().positive().min(1).max(5),
    price: z.number().int().positive().min(1),
    discountPrice: z.number().int().positive().min(1).optional(),
  })
  .refine(
    (data) => {
      if (data.discountPrice === undefined) {
        return true
      }
      if (data.discountPrice > data.price) {
        return false
      }
    },
    {
      message: 'Discount price must be less than price',
    },
  )
