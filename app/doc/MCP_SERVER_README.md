# Person Search MCP Server

A Model Context Protocol (MCP) server that provides CRUD operations for person/user management. Built with Next.js, Prisma, and mcp-handler following the roll dice pattern.

## ✨ Features

- **Complete CRUD Operations**: Search, add, get, update, delete, and list users
- **Dual Interface**: 
  - MCP server endpoint for Claude Desktop integration
  - Server actions for web interface
- **Single Source of Truth**: Shared logic in `lib/user-crud.ts` ensures consistency
- **Type-Safe**: Full TypeScript with Zod schema validation
- **Database Integration**: Prisma ORM with PostgreSQL

## 🏗️ Architecture

Following the roll dice pattern, this implementation provides a single source of truth for all CRUD operations:

```
┌─────────────────────────────────────────────────────────────────┐
│                     lib/user-crud.ts                            │
│              (Single Source of Truth)                           │
│  • All CRUD functions (search, add, get, update, delete, list) │
│  • Zod validation schemas                                       │
│  • Tool definitions                                             │
└─────────────────────────────────────────────────────────────────┘
                            ▲         ▲
                            │         │
            ┌───────────────┘         └───────────────┐
            │                                         │
┌───────────────────────────┐           ┌─────────────────────────┐
│   Claude Desktop (MCP)    │           │    Web Interface        │
│           ↓               │           │         ↓               │
│  app/api/[transport]/     │           │  app/actions/           │
│     route.ts              │           │    actions.ts           │
│  (MCP Handler)            │           │  (Server Actions)       │
└───────────────────────────┘           └─────────────────────────┘
```

### Key Components

- **`lib/user-crud.ts`**: Shared CRUD logic, Zod schemas, and tool definitions (single source of truth)
- **`app/api/[transport]/route.ts`**: MCP server endpoint using mcp-handler for Claude Desktop
- **`app/actions/actions.ts`**: Server actions for web interface
- **`prisma/schema.prisma`**: Database schema with PostgreSQL

## 🚀 Setup

### 1. Install Dependencies

Already installed:
```bash
npm install mcp-handler @modelcontextprotocol/sdk zod
```

### 2. Start Development Server

```bash
npm run dev
```

The MCP server will be available at:
- **MCP Endpoint**: `http://localhost:3000/api/mcp` (for Claude Desktop)
- **Web Interface**: `http://localhost:3000` (existing Next.js app)

## 🤖 Using with Claude Desktop

### 1. Configure Claude Desktop

Add this to your Claude Desktop config file:

**Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "person-search": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "http://localhost:3000/api/mcp"
      ]
    }
  }
}
```

### 2. Restart Claude Desktop

Completely close and reopen Claude Desktop. Look for the hammer icon (🔨) in the input box.

### 3. Start Using!

Ask Claude natural language questions like:

- "Search for users named John"
- "Add a new user named Alice with email alice@example.com and phone 0412345678"
- "List all users in the database"
- "Update user [ID] to change their name to Bob"
- "Delete the user with ID [ID]"
- "Get details for user [ID]"

## 🛠️ Available MCP Tools

### 1. **search_users**
Search for users by name
- Parameters: `query` (string)

### 2. **add_user**
Add a new user to the database
- Parameters: `name` (string), `email` (string), `phoneNumber` (string)

### 3. **get_user**
Get a user by their ID
- Parameters: `id` (string)

### 4. **update_user**
Update an existing user
- Parameters: `id` (string), `data` (partial user object)

### 5. **delete_user**
Delete a user by their ID
- Parameters: `id` (string)

### 6. **list_users**
List all users in the database
- Parameters: none

## 📋 Schema Validation

All inputs are validated using Zod schemas:

```typescript
// User form schema
{
  name: string (min 2 chars),
  email: string (valid email),
  phoneNumber: string (Australian mobile format: 04XXXXXXXX)
}
```

## 🌐 Deployment

### Vercel Deployment

The MCP server can be deployed to Vercel. Update the Claude Desktop config with your deployment URL:

```json
{
  "mcpServers": {
    "person-search": {
      "command": "npx",
      "args": [
        "-y",
        "mcp-remote",
        "https://your-app.vercel.app/api/mcp"
      ]
    }
  }
}
```

## 🔧 Technical Details

- **Framework**: Next.js 15 with App Router
- **MCP Integration**: mcp-handler for HTTP-based MCP protocol
- **Validation**: Zod schemas for type-safe parameter validation
- **Database**: Prisma ORM with PostgreSQL (Neon)
- **Pattern**: Roll dice pattern with shared logic

## 🎯 Benefits of the Roll Dice Pattern

- ✅ **Single source of truth** - All logic in `lib/user-crud.ts`
- ✅ **Same Zod validation** - Identical schemas used by both MCP and web interface
- ✅ **Consistent behavior** - Both interfaces execute the same functions
- ✅ **Type-safe** - Full TypeScript + Zod validation throughout
- ✅ **Easy maintenance** - Change logic once, works everywhere
- ✅ **No code duplication** - Write once, use in multiple interfaces

## 📝 Summary

Your person-search application successfully implements the roll dice pattern with:
- **Two interfaces** (MCP + Web) sharing the same CRUD logic
- **One source of truth** (`lib/user-crud.ts`) for all operations
- **Consistent validation** using Zod schemas across all entry points
- **Type safety** with TypeScript throughout the stack
- **Production-ready** with PostgreSQL database and Vercel deployment support

## 📚 Learn More

- [Model Context Protocol](https://modelcontextprotocol.io/) - Official MCP documentation
- [mcp-handler](https://www.npmjs.com/package/mcp-handler) - HTTP-based MCP handler
- [Roll Dice MCP Server](https://github.com/shammirasadika/rolldice-mcpserver) - Reference implementation

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.
