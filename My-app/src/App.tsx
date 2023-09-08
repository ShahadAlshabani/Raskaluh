
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<LogIn/>}></Route>
      </Routes>
    </>
  )
}

export default App
