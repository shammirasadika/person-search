const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function searchBanu() {
  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          startsWith: 'banu',
          mode: 'insensitive'
        }
      },
      orderBy: {
        name: 'asc'
      }
    })
    
    if (users.length === 0) {
      console.log('\n📭 No users found with name starting with "banu".\n')
    } else {
      console.log(`\n🔍 Found ${users.length} user(s):\n`)
      console.log('═'.repeat(80))
      users.forEach((user, index) => {
        console.log(`\n${index + 1}. ${user.name}`)
        console.log(`   📧 Email: ${user.email}`)
        console.log(`   📱 Phone: ${user.phoneNumber}`)
        console.log(`   🆔 ID: ${user.id}`)
      })
      console.log('\n' + '═'.repeat(80) + '\n')
    }
  } catch (error) {
    console.error('❌ Error:', error.message)
  } finally {
    await prisma.$disconnect()
  }
}

searchBanu()
