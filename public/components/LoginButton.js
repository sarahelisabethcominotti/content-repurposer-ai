

import { useSession, signIn, signOut } from "next-auth/react"
import Link from "next/link"

export default function LoginButton() {
  const { data: session } = useSession()
  // console.log("-----",session.user)

  if (session) {
    return (
     <>
        {/* <span className="text-sm text-gray-700">Signed in as <strong>{session.user.email}</strong></span> */}
        <button
          onClick={() => signOut({callbackUrl: "/", redirect:true })}
          className="bg-red-400 hover:bg-black text-black hover:text-white text-sm px-4 py-2 rounded-lg transition-all"
        >
          Sign out
        </button>
      </>
    )
  }
  return (
    
    <div className="w-full flex justify-end mb-4">

    <button
          onClick={() => signIn()}
          className="bg-green-300 hover:bg-black text-white text-sm px-4 py-2 rounded-lg transition-all"
        >
          Sign in
        </button>
        </div>
  )
}