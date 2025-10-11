// app/actions/schemas.ts

import { z } from 'zod'
import type { User as PrismaUser } from '@prisma/client'

export const userSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phoneNumber: z.string().regex(/^04\d{8}$/, { message: "Phone number must be a valid Australian mobile number (e.g., 0422018632)." }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
})

export type User = z.infer<typeof userSchema>

// For compatibility with Prisma types
export type UserWithDates = PrismaUser

export const userFormSchema = userSchema.omit({ id: true, createdAt: true, updatedAt: true })
export type UserFormData = z.infer<typeof userFormSchema>
