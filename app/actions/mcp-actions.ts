'use server'

import {
  searchUsers as searchUsersCore,
  addUser as addUserCore,
  getUserById as getUserByIdCore,
  updateUser as updateUserCore,
  deleteUser as deleteUserCore,
  listAllUsers as listAllUsersCore,
  userCrudTools
} from "@/lib/user-crud"
import type { UserFormData } from "./schemas"

// Server action for searching users
export async function searchUsers(query: string) {
  try {
    const users = await searchUsersCore(query)
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: users.length > 0 
              ? `Found ${users.length} user(s)` 
              : 'No users found matching your query.'
          }
        ],
        data: users
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to search users'
      }
    }
  }
}

// Server action for adding a user
export async function addUser(data: UserFormData) {
  try {
    const user = await addUserCore(data)
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: `✅ Successfully added user: ${user.name}`
          }
        ],
        data: user
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to add user'
      }
    }
  }
}

// Server action for getting a user by ID
export async function getUserById(id: string) {
  try {
    const user = await getUserByIdCore(id)
    
    if (!user) {
      return {
        success: false,
        error: {
          code: -32602,
          message: `User with ID ${id} not found`
        }
      }
    }
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: `User: ${user.name}`
          }
        ],
        data: user
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to get user'
      }
    }
  }
}

// Server action for updating a user
export async function updateUser(id: string, data: Partial<UserFormData>) {
  try {
    const user = await updateUserCore(id, data)
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: `✅ Successfully updated user: ${user.name}`
          }
        ],
        data: user
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to update user'
      }
    }
  }
}

// Server action for deleting a user
export async function deleteUser(id: string) {
  try {
    await deleteUserCore(id)
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: `✅ Successfully deleted user with ID: ${id}`
          }
        ]
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to delete user'
      }
    }
  }
}

// Server action for listing all users
export async function listAllUsers() {
  try {
    const users = await listAllUsersCore()
    
    return {
      success: true,
      result: {
        content: [
          {
            type: 'text' as const,
            text: `Total users: ${users.length}`
          }
        ],
        data: users
      }
    }
  } catch (error) {
    return {
      success: false,
      error: {
        code: -32602,
        message: error instanceof Error ? error.message : 'Failed to list users'
      }
    }
  }
}

// Server action to list available tools (for testing MCP server)
export async function listTools() {
  return {
    success: true,
    result: {
      tools: Object.values(userCrudTools).map(tool => ({
        name: tool.name,
        description: tool.description,
        inputSchema: {
          type: 'object',
          properties: tool.schema.shape,
          required: Object.keys(tool.schema.shape)
        }
      }))
    }
  }
}
