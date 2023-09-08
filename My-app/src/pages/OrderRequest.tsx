import React from 'react'
import { SideNav } from '../components/SideNav'

function OrderRequest() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNav></SideNav>
       
    </div>
    
  )
}

export default OrderRequest