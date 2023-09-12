import { SideNavAdmin } from '../components/SideNavAdmin'
import AdminAcceptOrdersC from '../components/AdminAcceptOrdersC'

function AdminAcceptOrders() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNavAdmin></SideNavAdmin>
        <AdminAcceptOrdersC></AdminAcceptOrdersC>
       
    </div>
    
  )
}

export default AdminAcceptOrders