import React from "react"
import {Container, Navbar as BNavbar, Button, Nav} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"



const Navigation = () => {
    function loginButton(e){
        e.preventDefault()
        console.log("Redirect to /login  screen")
        window.location.href = "/login"
    }
    return (
        <div>
            <BNavbar bg="light" sticky>
            <Container>
                <div><BNavbar.Brand><b id="brand-name">TechCraftHost</b></BNavbar.Brand></div>
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item style={{flex: 2}}><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item style={{flex: 2}}><Nav.Link href="/">Consult Us</Nav.Link></Nav.Item>
                    <Nav.Item style={{flex: 2}}><Nav.Link href="/">Help</Nav.Link></Nav.Item>
                    <Nav.Item style={{flex: 2}}><Nav.Link href="/">Projects</Nav.Link></Nav.Item>
                </Nav>
                <Button variant="outline-primary" className="nav-button" onClick={(e)=> loginButton(e)}>Log In</Button>

            </Container>
            </BNavbar>
        </div>
    )
}

export default Navigation;
