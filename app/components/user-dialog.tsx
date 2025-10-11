// app/components/user-dialog.tsx
'use client'

import {  addUser } from '@/app/actions/actions'
import { userFormSchema, User, UserFormData } from '@/app/actions/schemas'

import { UserForm } from './user-form'
import MutableDialog, { ActionState }  from '@/components/mutable-dialog'


export function UserDialog() {
  const handleAddUser = async (data: UserFormData): Promise<ActionState<User>> => {
    const result = await addUser(data)
    
    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: undefined // We don't need to return the user data
      }
    } else {
      return {
        success: false,
        message: result.message
      }
    }
  }

  return (
    <MutableDialog<UserFormData>
      formSchema={userFormSchema}
      FormComponent={UserForm}
      action={handleAddUser}
      triggerButtonLabel="Add User"
      addDialogTitle="Add New User"
      dialogDescription="Fill out the form below to add a new user."
      submitButtonLabel="Save"
      defaultValues={{ name: '', email: '', phoneNumber: '' }} // Default empty values
    />
  )
}