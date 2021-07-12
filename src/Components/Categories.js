import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import $ from 'jquery'
import { toast } from 'react-toastify'
import {useHistory} from 'react-router-dom'
export default function Categories(props) {



    var a = props.a
    const[cat,setCat]=useState([])
    var history = useHistory();

    //fetch the list of categories
    useEffect(()=>{
        fetch("https://shoppey.herokuapp.com/api/category")
        .then(response=>response.json()
        .then(data=>{
            setCat(data)
            console.log(cat)

        }))
    },[])

    //configuration
    let config={
        headers:{
            'Content-Type':'application/json',
            'x-auth-token':localStorage.getItem("userToken")
        }
    }

    //delete category
    const deleteCat =async (index)=>{

        var newCat = Object.assign([],cat)
        var catId = newCat[index]._id
        console.log(catId)
        newCat.splice(index,1)
        setCat(newCat)

        const result = await axios.delete("https://shoppey.herokuapp.com/api/category/"+catId,config)

        console.log(result.data)
    }

    //Add new Category
    const {register,handleSubmit,formState: { errors }}=useForm();

    const onSubmit=async(data)=>{  
           
        console.log(data)
        const d = {
            name:data.name,
            description:data.description,
            type:data.type
        }
        try{
            const result = await axios.post("https://shoppey.herokuapp.com/api/category/",d,config)
            setCat([...cat,{name:data.name}])

        }
        catch{
            toast.error("Something went wrong","Error")
        }
    }

    //hide or show form     

    if(a!==null){

    }
    $('.add-cat-btn').click(function(){
        if(a!==null){
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
            <h1 className="mt-2">Categories</h1>
            
            <a className="add-cat-btn mt-5"><i class="fas fa-plus"></i> Add Category</a>
            <div className="row mt-5">
                {
                    cat.map((c,index)=>(
                        <div key={index} className="col-md-3">

                            <p className="">{c.name}<span  className="text-danger btn" id={index} value={c._id} onClick={deleteCat.bind(this,index)}><i class="far fa-trash-alt ml-1"></i></span></p>

                        </div>
                    ))
                }
            </div>
            <div className="addCat d-none">
                <form className="shadow-lg p-5" onSubmit={handleSubmit(onSubmit)}>
                    <i class="btn close-btn text-danger fas fa-times-circle"></i>
                    <h1>Add Category</h1>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            id="name"
                            {...register('name', { required: true })}
                        />
                        {errors.name && <span className="text-danger">This field is required</span>}
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
                        <label>Type</label>
                        <input
                            id="type"
                            {...register('type', { required: true })}
                        />
                        {errors.type && <span className="text-danger">This field is required</span>}
                    </div>
                    <div className="form-group">
                        <button className="btn add mt-4">Add Category</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
