import { createMcpHandler } from "mcp-handler"
import {
  searchUsers as searchUsersCore,
  addUser as addUserCore,
  getUserById as getUserByIdCore,
  updateUser as updateUserCore,
  deleteUser as deleteUserCore,
  listAllUsers as listAllUsersCore,
  userCrudTools
} from "@/lib/user-crud"

const handler = createMcpHandler(
  (server) => {
    // Search users tool
    server.tool(
      userCrudTools.searchUsers.name,
      userCrudTools.searchUsers.description,
      userCrudTools.searchUsers.schema,
      async ({ query }) => {
        try {
          const users = await searchUsersCore(query)
          return {
            content: [
              {
                type: 'text',
                text: users.length > 0 
                  ? `Found ${users.length} user(s):\n${users.map(u => `- ${u.name} (${u.email})`).join('\n')}`
                  : 'No users found matching your query.'
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error searching users: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )

    // Add user tool
    server.tool(
      userCrudTools.addUser.name,
      userCrudTools.addUser.description,
      userCrudTools.addUser.schema,
      async ({ name, email, phoneNumber }) => {
        try {
          const user = await addUserCore({ name, email, phoneNumber })
          return {
            content: [
              {
                type: 'text',
                text: `✅ Successfully added user: ${user.name} (${user.email})`
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Error adding user: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )

    // Get user tool
    server.tool(
      userCrudTools.getUser.name,
      userCrudTools.getUser.description,
      userCrudTools.getUser.schema,
      async ({ id }) => {
        try {
          const user = await getUserByIdCore(id)
          if (!user) {
            return {
              content: [
                {
                  type: 'text',
                  text: `User with ID ${id} not found.`
                }
              ],
            }
          }
          return {
            content: [
              {
                type: 'text',
                text: `User Details:\n- Name: ${user.name}\n- Email: ${user.email}\n- Phone: ${user.phoneNumber}\n- ID: ${user.id}`
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error getting user: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )

    // Update user tool
    server.tool(
      userCrudTools.updateUser.name,
      userCrudTools.updateUser.description,
      userCrudTools.updateUser.schema,
      async ({ id, data }) => {
        try {
          const user = await updateUserCore(id, data)
          return {
            content: [
              {
                type: 'text',
                text: `✅ Successfully updated user: ${user.name} (${user.email})`
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Error updating user: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )

    // Delete user tool
    server.tool(
      userCrudTools.deleteUser.name,
      userCrudTools.deleteUser.description,
      userCrudTools.deleteUser.schema,
      async ({ id }) => {
        try {
          await deleteUserCore(id)
          return {
            content: [
              {
                type: 'text',
                text: `✅ Successfully deleted user with ID: ${id}`
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `❌ Error deleting user: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )

    // List all users tool
    server.tool(
      userCrudTools.listUsers.name,
      userCrudTools.listUsers.description,
      userCrudTools.listUsers.schema,
      async () => {
        try {
          const users = await listAllUsersCore()
          return {
            content: [
              {
                type: 'text',
                text: users.length > 0
                  ? `Total users: ${users.length}\n\n${users.map(u => `- ${u.name} (${u.email}) - ${u.phoneNumber}`).join('\n')}`
                  : 'No users in the database.'
              }
            ],
          }
        } catch (error) {
          return {
            content: [
              {
                type: 'text',
                text: `Error listing users: ${error instanceof Error ? error.message : 'Unknown error'}`
              }
            ],
            isError: true
          }
        }
      }
    )
  },
  {
    // Server info
    serverInfo: {
      name: "person-search",
      version: "1.0.0",
    }
  },
  {
    // Configuration
    basePath: "/api",
    maxDuration: 60,
    verboseLogs: true,
  }
)

export { handler as GET, handler as POST }
