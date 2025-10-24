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
