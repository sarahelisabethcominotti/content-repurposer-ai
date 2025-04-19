

import { useSession } from "next-auth/react"

export default function HistoryButton() {
  const { data: session } = useSession()
  if (session) {
    if (document.URL.includes("history")) {
      return (
        // if we are on /history then it becomes home
          <a href="/app"           
          className="bg-purple-600 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg transition-all"
          >
          Home
        </a>
        
      )
    } else {
      return (
        // if we are on /history then it becomes home
          <a href="/history"           
          className="bg-purple-600 hover:bg-purple-800 text-white text-sm px-4 py-2 rounded-lg transition-all"
          >
          View History
        </a>
        
      )
    }

    
  }
  return (
    <></>
  )
}