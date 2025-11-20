import ManageTitle from "./ManageTitle"
import ClientDetails from "./ClientDetails";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../../app/Features/ordersApi";
import OrderItem from "../Profile/OrderItem";
import { Quantum } from 'ldrs/react';
import NoProductsFound from "../Utility/NoProductsFound";


const OrderDetailsSection = () => {

  const {id}=useParams()

  const {data,isLoading,isError}=useGetOrderByIdQuery(id!)
  const order=data?.data
 

   if (isLoading) {
      return <div className="flex justify-center items-center py-40">
              <Quantum size="50" speed="1.75" color="#E8765E" />
            </div>
    }
  
    if (isError) {
      return <NoProductsFound isError />;
    }
  
  return (
    <div className="flex flex-col space-y-5">
      <ManageTitle title="Details of order No." number={order?.id}/>

       {order && (
  <OrderItem
    order={order}
    index={0}
    orderNumber={order.id}
  />
)}

     
      <div>
        <ClientDetails
        orderId={order?._id||""}
        name={order?.user.name||""}
        phone={order?.user.phone||""}
        email={order?.user.email||""}
       
        isPaid={order?.isPaid}
        isDelivered={order?.isDelivered}
        />
        
      </div>


    </div>
  )
}

export default OrderDetailsSection