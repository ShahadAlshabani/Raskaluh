import React from 'react'
import { SideNavAdmin } from '../components/SideNavAdmin'
import AdminOrdersC from '../components/AdminOrdersC'

function AdminOrders() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNavAdmin></SideNavAdmin>
        <AdminOrdersC></AdminOrdersC>
       
    </div>
    
  )
}

export default AdminOrders