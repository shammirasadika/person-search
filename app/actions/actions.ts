//app/actions/actions.ts

'use server'

import { User, UserFormData } from './schemas'
import { cache } from 'react'
import {
    searchUsers as searchUsersCore,
    addUser as addUserCore,
    deleteUser as deleteUserCore,
    updateUser as updateUserCore,
    getUserById as getUserByIdCore
} from '@/lib/user-crud'

// Re-export functions using shared logic
export async function searchUsers(query: string): Promise<User[]> {
    console.log('Searching users with query:', query)
    const results = await searchUsersCore(query)
    console.log('Search results:', results)
    return results
}

export async function addUser(data: UserFormData): Promise<User> {
    console.log('Adding user:', data)
    const user = await addUserCore(data)
    console.log('User created successfully:', user.id)
    return user
}

export async function deleteUser(id: string): Promise<void> {
    console.log('Deleting user with id:', id)
    await deleteUserCore(id)
    console.log(`User with id ${id} has been deleted.`)
}

export async function updateUser(id: string, data: Partial<UserFormData>): Promise<User> {
    console.log('Updating user with id:', id, 'data:', data)
    const user = await updateUserCore(id, data)
    console.log(`User with id ${id} has been updated.`)
    return user
}

export const getUserById = cache(async (id: string): Promise<User | null> => {
    console.log('Getting user by id:', id)
    const user = await getUserByIdCore(id)
    return user
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
