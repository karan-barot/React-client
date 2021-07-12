import React,{useEffect} from 'react'
import AOS from 'aos'
import MSG from '../Images/message.svg'
export default function Contact() {
    useEffect(()=>{
        AOS.init({
            duration:2000
        });
        AOS.refresh();
    },[])
    return (        
        <div className="container-fluid contact" data-aos="zoom-out">
            <form className="">
                <div className="form-left">
                    <img src={MSG} className="img-fluid" alt="contactimage"/>
                    <div className="overlay"></div>
                </div>
                <div className="form-right">
                    <h3 className="mb-3">Contact us</h3>
                    <input type="text" placeholder="First Name"/><br/>
                    <input type="text" placeholder="Last Name"/><br/>
                    <input type="text" placeholder="Email"/><br/>
                    <textarea type="text" placeholder="Explain in detail"></textarea><br/>
                    <button>Send</button>
                </div>
            </form>
        
        </div>
    )
}
