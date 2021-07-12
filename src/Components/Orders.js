import React ,{useEffect,useState}from 'react'
export default function Orders(props) {

    const[orders,setOrders] =useState([])

    var a = props.a
    console.log("in orders : " +a)
    let config={
        headers:{
            "Content-Type": "application/json",
            "x-auth-token":localStorage.getItem("userToken")
        }
    }
    var userid = localStorage.getItem("userID")
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/order/user/"+userid,config)
        .then(response =>response.json()
        .then(data=>{
            setOrders(data)
        }))
    },[])
    if(a===false){
        return(
            <div className="container-fluid" style={{height:"55vh"}}>
                <h3 className="text-warning mt-auto">Please Login to see you orders</h3>
            </div>
        )
    }else{

        if(orders.length!=0){
        
            return (
                <div className="container-fluid" >
                    <h1>Order History</h1>
                    {
                        orders.map((o,index)=>(
                            <Order order={o} key={index}/>
                        ))
                    }
                </div>  
            )
        }
        else{
            return(
                <div className="container-fluid" style={{height:"100vh"}}>
                    <h3 className="text-info">There's no order to preview</h3>
                </div>
            )
        }
    }

}



const Order = (props)=>{

    return(
        <div className="container">

            <div className="row bg-dark text-light">
                <div className="col-md-8">
                    <b>{props.order.number}</b>
                </div>
                <div className="col-md-4">
                    <b>{props.order.orderdate}</b>
                </div>
            </div>       

            <OrderDetails orderid={props.order._id}/>
        </div>
    )
}

const OrderDetails = (props)=>{
    const[orderDetails,setOrderDetails] =useState([])

    let config={
        headers:{
            "Content-Type": "application/json",
            "x-auth-token":localStorage.getItem("userToken")
        }
    }
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/orderdetails/order/"+props.orderid,config)  
        .then(response =>response.json()
        .then(data=>{
            setOrderDetails(data)
        }))
    },[])

    return(
        <div className="row">
            <table className="table table-borderless">
                <thead className="text-info">
                    <tr className="row ">
                        <td className="col-md-3">Item</td>
                        <td className="col-md-3">Name</td>
                        <td className="col-md-3 text-right">quantity</td>
                        <td className="col-md-3 text-right">Amount</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderDetails.map((od,index)=>(
                            <OrderDetail orderdetail={od} key={index}/>
                        ))
                    }
                </tbody>
            </table>
            
            
        </div>
    )
}



const OrderDetail= (props)=>{
    

    const[itm,setItem]=useState(props.orderdetail.itemdetails)
    console.log(itm)
    return(
        <tr className="row ">
            <td className="col-md-3"><img src={"https://shoppey.herokuapp.com/"+ itm[0].image} className="img-fluid" alt="abcd"/></td>
            <td className="col-md-3">{itm[0].name}</td>
            <td className="col-md-3 text-right">{props.orderdetail.quantity}</td>
            <td className="col-md-3 text-right">{props.orderdetail.amount}$</td>
        </tr>
    )
  
    
    
}