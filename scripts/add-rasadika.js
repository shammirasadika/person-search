const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addRasadika() {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: 'rasadika',
        email: 'rasadika2@gmail.com',
        phoneNumber: '0412345680' // Added valid phone number
      }
    })
    
    console.log('\n✅ Successfully added user:')
    console.log(`   Name: ${newUser.name}`)
    console.log(`   📧 Email: ${newUser.email}`)
    console.log(`   📱 Phone: ${newUser.phoneNumber}`)
    console.log(`   🆔 ID: ${newUser.id}\n`)
  } catch (error) {
    if (error.code === 'P2002') {
      console.error('\n❌ Error: A user with this email already exists.\n')
    } else {
      console.error('\n❌ Error:', error.message, '\n')
    }
  } finally {
    await prisma.$disconnect()
  }
}

addRasadika()
