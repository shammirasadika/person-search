//app/actions/actions.ts

'use server'

import { revalidatePath } from 'next/cache'
import { User, UserFormData } from './schemas'
import { cache } from 'react'
import { prisma } from '@/lib/db'

export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    
    // Database-agnostic search using startsWith for better compatibility
    const results = await prisma.user.findMany({
        where: {
            name: {
                startsWith: query
            }
        },
        orderBy: {
            name: 'asc'
        }
    })
    
    console.log('Search results:', results)
    return results.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber
    }))
}

export async function addUser(data: UserFormData): Promise<User> {
    console.log('Adding user:', data)
    
    try {
        const newUser = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                phoneNumber: data.phoneNumber
            }
        })
        
        console.log('User created successfully:', newUser.id)
        revalidatePath('/')
        
        return {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phoneNumber: newUser.phoneNumber
        }
    } catch (error: unknown) {
        console.error('Error adding user:', error)
        
        // Handle unique constraint violation (email already exists)
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2002') {
            throw new Error(`A user with email "${data.email}" already exists`)
        }
        
        // Handle other database errors
        throw new Error('Failed to add user. Please try again.')
    }
}

export async function deleteUser(id: string): Promise<void> {
    console.log('Deleting user with id:', id)
    
    try {
        await prisma.user.delete({
            where: { id }
        })
        
        console.log(`User with id ${id} has been deleted.`)
        revalidatePath('/')
    } catch (error: unknown) {
        console.error('Error deleting user:', error)
        
        // Handle record not found
        if (error && typeof error === 'object' && 'code' in error && error.code === 'P2025') {
            throw new Error(`User with id ${id} not found`)
        }
        
        // Handle other database errors
        throw new Error('Failed to delete user. Please try again.')
    }
}

export async function updateUser(id: string, data: Partial<UserFormData>): Promise<User> {
    console.log('Updating user with id:', id, 'data:', data)
    
    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(data.name && { name: data.name }),
                ...(data.email && { email: data.email }),
                ...(data.phoneNumber && { phoneNumber: data.phoneNumber })
            }
        })
        
        const validatedUser = {
            id: updatedUser.id,
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber
        }
        
        console.log(`User with id ${id} has been updated.`)
        revalidatePath('/')
        
        return validatedUser
    } catch (error: unknown) {
        console.error('Error updating user:', error)
        
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

export const getUserById = cache(async (id: string): Promise<User | null> => {
    console.log('Getting user by id:', id)
    
    try {
        const user = await prisma.user.findUnique({
            where: { id }
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
})

// Seed function to populate the database with initial data
export async function seedDatabase() {
    const existingUsers = await prisma.user.count()
    
    if (existingUsers === 0) {
        console.log('Seeding database with initial users...')
        
        const initialUsers = [
            { name: 'John Doe', phoneNumber: '0412345678', email: 'john@example.com' },
            { name: 'Jane Smith', phoneNumber: '0423456789', email: 'jane@example.com' },
            { name: 'Alice Johnson', phoneNumber: '0434567890', email: 'alice@example.com' },
            { name: 'Bob Williams', phoneNumber: '0445678901', email: 'bob@example.com' },
            { name: 'Charlie Brown', phoneNumber: '0456789012', email: 'charlie@example.com' },
            { name: 'Emily Davis', phoneNumber: '0467890123', email: 'emily@example.com' },
            { name: 'Frank Miller', phoneNumber: '0478901234', email: 'frank@example.com' },
            { name: 'Grace Lee', phoneNumber: '0489012345', email: 'grace@example.com' },
            { name: 'Henry Moore', phoneNumber: '0490123456', email: 'henry@example.com' },
            { name: 'Isabella Young', phoneNumber: '0401234567', email: 'isabella@example.com' },
        ]
        
        await prisma.user.createMany({
            data: initialUsers
        })
        
        console.log('Database seeded successfully')
    }
}
