import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import {Container, Button,Image, Form, Card, Row, Navbar as BNavbar, Nav} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Switch, useParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSpinner, faArrowDown, faSearch} from "@fortawesome/free-solid-svg-icons"
import {faGithub, faFacebook, faInstagram, faLinkedin} from "@fortawesome/free-brands-svg-icons"
import {Fade, Zoom, Bounce, Slide, LightSpeed} from "react-reveal"
import img from "./image.jpg"

import './index.css'
document.title = "TechCraftHosting"



const Navigation = () => {
  function loginButton(e){
      e.preventDefault()
      console.log("Redirect to /login  screen")
      window.location.href = "/login"
  }
  return (
      <div>
          <BNavbar bg="light" stick="top" expand="md">
          <Container>
              <div><BNavbar.Brand><b id="brand-name">TechCraftHost</b></BNavbar.Brand></div>
              <Nav className="justify-content-center" activeKey="/" id="navigation">
                  <Nav.Item style={{flex: 2}}><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                  <Nav.Item style={{flex: 2}}><Nav.Link href="/">Consult Us</Nav.Link></Nav.Item>
                  <Nav.Item style={{flex: 2}}><Nav.Link href="#services">Services</Nav.Link></Nav.Item>
                  <Nav.Item style={{flex: 2}}><Nav.Link href="https://www.techcraft.co.tz/">Main Site</Nav.Link></Nav.Item>
              </Nav>
              <Button variant="outline-primary" className="nav-button" onClick={(e)=> loginButton(e)}>Log In</Button>

          </Container>
          </BNavbar>
      </div>
  )
}

const Header = () =>{
  return <div>
    <Container bg="white" className="">      
      <header><Bounce top>
        <h1 className="display-5 fw-bold" id="site-header">
          Get Your Business, Brand, or Office Domain<br />
          And Scale Up Your Business With<br />
          Us. It's Just A Single Click <FontAwesomeIcon icon={faArrowDown} id="arrow-down" />
        </h1>
        </Bounce>
      </header></Container>
  </div>
}
const Jumbotron = () =>{
  return (
    <header className="jumbotron">
      <div className="overlay"></div>
      <Container>
        <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faSpinner} spin />
        
        <h1>More than 10 major companies in Tanzania trusts our services, Join us today</h1>
        <p>We offer email hosting, web hosting,andoid app codebase hosting and also we holp small businesses to go online using our hosting</p>
      </Container>
    </header>
  )
}

const App = () =>{
  const [requestedName, setRequestedName] = useState("")
  const [available, setAvailable] = useState(null)
  function handle(e){
    setRequestedName(e.target.value)
  }
  function submitted(e){
    checkAvailability(requestedName)
    setAvailable(true)
  }
  function checkAvailability(domain){
    console.log(domain)
    console.log(available)
  }
  function Loaded(){
    if(available){

      return <div>
        <h1>{requestedName} is submitted</h1>
      </div>
    }else{
      return <div>
        <div>
          <h1 className="justify-content-md-center">We are Kindly Waiting for your suggestion to work for you</h1>
        </div>
      </div>
    }
  }
  
  
  return <div>
    <Container bg="white">
    <Form onSubmit={(e)=> submitted(e)} action={`/check/${requestedName}`} type="POST">
    <Form.Control type="text" onChange={(e)=>{handle(e)}} required name="domain_name" id="domain_name_input" className="shadow-sm p-3 mb-5" />
    <div className="container" style={{justifyContent:"center", padding: "auto"}}>
    <Button variant="outline-primary" className="justify-content-center" type="submit">Check Your Domain Availability</Button>
    </div>
    </Form>
    <br />
    <Loaded />
    </Container>
  </div>
}
// the search query is given

