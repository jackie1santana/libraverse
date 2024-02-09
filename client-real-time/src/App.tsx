import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Notifications } from './Components/Notifications/Notifications'
import  { LiveChat } from './Components/LiveChat/LiveChat'

function App() {
  const [status, setStatus] = useState(0)

  const fruits: string[] = ['Apple', 'Banana', 'Orange']
for(const fruit of fruits) {
  console.log(fruit)
}
  return (
    <>
     <Notifications setStatus={setStatus}/>
     <LiveChat status={status}/>

     {
      
    }
    </>
  )
}

export default App
