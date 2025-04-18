

import { useSession, signIn, signOut } from "next-auth/react"

export default function LoginButton() {
  const { data: session } = useSession()
  if (session) {
    return (
        <div className="w-full flex justify-end mb-4">
        <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">Signed in as <strong>{session.user.email}</strong></span>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-2 rounded-lg transition-all"
        >
          Sign out
        </button>
      </div>
      </div>
    )
  }
  return (
    <div className="w-full flex justify-end mb-4">

    <button
          onClick={() => signIn()}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-all"
        >
          Sign in
        </button>
        </div>
  )
}