const Check = () =>{
  const [availability, setAvailability] = useState("")
  const {domain} = useParams()
  const [queryName, setQueryName] = useState(domain)
  function queryNameHandle(e){
    setQueryName(e.target.value)
    console.log(queryName)
  }
  function resubmitted(e){
    console.log(`Submitted value of domain is ${queryName}`)
  }

    useEffect(()=>{
      fetch(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=at_S7GiKRUSgB9dilmMnaTWaV5IfHhBF&domainName=${domain}&credits=DA)`,{
        method : "GET",
        mode: "cors",
        headers: {
          "Content-Type" : "application/json"
        }
      })
        .then(res=> res.json())
        .then(result => {
          console.log(result["DomainInfo"])
          setAvailability(result["DomainInfo"].domainAvailability)
          
        })

    }, [domain])
    const domainList = [".co.tz", ".com", ".or.tz", ".io", ".net", ".edu"] 
    function Availables(){
      const rootDomain = domain.slice(0,domain.lastIndexOf('.'));
      return <div className="justify-content-center container">
        <h2>Other Available domains for your business are :-</h2>
        <ul>
          {domainList.map(ending => {
            return <li>{rootDomain}{ending}</li>
          })}
        </ul>
      </div>
    }
    return <div>
      <Container>
        <Form.Group>
          <Form.Control type="text" onChange={(e)=> queryNameHandle(e)} value={queryName}/><Button type="outline-pprimary" onClick={(e)=> resubmitted(e)} >Check</Button>
        </Form.Group>
      <h1>Domain Is <Button variant-="outline-primary">{domain}</Button> Checked and is {availability}</h1>
      <Availables />
      </Container>
    </div>
  
}




// the domain is isAvailable
const Order = () =>{
  const {domain} = useParams() 
  const domainList = [".co.tz", ".com", ".or.tz", ".io", ".net", ".edu"] 
  return <div>
    <h1>The Domain name you have checked for is available</h1>
    <div>
      <h3>
        Other Available domains are :-
      </h3>
      <ul>
        {domainList.map(dom =>{
          return <li>{domain}{dom}</li>
        })}
      </ul>
    </div>
  </div>
}

const Login = () =>{
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  function handleFormSubmission(e){
    e.preventDefault();
    const data ={username: username, password: password}
    console.log(data)
  }

  return (
    <div>
      <Container>
        <Form onSubmit={(e)=>{handleFormSubmission(e)}}>
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter your username" type="text" onChange={(e)=>setUsername(e.target.value)} />
          <Form.Label>Username</Form.Label>
          <Form.Control placeholder="Enter your password" type="password" onChange={(e)=>setPassword(e.target.value)} />
          <Button variant="primary" type="submit" name="submit">Log In</Button>
        </Form>
      </Container>
    </div>
  )
}

const Services = () =>{
  const [services, setServices] = useState([])
  const [servicesLoaded, setServicesLoaded] = useState(null)
  useEffect(()=>{
    fetch("http://127.0.0.1:8000/")
     .then(res => res.json())
     .then(result =>{
       console.log(result["incomes"])
       setServices(result["incomes"])
       setServicesLoaded(true)
       console.log(servicesLoaded)
     })
     .catch(error =>{
       console.log(error)
       setServicesLoaded(false)
     })
  
  }, [servicesLoaded])
  if(services.length >= 1){
    return <div className="serviceload">
      <Container>
        <Jumbotron /> 
      <Row xs={1} md={2} lg={3} className="g-4">
      {services.map(serv =>{
        return <div id="services">
          
          <Card style={{ width: '18rem' }} >
            <Card.Img as={Image} variant="top" src={img} className="img-fluid" style={{width: "300px", height: "200px"}} />
            <Card.Body>
              <Card.Title>{serv.name}</Card.Title>
              <Card.Text>
                {serv.amount}
              </Card.Text>
              <Button variant="primary">User {serv.added_by}</Button>
            </Card.Body>
          </Card>
        </div>
      })}
      </Row>
      </Container>
    </div>
  }else{
    return <div className="services-container"  id="services">
    <div className="services">
      <Fade left>
      {/* <FontAwesomeIcon icon={faSpinner} spin size="10x" style={{color: "blueviolet"}}/> */}
      <h2><Slide left>TechCraft Technologies </Slide><Slide right>Offers Other Services</Slide></h2>
      </Fade>
      <Card className="service-card col">
        <Bounce right>
        <Card.Img variant="left" className="img-fluid" src={img} />
        </Bounce>
        <Card.ImgOverlay className="justify-content-center"><Card.Title>Hello</Card.Title><Card.Text>The services going up here</Card.Text></Card.ImgOverlay>
        <Card.Body>
          <Card.Title>Web Hosting</Card.Title>
          <Card.Text>
            We Offer a hosting solution to most of your website and we make surewe give you 24/7 availability to grow up your business
            ...
          </Card.Text>
          <Button style={{ borderRadius: "0px !important" }} >Look How we Do it</Button>
        </Card.Body>
      </Card>
      <Container className="justify-content-center services" id="service-container">
      <Row xs={1} md={2} lg={2}>
      <Card className="justify-content-center col-md-5 shadow-sm mt-2 ml-2">
          <Card.Title>Software Development</Card.Title>
          <Card.Body><Card.Text>
          We provide services in design and development of mobile applications, 
          desktop applications, 
          web applications with focus on responsiveness and good SEO.
          </Card.Text></Card.Body>
        </Card>
        <Card className="justify-content-center col-md-5 shadow-sm m-2">
          <Card.Title>ICT Infrastructure Support & Maintenance</Card.Title>
          <Card.Body><Card.Text>
          We provide wire and wireless networking solutions for residential and enterprise applications. We also provide support and maintenance services tailored tospecific ICT requirements.
          </Card.Text></Card.Body>
        </Card>        
        <Card className="justify-content-center col-md-5 shadow-sm m-2">
          <Card.Title>Research</Card.Title>
          <Card.Body><Card.Text>
          We conduct applied research in various areas of information and communication technologies. We also develop data collection and entry systems for use in both qualitative and quantitative research in various fields.
          </Card.Text></Card.Body>
        </Card>        
        <Card className="justify-content-center col-md-5 shadow-sm m-2">
          <Card.Title>Training</Card.Title>
          <Card.Body><Card.Text>
          We offer professional training in Mobile apps development, Desktop and Web apps development, IoT products & services development, Computer networking, Cyber security and Business Model Development for ICT products & services.
          </Card.Text></Card.Body>
        </Card>        
        <Card className="justify-content-center col-md-5 shadow-sm m-2">
          <Card.Title>Artificial Intelligence</Card.Title>
          <Card.Body><Card.Text>
          We harnessing the power of data to accelerate change of your business by leveraging AI and analytics for business to unlock new efficiencies and increase productivity using enterprise-wide AI solutions that deliver game changing results.
          </Card.Text></Card.Body>
        </Card>        
        <Card className="justify-content-center col-md-5 shadow-sm m-2">
          <Card.Title>Internet of Things (IoT)</Card.Title>
          <Card.Body><Card.Text>
          We provide strategic consulting, development, data analytics tools and application management using network of physical devices connected and exchanging data to solve business challenges and get new revenue streams via IoT technology.
          </Card.Text></Card.Body>
        </Card>  
        <div className=" col-md-3"></div> 
        <LightSpeed right>     
        <Card className="justify-content-center shadow-sm m-2">
          <Card.Title>ICT Consultancy</Card.Title>
          <Card.Body><Card.Text>
          We offer a range of consultancy services in ICT and provide security audit services.
          </Card.Text></Card.Body>
        </Card>
        </LightSpeed>
      </Row>
      </Container>
      </div>
      </div>
  }
}
const Contact = () =>{
  return <div className="container">
    <h1>Contact Us</h1>
    <div>The part for the map</div>
    <div>The Part for the contact form or other things</div>
  </div>
}


const Footer =()=>{
  
  return <div className="footer-container">
    <Zoom>
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>Techcraft Technologies Tanzania Limited</h4>
          <p>
            +255(0)758286451
          </p>
          <p>Mbezi Beach</p>
          <p>Dar Es Salaam</p>
        </div>
        <div className="footer-col">
          <h4>Get Help with Our Services</h4>
          <ul className="footer-list">
            <li>Email Hosting</li>
            <li>System Hosting</li>
            <li>Network Architecture Design</li>
            <li>Web and Mobile Development</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Other Products</h4>
          <ul className="footer-list">
            <li>Techcraft Hub</li>
            <li>Events and Projects</li>
            <li>Consultancy</li>            
          </ul>
        </div>
        <div className="footer-col">
          <h4>Follow Us</h4>
          <ul className="footer-list">
            <li><FontAwesomeIcon icon={faGithub} size="2x" /></li>
            <li><FontAwesomeIcon icon={faInstagram} size="2x" /></li>
            <li><FontAwesomeIcon icon={faFacebook} size="2x" /></li>
            <li><FontAwesomeIcon icon={faLinkedin} size="2x" /></li>
          </ul>
        </div>
      </div>
    </footer>
    </Zoom>
  </div>
}




ReactDOM.render(
  <div>
  <Navigation />
  <Router>
    <Route path="/" exact>
      <Header />
      <App />
    </Route> 
  </Router>
  <Router>
    <Switch>
    <Route path="/order/:domain" exact>
      <Order />
    </Route>
    <Route path="/check/:domain">
      <Check />
    </Route>
    <Route path="/login" exact>
      <Login />
    </Route>
    </Switch>
  </Router>
  <Services />
  <Contact />
  <Footer />
  
  </div>,
  document.getElementById("root")
)