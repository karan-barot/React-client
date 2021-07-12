import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import $ from 'jquery'
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
export default function Brand(props) {   
    
    var a = props.a
    const[cat,setCat]=useState([])
    const[brands,setBrands]=useState([])
    var history = useHistory();
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/brand")
        .then(response=>response.json()
        .then(data=>{
            setBrands(data)
        }))
    },[])

    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/category")
        .then(response=>response.json()
        .then(data=>{
            setCat(data)
        }))
    },[])
    let config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem("userToken")
        }
    }


    const deleteCat =async (index)=>{
        var newCat = Object.assign([],brands)
        var catId = newCat[index]._id
        newCat.splice(index,1)
        setBrands(newCat)

        const result = await axios.delete("https://shoppey.herokuapp.com/api/brand/"+catId,config)
        toast.success("Successfully deleted")
    }

    //Add new Category
    const {register,handleSubmit,formState: { errors }}=useForm();

    const onSubmit=async(data)=>{     
        console.log(data)
        const d = {
            name:data.name,
            category:data.category,
            description:data.description
        }
        try{
            const result = await axios.post("https://shoppey.herokuapp.com/api/brand/",d,config)
            setBrands([...brands,{name:data.name}])

        }
        catch{
            toast.error("Something went wrong","Error")
        }
    }

    //hide or show form     

    $('.add-cat-btn').click(function(){
        if(a!=null){
            $('.addCat').removeClass('d-none')
        }
        else{
            history.push('/signin')
        }
    })
    $('.close-btn').click(function(){
        $('.addCat').addClass('d-none')
    }) 
    return (
        <div className="container">
        <h1 className="mt-2">Brands</h1>
        
        <a className=" add-cat-btn mt-5"><i class="fas fa-plus"></i> Add Brands</a>
        <div className="row mt-5">
            {
                brands.map((b,index)=>(
                    <div key={index} className=" brnd col-md-3">

                        <p className="">{b.name}<span  className="text-danger btn" id={index} value={b._id} onClick={deleteCat.bind(this,index)}><i class="far fa-trash-alt ml-1"></i></span></p>

                    </div>
                ))
            }
        </div>
        <div className="addCat d-none">
            <form className="shadow-lg p-5 " onSubmit={handleSubmit(onSubmit)}>
                <i class="btn close-btn text-danger fas fa-times-circle"></i>
                <h1>Add Brand</h1>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        id="name"
                        {...register('name', { required: true })}
                    />
                    {errors.name && <span  className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        id="description"
                        {...register('description', { required: true })}
                    />
                    {errors.name && <span className="text-danger">This field is required</span>}
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select name="category" className="input-control" {...register('category')}>
                        {
                            cat.map((g)=>(
                                <option value={g._id} key={g.key}>{g.name}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="form-group">
                    <button className="btn add mt-4">Add Brands</button>
                </div>
            </form>
        </div>
    </div>


    )
}
