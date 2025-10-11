'use client'

import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deleteUser } from '@/app/actions/actions'
import { toast } from "@/hooks/use-toast"

export default function DeleteButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    console.log('DeleteButton: Attempting to delete user with ID', userId)
    const result = await deleteUser(userId)
    
    if (result.success) {
      toast({
        title: "User Deleted",
        description: result.message,
        variant: "default",
      })
    } else {
      console.error('DeleteButton: Error deleting user', result.message)
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      })
    }
  }

  return (
    <Button onClick={handleDelete} variant="destructive" >
      <Trash className="w-4 h-4 mr-2" />
      Delete
    </Button>
  )
}
