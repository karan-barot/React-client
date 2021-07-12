import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { toast } from 'react-toastify';
import AddItem from './AddItem'
import $ from 'jquery'
import {useHistory} from 'react-router-dom'
export default function ItemsAPI(props) {

    //check if authorized
    var a = props.a
    var history = useHistory()
    //configure header data
    let config=[{
        headers:[{
            'Content-Type':'application/json',
            
        }]
    }]
    //using state
    const[items,setItems]=useState([]);
    const[filters,setFilters]=useState([]);
    //use effect
    useEffect(()=>{
        fetch('https://shoppey.herokuapp.com/api/item',config)
        .then(response=>response.json()
        .then(data=>{
            setItems(data)
            setFilters(data)
        }))
    }
    ,[]);

    const deleteItem=async(index)=>{
    
        let config={
            headers:{
                'Content-Type':'application/json',
                'x-auth-token':localStorage.getItem("userToken")
            }
        }
        var itmarray = Object.assign([],items)   
        const itemid = itmarray[index]._id

        itmarray.splice(index,1)
        setItems(itmarray)
        setFilters(itmarray)
        const result = await axios.delete("https://shoppey.herokuapp.com/api/item/"+itemid,config)
        if(result.status===200){
            toast.success("Item deleted successfully")
        }
    }

    const handleAddItem=data=>{
        setItems([...items,{data}])
        setFilters([...filters,{data}])
    }
    

    $('.addItemFormContainer').hide()

    $(".add-item").click(function(){

        if(a!==null){
            $(".addItemFormContainer").show()
        }
        else{
            history.push('/signin')
        }
    })
    $(".addItemFormContainer form .close").click(function(){
        $(".addItemFormContainer").hide()
        
    })
    
    const searchItem =(e)=>{
        var search=e.target.value;
        if(search!==""){
            let filter = items.filter(items=>items.name.toLowerCase().includes(search.toLowerCase()))
            setFilters(filter)      

        }
        else if(search===""){
            setFilters(items)
        }
    }
    return (
        <div className="container-fluid ">
            <div className="container-fluid search-item-container">
                <div className="row d-flex align-items-center">
                    <div className="col-md">
                        <a className=" add-item"><i className="fas fa-plus"></i> Add Item</a>
                    </div>
                    <div className="col-md">
                        <div className="search-field m-0">
                            <input onChange={(e)=>searchItem(e)} placeholder="Search Item"/>
                            <i className="fas fa-search"></i>
                        </div>
                    </div>
                    
                </div>
            </div>
            

            <div className="row mt-5">  
            {
                filters.map((item,index)=>(
                    <Item className="" items={item} key={item._id} delete={deleteItem.bind(this,index)}/>                    
                ))
            }              
            </div>
            <div className="row">
                <AddItem add={(e)=>{handleAddItem(e)}} key={false} />
            </div>
        </div>
    )
}

const Item=(props)=>{
    let config = {
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem("userToken")

        }
    }
    
    
    const addToCart=async(event)=>{       
        
        let data ={
            user:localStorage.getItem("userID"),
            item:event.target.id,
            quantity:"1",
            amount: props.items.price
        }

        const result = await axios.post("https://shoppey.herokuapp.com/api/cart",data,config)
        if(result){
            toast.success("Item added to cart successfully!!!")
        }
        
    }

    const addToWish=async(event)=>{       
        
        let data ={
            user:localStorage.getItem("userID"),
            item:event.target.id
        }

        console.log(data)
        
        const result = await axios.post("https://shoppey.herokuapp.com/api/wishlist",data,config)
        if(result){
            toast.success("Item added to wihslist successfully!!!")
        }
    
    }
    
    var src = props.items.image
    return(
        <div className="col-md-4" >
            <div className="item-card box-shadow card">
                <i className="far fa-heart wish" id={props.items._id} onClick={(e)=>addToWish(e)}></i>
                <p className="itemID d-none">{props.items._id}</p>
                <img src={'https://shoppey.herokuapp.com/'+src} className="card-img-top" alt="item image"/>

                <div className="container-fluid overflow-hidden item-info">
                    <h6 className="col-md item-name">{props.items.name}</h6>
                    <div className="col-md">CAD <b>${props.items.price}</b></div>
                    <div className="col-md">{props.items.size}</div>
                    <div className="col-md">{props.items.color}</div>
                </div>
                <div className="container-fluid d-flex item-buttons">                    
                    <button className="btn addItm" id={props.items._id} onClick={(e)=>addToCart(e)}><i className="fas fa-shopping-cart" ></i></button>
                    <button className="btn delete"  onClick={props.delete}><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>
        </div>
    )
}
