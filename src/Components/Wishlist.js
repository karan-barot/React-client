import React,{useState,useEffect}from 'react'
import axios from 'axios'
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
import $ from 'jquery'
export default function Carts(props) {

    let history =useHistory();

    const[wishes,setWishes]=useState([])
    let config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem('userToken')
        }
    }
    const userid = localStorage.getItem("userID")
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/wishlist/user/"+userid,config)
        .then(res=>res.json()
        .then(data=>{
            setWishes(data)
        }))
    },[])


    const deleteWishes=async(index)=>{
    
        let config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem("userToken")
            }
        }
        var wishArray = Object.assign([],wishes)
        const id = wishArray[index]._id   
        wishArray.splice(index,1);    
        setWishes(wishArray)
        const result = await axios.delete("https://shoppey.herokuapp.com/api/wishlist/"+id,config)
        toast.success("Item removed from wishlist","Success")
    }


    const addToCart = async(index)=>{  

        console.log("add to cart")

        const data={
            user:localStorage.getItem("userID"),
            item:wishes[index].itemdetails[0]._id,
            quantity:'1',
            amount:wishes[index].itemdetails[0].price
        }

        
        const result = await axios.post("https://shoppey.herokuapp.com/api/cart",data,config)
        if(result){
            toast.success("Item added to cart successfully!!!")
        }
        console.log(result)

        var newWish = Object.assign([],wishes)
        const id = newWish[index]._id   

        newWish.splice(index,1)
        setWishes(newWish)

        const response = await axios.delete("https://shoppey.herokuapp.com/api/wishlist/"+id,config)

        console.log(response)
        
    }

    if(wishes.length!==0){
        return (
            <div className="container mt-5">
                <h1>Your WishList</h1>
                {
                    wishes.map((wish,index)=>(
                       <Wish key={index} c={wish} i={index} delete={deleteWishes.bind(this,index)} addC={addToCart.bind(this,index)}/>
                    ))
                }
            </div>
        )
    }
    else{
        return(
            <div className="container-fluid">
                <div className="row mt-5 mb-5">
                    <h3 className="text-center text-warning">There's no item in your wishlist</h3>
                </div>
            </div>
        )
    }
}


const Wish = (props)=>{

    const[itm,setItm] =useState(props.c.itemdetails)

    console.log("item details")
    console.log(itm[0])
    return(
        <div className="container mt-4" key={props.c._id}>
            <div className="row">
                <div className="col-md-8">                        
                    {props.c.itemdetails.map((itmdetails)=>
                        <div className="row">
                            <img className="col-md-2" src={"https://shoppey.herokuapp.com/"+itmdetails.image} alt="item image"/>
                            <p className="col-md-4">{itmdetails.name}</p>
                            <p className="col-md-2 price" id={props.i}>{itmdetails.price}</p>
                            <p className="col-md-2">{itmdetails.color}</p>
                            <p className="col-md-2">{itmdetails.size}</p>
                        </div>
                        
                    )}
                </div>
                <div className="col-md-4">
                    <div className="row">
                        <div className="col-md">{props.c.quantity}</div>
                        <div className="col-md-2 btn add-cart-btn text-danger" onClick={props.delete}><i className="fas fa-trash" id={props.c._id}></i></div>
                        <div className="col-md-2 btn add-cart-btn text-info" onClick={props.addC}><i className="fas fa-shopping-cart" name="price" value={itm[0].price}  id={itm[0]._id} index={props.i}></i></div>
                    </div>
                </div>
            </div>
        </div>
    )
}