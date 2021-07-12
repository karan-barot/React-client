import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
export default function Carts(props) {

    let history =useHistory();

    const[carts,setCarts]=useState([])
    let config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('userToken')
        }
    }
    const userid = localStorage.getItem("userID")
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/cart/user/"+userid,config)
        .then(res=>res.json()
        .then(data=>{
            setCarts(data)
            console.log(data)
        }))
    },[])

    var final=0;
    if(carts){
        final=carts.reduce((finalamount,cart)=>finalamount+parseFloat(cart.amount),0)

    }

    const[orderId,setOrderId]= useState([])
    const placeOrder = async(event) =>{
        
        let orderData={
            amount:final,
            user:localStorage.getItem("userID")
        }   
        let orderDetailsData = {
            item:'',
            amount:'',
            order:'',
            quantity:'',

        }
        //Add Order
        
        const addOrder=async()=>{
            const result =await  axios.post('https://shoppey.herokuapp.com/api/order',orderData,config)            
            addOrderDetail(result.data._id)
        }
        addOrder();
           
        //Add orderDetails  
        const addOrderDetail=async(oid)=>{
            var count=0;
            for(var i=0;i<carts.length;i++)
            {
                orderDetailsData[i]={
                    item:carts[i].item,
                    user:localStorage.getItem("userID"),
                    quantity:carts[i].quantity,
                    amount:carts[i].amount,
                    order:oid
                }
                var od = orderDetailsData[i]

                var result =  axios.post('https://shoppey.herokuapp.com/api/orderdetails',od,config)  
                count++;
            }
            if(count===carts.length){
                toast.success('Order placed successfully!!')
                try{
                    carts.forEach(async(c)=>{
                        var result =await  axios.delete('https://shoppey.herokuapp.com/api/cart/'+c._id,config)
                        }
                    )
                    history.push('/orders')
                }
                catch(err){
                    toast.error(err)
                }
                
            }
            else{
                toast.error('Something went wrong!!!')
            }
        }    
    }
    const deleteCart=async(index)=>{
    
        let config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem("userToken")
            }
        }
        var cartarray = Object.assign([],carts)
        const id = cartarray[index]._id   
        cartarray.splice(index,1);    
        setCarts(cartarray)
        const result = await axios.delete("https://shoppey.herokuapp.com/api/cart/"+id,config)

    }



    if(carts.length!==0){
        return (
            <div className="container mt-5">
                <h1>Your shopping cart</h1>
                {
                    carts.map((cart,index)=>(
                       <Cart key={index} c={cart} i={index} delete={deleteCart.bind(this,index)}/>
                    ))
                }
                <hr/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-md-2"></div>
                                <div className="col-md-4">Total</div>
                                <div className="col-md-2">{final}</div>
                                <div className="col-md">
                                    <button onClick={placeOrder} className="btn add"><i class="far fa-check-circle"></i>Place Order</button>
                                </div>
                            </div>                            
                        </div>
                        <div className="col-md-4">
                            
                        </div>
                        
                    </div>
                </div>
                
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid">
                <div className="row mt-5 mb-5">
                    <h3 className="text-center text-warning">Your cart is empty!!!</h3>
                </div>
            </div>
        )
    }
}


const Cart = (props)=>{
    var img =''
    return(
        <div className="container mt-4" key={props.c._id}>
            <div className="row">
                <div className="col-md-8">                        
                    {props.c.itemdetails.map((itmdetails)=>
                        <div className="row">
                            <img className="col-md-2" src={"https://shoppey.herokuapp.com/"+itmdetails.image} alt="item image"/>
                            <p className="col-md-4">{itmdetails.name}</p>
                            <p className="col-md-2">{itmdetails.price}</p>
                            <p className="col-md-2">{itmdetails.color}</p>
                            <p className="col-md-2">{itmdetails.size}</p>
                        </div>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md">{props.c.quantity}</div>
                        <div className="col-md-2 btn add-cart-btn text-danger" onClick={props.delete}><i className="fas fa-trash" id={props.c._id}></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}