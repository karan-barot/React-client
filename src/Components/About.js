import React,{useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import AOS from 'aos'
import "aos/dist/aos.css";
export default function About() {
    useEffect(()=>{
        AOS.init({
            duration:2000
        });
        AOS.refresh();
    },[])
    return (
        <div className="container-fluid about">
            <h1 className="mt-5">About the developers</h1>
            <div className="row mt-5 mb-4">
                <div className="col-md-1"></div>

                <div className="col-md-4" data-aos="fade-right">
                    <div className="">
                        <h2>Adit Patel</h2>                       
                        <div className="info">
                            <div className="">
                                <p><b>Email : </b><br/>karanbarot33344@gmail.com</p>
                                <p><b>Contact : </b><br/>+1(437)-987-3077</p>
                                <p><b>Address : </b><br/>Toronto</p>
                            </div>
                        </div>
                        <ul className="stay-connected">
                            <li><NavLink to="./"><i className="fab fa-facebook-f"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-google"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-instagram"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-twitter"></i></NavLink></li> 
                        </ul>
                    </div>
                </div>
                <div className="col-md"></div>
            </div>
            <div className="row mb-4">
                <div className="col-md"></div>
                <div className="col-md-4" data-aos="fade-left">
                    <div className="" >
                        <h2>Heet Patel</h2>                       
                        <div className="info">
                            <div className="">
                                <p><b>Email : </b><br/>karanbarot33344@gmail.com</p>
                                <p><b>Contact : </b><br/>+1(437)-987-3077</p>
                                <p><b>Address : </b><br/>Toronto</p>
                            </div>
                        </div>
                        <ul className="stay-connected">
                            <li><NavLink to="./"><i className="fab fa-facebook-f"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-google"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-instagram"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-twitter"></i></NavLink></li> 
                        </ul>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            <div className="row mb-4">
                <div className="col-md-1"></div>
                <div className="col-md-4" data-aos="fade-right">
                    <div className="">
                        <h2>Karan Barot</h2>                       
                        <div className="info">
                            <div className="">
                                <p><b>Email : </b><br/>karanbarot33344@gmail.com</p>
                                <p><b>Contact : </b><br/>+1(437)-987-3077</p>
                                <p><b>Address : </b><br/>Toronto</p>
                            </div>
                        </div>
                        <ul className="stay-connected">
                            <li><NavLink to="./"><i className="fab fa-facebook-f"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-google"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-instagram"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-twitter"></i></NavLink></li> 
                        </ul>
                    </div>
                </div>
                <div className="col-md"></div>
            </div>
            <div className="row mb-5">
                <div className="col-md"></div>
                <div className="col-md-4" data-aos="fade-left">
                    <div className="">
                        <h2>Vijay Thakar</h2>                       
                        <div className="info">
                            <div className="">
                                <p><b>Email : </b><br/>karanbarot33344@gmail.com</p>
                                <p><b>Contact : </b><br/>+1(437)-987-3077</p>
                                <p><b>Address : </b><br/>Toronto</p>
                            </div>
                        </div>
                        <ul className="stay-connected">
                            <li><NavLink to="./"><i className="fab fa-facebook-f"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-google"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-instagram"></i></NavLink></li>                 
                            <li><NavLink to="./"><i className="fab fa-twitter"></i></NavLink></li> 
                        </ul>
                    </div>
                </div>
                <div className="col-md-1"></div>
            </div>
            
        </div>
    )
}
