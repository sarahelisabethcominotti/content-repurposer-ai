import { createClient } from '@supabase/supabase-js'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth/[...nextauth]'
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    return res.status(401).json({ error: 'Not authenticated' })
  }

  const { input, output, platform } = req.body
  const userEmail = session.user.email
  const { data: user, error: userError } = await supabase
  .from('users')
  .select('id')
  .eq('email', userEmail)
  .single()

if (userError || !user) {
  console.error('Error fetching user:', userError)
  return res.status(500).json({ error: 'Failed to find user' })
}

const { error: generationError } = await supabase.from('generations').insert([
  {
    user_id: user.id,
    input,
    output,
    platform,
  },
])

if (generationError) {
  console.error('Supabase insert error:', generationError)
  return res.status(500).json({ error: 'Failed to save generation' })
}


  res.status(200).json({ success: true })
}
