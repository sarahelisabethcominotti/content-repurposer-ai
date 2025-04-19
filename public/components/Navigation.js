import React from 'react'
import HistoryButton from './HistoryButton'
import LoginButton from './LoginButton'

function Navigation() {
  return (
    <div className="w-full flex justify-between mb-4">
    <HistoryButton/>
    <LoginButton/>
    </div>
    )
}

export default Navigation