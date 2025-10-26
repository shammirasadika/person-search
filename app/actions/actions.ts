//app/actions/actions.ts

'use server'

import { User, UserFormData } from './schemas'
import { cache } from 'react'
import { auth } from '@/auth'
import {
    searchUsers as searchUsersCore,
    addUser as addUserCore,
    deleteUser as deleteUserCore,
    updateUser as updateUserCore,
    getUserById as getUserByIdCore
} from '@/lib/user-crud'

// Helper function to check authentication
async function requireAuth() {
    const session = await auth()
    if (!session?.user) {
        throw new Error('Unauthorized: You must be logged in to perform this action')
    }
    return session
}

// Re-export functions using shared logic
export async function searchUsers(query: string): Promise<User[]> {
    await requireAuth() // Check authentication
    console.log('Searching users with query:', query)
    const results = await searchUsersCore(query)
    console.log('Search results:', results)
    return results
}

export async function addUser(data: UserFormData): Promise<User> {
    await requireAuth() // Check authentication
    console.log('Adding user:', data)
    const user = await addUserCore(data)
    console.log('User created successfully:', user.id)
    return user
}

export async function deleteUser(id: string): Promise<void> {
    await requireAuth() // Check authentication
    console.log('Deleting user with id:', id)
    await deleteUserCore(id)
    console.log(`User with id ${id} has been deleted.`)
}

export async function updateUser(id: string, data: Partial<UserFormData>): Promise<User> {
    await requireAuth() // Check authentication
    console.log('Updating user with id:', id, 'data:', data)
    const user = await updateUserCore(id, data)
    console.log(`User with id ${id} has been updated.`)
    return user
}

export const getUserById = cache(async (id: string): Promise<User | null> => {
    await requireAuth() // Check authentication
    console.log('Getting user by id:', id)
    const user = await getUserByIdCore(id)
    return user
})
