import "./App.css"
import React from "react"
import { useState, useEffect } from "react"
import { register } from '../../api'
import { login } from '../../api'
import { setToken } from '../../utility'
import { getToken } from '../../utility'
import { getUser } from "../utilities/users-service"
import { updatePassword } from '../../api'
import { isUserLoggedIn } from '../../utility'
import HomePage from "../homePage/homepage"
import AuthPage from "../AuthPage/AuthPage"

function App() {
  // const [message, setMessage] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [user, setUser] = useState(getUser())
  // const [currentReading, setCurrentReading] = useState({
  //   day: "",
  //   month: "",
  //   year: "",
  //   hour: "",
  //   minute: ""
  // })

  // useEffect(() => {
  //   fetch("http://localhost:8000/message")
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch((error) => {
  //       console.error("Error fetching message:", error)
  //     })

  //   const fileUrl = "data/realtime2/41004.txt"

  //   fetch(fileUrl)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Network response was not ok")
  //       }
  //       return response.text()
  //     })
  //     .then((fileContent) => {
  //       const dataString = fileContent.split("\n")
  //       console.log(dataString.length)
  //       const dataSplit = dataString[2].split(" ")
  //       console.log(dataSplit)
  //       const [year, month, day, hour, minute, wDir, , wSpd] = dataSplit

  //       setCurrentReading({
  //         day,
  //         month,
  //         year,
  //         hour,
  //         minute,
  //         wDir, 
  //         wSpd
  //       })
  //     })
  //     .catch((error) => {
  //       console.error("Error reading the file:", error)
  //     })
  // }, [])
  


  const handleRegister = async () => {
    try {
          
      const tokenValue = await register({
        email: 'test@gmail.com',
        username: 'pat', 
        password: 'Pp123456789'
      })

      setToken(tokenValue.token)
      
    } catch (error) {
      console.log('READ THE ERROR HERE:', error)
      if (error){
        setErrorMsg(`${error.toString().substr(26)}`)
      }
    }
  }

  const handleLogIn = async () => {

    try {
      
      const tokenValue = await login({
        username: 'pat', 
        password: '12345'
      })
      console.log(tokenValue)
      setToken(tokenValue.token)
      
    } catch (error) {
      console.error(error)
      setErrorMsg("Invalid username or password.")
    }
  }

  const handlePasswordChange = async () => {
    try {
      const token = getToken()
      const data = { password: 'thisisanewpas8687jht' }
      await updatePassword(token, data)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main className="App">
      {user ? (
        <>
        <HomePage/>
        </>
      ):(
        <AuthPage setUser = {setUser}/>
      )}


    </main>
    // <div className="App">
    //   <header className="App-header">
    //     <p>Hello from SurfLog</p>
    //     <p>This is a message from the backend Express server: {message}</p>
    //     {/* <p>
    //       The last buoy reading was at: {currentReading.month}-{currentReading.day}-{currentReading.year}:{currentReading.hour}:{currentReading.minute} GMT time.  The wind on the Edisto buoy is currently blowing from {currentReading.wDir} degrees and the windspeed is {currentReading.wSpd}.
    //     </p> */}
    //     <button onClick={handleRegister}>Register</button>
    //     <button onClick={handleLogIn}>Log In</button>
    //     {/* <button onClick={handlePasswordChange}>Change Password</button> */}
    //   </header>
    // </div>
  )
}

export default App

