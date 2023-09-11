import React from 'react'
import { SideNavAdmin } from '../components/SideNavAdmin'
import AdminRejectOrdersC from '../components/AdminRejectOrdersC'

function AdminRejectOrders() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNavAdmin></SideNavAdmin>
        <AdminRejectOrdersC></AdminRejectOrdersC>
       
    </div>
    
  )
}

export default AdminRejectOrders