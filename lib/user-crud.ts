import { z } from "zod"
import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"
import { userFormSchema, type User, type UserFormData } from "@/app/actions/schemas"

// Shared Zod schemas for parameter validation
export const searchUserSchema = z.object({
  query: z.string().min(1, "Search query must not be empty")
})

export const userIdSchema = z.object({
  id: z.string().cuid()
})

export const addUserSchema = userFormSchema

export const updateUserSchema = z.object({
  id: z.string().cuid(),
  data: userFormSchema.partial()
})

// Shared CRUD logic used by both MCP handler and server actions
export async function searchUsers(query: string): Promise<User[]> {
  // Validate input using the shared schema
  const validated = searchUserSchema.parse({ query })
  
  // Database-agnostic search using startsWith for better compatibility
  const results = await prisma.user.findMany({
    where: {
      name: {
        startsWith: validated.query
      }
    },
    orderBy: {
      name: 'asc'
    }
  })
  
  return results.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    phoneNumber: user.phoneNumber
  }))
}

export async function addUser(data: UserFormData): Promise<User> {
  // Validate input using the shared schema
  const validated = addUserSchema.parse(data)
  
  try {
    const newUser = await prisma.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        phoneNumber: validated.phoneNumber
      }
    })
    
    revalidatePath('/')
    
    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phoneNumber: newUser.phoneNumber
    }
  } catch (error: unknown) {
    // Handle unique constraint violation (email already exists)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      throw new Error(`A user with email "${data.email}" already exists`)
    }
    
    // Handle other database errors
    throw new Error('Failed to add user. Please try again.')
  }
}

export async function getUserById(id: string): Promise<User | null> {
  // Validate input using the shared schema
  const validated = userIdSchema.parse({ id })
  
  try {
    const user = await prisma.user.findUnique({
      where: { id: validated.id }
    })
    
    if (!user) {
      return null
    }
    
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    }
  } catch (error) {
    console.error('Error getting user by id:', error)
    return null
  }
}

export async function updateUser(id: string, data: Partial<UserFormData>): Promise<User> {
  // Validate input using the shared schema
  const validated = updateUserSchema.parse({ id, data })
  
  try {
    const updatedUser = await prisma.user.update({
      where: { id: validated.id },
      data: {
        ...(validated.data.name && { name: validated.data.name }),
        ...(validated.data.email && { email: validated.data.email }),
        ...(validated.data.phoneNumber && { phoneNumber: validated.data.phoneNumber })
      }
    })
    
    revalidatePath('/')
    
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber
    }
  } catch (error: unknown) {
    // Handle unique constraint violation (email already exists)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
      throw new Error(`A user with email "${data.email}" already exists`)
    }
    
    // Handle record not found
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      throw new Error(`User with id ${id} not found`)
    }
    
    // Handle other database errors
    throw new Error('Failed to update user. Please try again.')
  }
}

export async function deleteUser(id: string): Promise<void> {
  // Validate input using the shared schema
  const validated = userIdSchema.parse({ id })
  
  try {
    await prisma.user.delete({
      where: { id: validated.id }
    })
    
    revalidatePath('/')
  } catch (error: unknown) {
    // Handle record not found
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
      throw new Error(`User with id ${id} not found`)
    }
    
    // Handle other database errors
    throw new Error('Failed to delete user. Please try again.')
  }
}

export async function listAllUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        name: 'asc'
      }
    })
    
    return users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber
    }))
  } catch (error) {
    console.error('Error listing users:', error)
    throw new Error('Failed to list users. Please try again.')
  }
}

// Tool definitions that can be reused
export const userCrudTools = {
  searchUsers: {
    name: 'search_users',
    description: 'Search for users by name',
    schema: searchUserSchema,
  },
  addUser: {
    name: 'add_user',
    description: 'Add a new user to the database',
    schema: addUserSchema,
  },
  getUser: {
    name: 'get_user',
    description: 'Get a user by their ID',
    schema: userIdSchema,
  },
  updateUser: {
    name: 'update_user',
    description: 'Update an existing user',
    schema: updateUserSchema,
  },
  deleteUser: {
    name: 'delete_user',
    description: 'Delete a user by their ID',
    schema: userIdSchema,
  },
  listUsers: {
    name: 'list_users',
    description: 'List all users in the database',
    schema: z.object({}),
  }
} as const
