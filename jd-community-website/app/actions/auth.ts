'use server'

import { z } from 'zod'

const signupSchema = z.object({
  nickname: z.string().min(3).max(50),
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(8),
})

export async function signupAction(formData: FormData) {
  const validatedFields = signupSchema.safeParse({
    nickname: formData.get('nickname'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!validatedFields.success) {
    return { error: 'Invalid fields. Please check your input.' }
  }

  const {nickname, username, email, password } = validatedFields.data

  try {
    // Here you would typically call your API endpoint
    // For demonstration, we'll just simulate an API call
    const response = await fetch('https://api.jammerdash.com/v1/account/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({nickname, username, email, password }),
    })

    if (!response.ok) {
      throw new Error('Signup failed')
    }

    return { success: 'Account created successfully!' }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message }
    }
    return { error: 'Failed to create account. Please try again.' }
  }
}

