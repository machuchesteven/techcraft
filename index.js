import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {Form, Button, Container} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
// import axios from "axios"
import Navbar from './components/Navbar'
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Route, useParams} from 'react-router-dom'
import "./index.css"
import Login from './pages/Login'
import RequestDomain from './pages/RequestDomain'
import DomainCheck from './components/DomainCheck'




document.title ="TechCraftHosting"



const App = ()=>{
  const [searchQuery, setSearchQuery] = useState({
    apiKey: "",
    domainName: ""
  })
  const [domainInfo, setDomainInfo] = useState({
    domainName: "" 
  })
  const [isAvailableDomain, setIsAvailableDomain] = useState(null)
  const [reqName, setReqName] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  function handle(e){
    const newData = {...searchQuery}
    newData["apiKey"] = "at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF";
    newData["domainName"] = e.target.value;
    console.log("NewData is " + newData)
    setSearchQuery({
      apiKey: "at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF",
      domainName: e.target.value,
      credits: "DA",
    })
    setReqName(e.target.value)
    console.log(searchQuery)
  }
  function handleSubmit(e){
    e.preventDefault()
    setIsSubmitted(true)
    console.log("Form Submitted" + isSubmitted)
    const domainName = document.getElementById("domain-search-input")
    setSearchQuery(domainName)
    console.log("searched domain value after submitting is " + domainName)
    // const resp = await axios.get(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF&domainName=${domainName}&credits=DA)`
    // console.log(resp)
    console.log(searchQuery)
    // axios.get("https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF&domainName=$google.com&credits=DA")
    //   .then((res)=>{res.json()})
    //   .then(
    //     (result)=>{
    //       console.log(result)
    //     },
    //     (error)=>{  
    //       console.log(error)
          
    //     }

      
  }
  useEffect(()=>{
    const suggestionDiv = document.getElementById("suggestions")
    if (isSubmitted){
      fetch(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF&domainName=${reqName}&credits=DA)`,{
        method : "GET",
        mode: "cors",
        headers: {
          "Content-Type" : "application/json"
        }
      })
        .then(res=> res.json())
        .then(result => {         
          console.log(result["DomainInfo"].domainAvailability)
          if (result["DomainInfo"].domainAvailability === "AVAILABLE"){
            setIsAvailableDomain(true)
            setDomainInfo(result["DomainInfo"])
            console.log(suggestionDiv)
          }
          else if (result["DomainInfo"].domainAvailability === "UNAVAILABLE"){
            setIsAvailableDomain(false)
            console.log(isAvailableDomain)
            setDomainInfo(result["DomainInfo"])
            getSuggestions(result["DomainInfo"].domainName)  
            console.log(suggestionDiv)          
          }
          else{
            console.log("There were an Error parsing your request")
            console.log(suggestionDiv)
          }
        })
        .catch(error => console.error(error))
  
    }
    else{
      console.log("Object not submitted")
      
    }
  }, [isSubmitted, reqName])
  const domainState =()=>{
    if(isSubmitted === false){
      return (
        <h1>You have not provided the domain name for you to look for</h1>
      )
    }
    else{
      <Container>
        <h1>OOps we can not connect to the servers</h1>
        <h4>
          The domain name you have looked for is {searchQuery.domainName}
        </h4>
      </Container>

    }
  }
  const getSuggestions = (string) =>{
    if (string.endsWith(".com")){
      console.log("The DomainName passed was ending with .com and is unaavailable")
      console.log("Try " + string.slice(0, string.length - 4) + ".net " + "or " + string.slice(0,string.length - 4) + ".co.tz" )
    }else if(string.endsWith(".co.tz")){
      console.log("The DomainName passed was ending with .co.tz and is unaavailable")
      console.log("Try " + string.slice(0,string.length - 6) + ".net" + " or " + string.slice(0,string.length - 6) + ".com" )
    }
    else{  
      console.log("The DomainName passed was ending with your suggestions")
      console.log("Try " + string.slice(0,string.length-4) + ".net" + " or " + string.slice(0,string.length - 4) + ".co.tz" + " or " + string.slice(0,string.length - 4) + ".or.tz")
    }
  }
  // const Fetched = () =>{
  //   useEffect(()=>{
  //     if(isAvailableDomain === null){
  //       return (
  //         <div>We are waiting for your domain name ...</div>
  //       )
  //     }else if(isAvailableDomain === false){
  //       console.log(domainInfo)
  //       return (
  //         <div>Your domain is not available but you can try other domain names</div>
  //       )
  //     }else{
  //       console.log(domainInfo)
  //       return (
  //         <div className="row">
  //           <h3>The domain {domainInfo.domainName} is available at a price of <b>45000/=</b><Button variant="outline-primary">Click to buy</Button></h3>
  //         </div>
  //       )
  //     }
  //   },[])


  return (
    <div>
    <Navbar />
    <Container>
      <header>
        <h1 className="display-5 fw-bold" id="site-header">
          Get Your Business, Brand, or Office Domain<br />
          And Scale Up Your Business With<br />
          Us. It's Just A Single Click <FontAwesomeIcon icon={faArrowDown} id="arrow-down" />
        </h1>
      </header>
      <Form onSubmit={(e)=> {handleSubmit(e)}}>
        <Form.Control lg="true" onChange={(e)=>{handle(e)}} type="text" id="domain-search-input " placeholder="Enter your Domain name Here" />
        <div className="justify-content-center">
          <Button variant="primary" className="text-center" size="lg" type="submit"><Link to="/checkavailability">Seach for Your Domain</Link></Button>
        </div>
      </Form>
      <hr />
      <Container>
        <div className="" id="suggestions" >
            {domainState()}
        <hr /></div>
      </Container>
      {
         domainInfo
      }
      <DomainCheck />
    </Container>
    </div>
  )
}

const Searched = () =>{
  const {domain } = useParams()
  return (
  <Container>
  <div>
    <h1>The domain name searched is {domain}</h1>
  </div>
  </Container>
  )

}

ReactDOM.render(
  (<Router>
    <Route path="/checkavailability" component={DomainCheck()} />
    <Route path="/requestdomain" exact component={RequestDomain()} />
    <Route path="/login" component={Login()} />
  <div>
  <App />
  <Button><a href={"/machu"}>Go To Machu</a></Button>
  <Route path="/search/:domain">
    <Searched />
  </Route>
  </div>
  </Router>),
  document.getElementById("root")
)