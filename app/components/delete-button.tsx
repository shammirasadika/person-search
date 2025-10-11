'use client'

import { Button } from "@/components/ui/button"
import { Trash } from 'lucide-react'
import { deleteUser } from '@/app/actions/actions'
import { toast } from "@/hooks/use-toast"

export default function DeleteButton({ userId }: { userId: string }) {
  const handleDelete = async () => {
    console.log('DeleteButton: Attempting to delete user with ID', userId)
    try {
      await deleteUser(userId)
      toast({
        title: "User Deleted",
        description: "User deleted successfully",
        variant: "default",
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete user'
      console.error('DeleteButton: Error deleting user', errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
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
