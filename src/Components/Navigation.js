import React,{useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import {useHistory} from 'react-router-dom'
import $ from 'jquery'

export default function Navigation(props) {
    
    const[showMenu,setShowMenu] = useState()
    const[sideMenu,setSideMenu] = useState()
    const a = props.a
    useEffect(()=>{
        if(window.innerWidth>768){
            setSideMenu(false)
        }
        else{
           setSideMenu(true)
        }
       
        window.addEventListener("resize",()=>{
            if(window.innerWidth>768){
                setSideMenu(false)
            }
            else{
               setSideMenu(true)
            }
        })
    },[])

    const openDropDown=()=>{
        if(window.innerWidth>768){
            setShowMenu(!showMenu)
        }
        
    }
    return(
        <nav className="active">
            <NavLink to='/' className="n-brand">Shoppy</NavLink>               
            <div className={`nav-menu ${sideMenu? '':'d-flex'}`}>

                <ul className="nav-links">
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/items'>Items</NavLink></li>
                    <li><NavLink to='/categories' className="cat-dropdown">Categories</NavLink></li>
                    <li><NavLink to='/brands'>Brands</NavLink></li>
                    <li><NavLink to='/about'>About</NavLink></li>
                    <li><NavLink to='/contact'>Contact</NavLink></li>
                </ul>
            
                {
                    a===null?
                    <ul className="ifNotLoggedIn ">
                        <li><NavLink to='/signup'>Signup</NavLink></li>
                        <li><NavLink to='/signin'>Signin</NavLink></li>
                    </ul> 
                    :
                    <ul className="ifLoggedIn" onMouseOver={()=>openDropDown()} onMouseOut={()=>openDropDown()}>
                        <li className={`profile-dropdown-btn `} onMouseOver={()=>openDropDown()} onMouseOut={()=>openDropDown()}><i className="fas fa-user-circle"></i></li>
                        <div className={`profile-dropdown-menu ${showMenu ? 'd-flex':''}`}>   
                            <p>{localStorage.getItem("userName")}</p>   
                            <NavLink to='/orders'>Orders</NavLink>      
                            <NavLink to='/wishlist'>Wishlist</NavLink>               
                            <NavLink to='/cart'>Cart</NavLink> 
                            <NavLink to='/' onClick={props.so}>SignOff</NavLink>
                        </div>
                    </ul> 
                }
            </div>
            
            <button onClick={()=>setSideMenu(!sideMenu)} className={`btn ${sideMenu?'':'active'}`}><i class="fas fa-th-large"></i></button>
            
        </nav>
    )



}


