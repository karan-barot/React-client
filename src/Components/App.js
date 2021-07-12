import React,{useState} from 'react'
import './App.css';
import { BrowserRouter,Route,Switch,useHistory} from 'react-router-dom'
import Navigation from './Navigation'
import Home from './Home'
import Footer from './Footer'
import Signin from './Signin'
import Signup from './Signup'
import About from './About'
import Contact from './Contact'
import ItemsAPI from './ItemsAPI'
import Cart from './Carts'
import Orders from './Orders'
import Category from './Categories'
import Brand from './Brand'
import Wishlist from './Wishlist'
import {ToastContainer,toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function App() {


  var history = useHistory()

  var tok = localStorage.getItem("userToken")
  const[authorized,setAuthorized] =useState(tok);

  const signOff=(e)=>{
    setAuthorized("")
    localStorage.clear()
    window.location.reload()
  }
  const signIn=(e)=>{

    console.log("sign")
    setAuthorized(tok)    
    window.location.reload()

  }
  return (
    <div className="App">
        <BrowserRouter>
          <Navigation a={authorized} so={(e)=>{signOff(e)}} /> 
          <div className="container-fluid p-0 app">
            <Switch className="overflow-hidden">
              <Route path='/' exact component={Home}/>
              <Route path='/signin' exact render={()=><Signin si={(e)=>{signIn(e)}}/>}  />
              <Route path='/signup' exact component={Signup}/>
              <Route path='/about' exact component={About}/>
              <Route path='/contact' exact component={Contact}/>
              <Route path='/items' exact render={()=><ItemsAPI a={authorized}/>}/>
              <Route path='/brands' exact render={()=><Brand a={authorized}/>}/>
              <Route path='/categories' exact render={()=><Category a={authorized}/>}/>
              <Route path='/cart' exact render={()=><Cart a={authorized}/>}/>
              <Route path='/orders' exact render={()=><Orders a={authorized}/>}/>
              <Route path='/wishlist' exact  render={()=><Wishlist a={authorized}/>}/>
              <ToastContainer />
            </Switch>
          </div>
          <Footer/>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
