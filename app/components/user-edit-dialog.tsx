'use client'

import { updateUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'
import { UserForm } from './user-form'
import MutableDialog, { ActionState } from '@/components/mutable-dialog'

interface UserEditDialogProps {
  user: User
}

export function UserEditDialog({ user }: UserEditDialogProps) {
  const handleEditUser = async (data: UserFormData): Promise<ActionState<User>> => {
    const result = await updateUser(user.id, data)
    
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.user,
      }
    } else {
      return {
        success: false,
        message: result.message,
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleEditUser}
      triggerButtonLabel="Edit"
      editDialogTitle={`Edit ${user.name}`}
      dialogDescription={`Update the details of ${user.name} below.`}
      submitButtonLabel="Save Changes"
      defaultValues={{
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      }}
    />
  )
}
