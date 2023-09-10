
import { Routes,Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { SignUp } from './pages/SignUp'
import { LogIn } from './pages/LogIn'
import { User } from './pages/User'
import OrderRequest from './pages/OrderRequest'
import Orders from './pages/Orders'
import Admin from './pages/Admin'
import AdminOrders from './pages/AdminOrders'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<LogIn/>}/> 
        <Route path="/user/:id" element={<User/>}/>
        <Route path="/user/orderRe/:id" element={<OrderRequest/>}/>
        <Route path="/user/orders/:id" element={<Orders/>}/>
        <Route path="/admin/:id" element={<Admin/>}/>
        <Route path="/admin/orders/:id" element={<AdminOrders/>}/>


       
      </Routes>
    </>
  )
}

export default App
