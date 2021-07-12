import React, { useState,useEffect } from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify';
export default function AddItem(props){

    //configure header data
    let config=[{
        headers:[{
            'Content-Type':'application/json'
        }]
    }]

    //get brands 
    const[brands,setBrands]=useState([]);
    useEffect(()=>{
        fetch('https://shoppey.herokuapp.com/api/brand',config)
        .then(response=>response.json()
        .then(data=>{
            setBrands(data)
        }))
    },[])

    //get categories
    const[categories,setCategories]=useState([]);
    useEffect(()=>{
        fetch('https://shoppey.herokuapp.com/api/category',config)
        .then(response=>response.json()
        .then(data=>{
            setCategories(data)
        }))
    },[])

    //React hook form
    const {register,handleSubmit,formState: { errors }}=useForm();


    //Upload image
    const[file,setFile]=useState([])
    const onChangeImage = event=>{
        setFile(event.target.files[0])
    }
    //post an item

    const onSubmit=async(data)=>{

       
        
        let config={
            headers:{
                'x-auth-token':localStorage.getItem("userToken")
            }
        }
        //abcd
        

        try{
            const fd = new FormData();
            fd.append("name",data.name)
            fd.append("description",data.description)
            fd.append("category",data.category)
            fd.append("color",data.color)
            fd.append("size",data.size)
            fd.append("price",data.price)
            fd.append('image',file,file.name)
            const itm =await axios.post('https://shoppey.herokuapp.com/api/item',fd,config)
            props.add(itm.data)
        }catch(err){
            toast.error(err)
        }
        
    }
    return(
        <div className="addItemFormContainer">
             <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className="addItemForm mt-5">
                 <button className="close btn text-danger"><i class="fas fa-times-circle"></i></button>
                    <h1>Add item</h1>            
                    
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            id="name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <label>Number</label>
                            <input
                            id="number"
                  
                            {...register('number', { required: true })}
                        />
                        {errors.number && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <input
                            id="description"
                            {...register('description', { required: true })}
                        />
                        {errors.description && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Price</label>
                        <input
                            id="price"
                            {...register('price', { required: true })}
                        />
                        {errors.price && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Size</label>
                        <input
                            id="size"
                            {...register('size', { required: true })}
                        />
                        {errors.size && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Color</label>
                        <input
                            id="color"
                            {...register('color', { required: true })}
                        />
                        {errors.color && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Image</label>
                        <input type="file"
                            id="image"
                            onChange={(e)=>{onChangeImage(e)}}
                        />

                    </div>
                    <div className="form-group">
                        <label>Brand</label>
                        <select name="brand" className="input-control" {...register('brand')}>
                            {
                                brands.map((g)=>(
                                    <option value={g._id} key={g.key}>{g.name}</option>
                                ))
                            }
                        </select>
                        {errors.brand && <span className="text-danger">This field is required</span>}

                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="input-control" {...register('category')}>
                            {
                                categories.map((g)=>(
                                    <option value={g._id} key={g.key}>{g.name}</option>
                                ))
                            }
                        </select>
                        {errors.category && <span className="text-danger">This field is required</span>}

                    </div>
                 
                    <button type="submit" className="btn mt-3 add"><i class="fas fa-plus"></i>  Add Item</button>
                </form>
        </div>
       
    )
}