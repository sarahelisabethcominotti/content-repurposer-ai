

import { useSession } from "next-auth/react"

export default function HistoryButton() {
  const { data: session } = useSession()
  if (session) {
    return (
        <a href="/history" className="text-blue-600 underline hover:text-blue-800">
        View History
      </a>
      
    )
  }
  return (
    <></>
  )
}