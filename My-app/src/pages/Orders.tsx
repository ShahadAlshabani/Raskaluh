import { SideNav } from '../components/SideNav'
import OrdersContent from '../components/OrdersContent'

function Order() {
    if(localStorage.getItem('isLogged')!== 'true'){
        window.location.href='/login'
      }

  return (
    <div>

        <SideNav></SideNav>
        <OrdersContent></OrdersContent>
       
    </div>
    
  )
}

export default Order