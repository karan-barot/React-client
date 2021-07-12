import React,{useState} from 'react'
import {useHistory} from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import { toast } from 'react-toastify';
import {useForm} from 'react-hook-form'

export default function Signup(props) {
    let history =useHistory();

    const {register,handleSubmit,formState: { errors }}=useForm();
    
    //Submit the data for login
    const onSubmit= async (data)=>{
        let config = {
            headers:{
                'Content-Type':'application/json'
            }
        }


        //post form data to server 
        try{
            const response = await axios.post('https://shoppey.herokuapp.com/api/user',data,config);

            //storing the token to local storage
            localStorage.setItem('userToken',response.data.token)

            //decode the pay load from jwt token
            const userData = decode(response.data.token)
            const user = userData.user            
            localStorage.setItem("userID",user.id)
            localStorage.setItem("userName",user.name)

            //After login set authorized to true
            history.push('/items')
            props.si()

        }catch(error){
            //If an error occurs 
            toast.error(error,"Error")
        }
        
    }
    return (
        <div className="container-fluid">
        <div className="row justify-content-center">
            <div className="mt-5 login-form-container">
                <form className="login-form pt-5" onSubmit={handleSubmit(onSubmit)}> 
                    <div class="custom-shape-divider-bottom-1613595519">
                        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
                        </svg>
                    </div>                       
                    <h1 className="mt-5">Signup</h1>
                    <div className="form-group mt-3 input">
                        <i className="fas fa-user-circle"></i>
                        <input type="text" name="name" className="form-control" placeholder="Name" 
                             id="name"
                             {...register('name', { required: true })}
                        />
                    </div>
                    {errors.name && <span className="text-danger">Name is required</span>}

                    <div className="form-group mt-3 input">
                        <i class="fas fa-envelope"></i>
                        <input type="text" name="email" className="form-control" placeholder="Email" 
                             id="email"
                             {...register('email', { required: true })}
                        />
                    </div>
                    {errors.email && <span className="text-danger">Name is required</span>}

                    <div className="form-group mt-3 input">
                        <i className="fas fa-key"></i>
                        <input type="password" name="password" className="form-control" placeholder="Password" 
                             id="password"
                             {...register('password', { required: true })}
                        />
                    </div>
                    {errors.password && <span className="text-danger">Password is required</span>}

                    <div className="form-group d-flex justify-content-center mt-3">
                        <button className="mt-3">Submit</button>
                    </div>
                    <p className="text-center mt-3">Or</p>
                    <div className="d-flex justify-content-center login-social">
                        <i className="fab fa-facebook-f"></i>
                        <i className="fab fa-google"></i>
                    </div>
                </form>
            </div>
        </div>
    </div>
    )
}
