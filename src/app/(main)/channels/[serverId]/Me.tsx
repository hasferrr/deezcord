import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth, signOut } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import { ModeToggle } from '@/components/mode-toggle'
import UserPopover from '@/components/user/user-popover'

const Me = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const user = await getUserById(userId)
  if (!user) {
    return redirect('/')
  }

  return (
    <div>
      <ChatHeader
        name="App"
        channelType="TEXT"
      />
      {JSON.stringify(session)}
      <form action={async () => {
        'use server'
        try {
          await signOut({
            redirectTo: '/',
          })
        } catch (error) {
          console.log(error)
          throw error
        }
      }}>
        <button type="submit">Sign out</button>
      </form>
      <ModeToggle />
      <UserPopover user={user} side="right">
        <button type="button">USER</button>
      </UserPopover>
    </div>
  )
}

export default Me
