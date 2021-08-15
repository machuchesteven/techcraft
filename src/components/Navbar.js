import React from "react"
import {Container, Navbar as BNavbar, Button, Nav} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"



const Navbar = () => {
    return (
        <div>
            <BNavbar bg="light">
            <Container>
                <div><BNavbar.Brand><b id="brand-name">TechCraftHost</b></BNavbar.Brand></div>
                <Nav className="justify-content-center" activeKey="/">
                    <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item>
                    <Nav.Item>Consult Us</Nav.Item>
                    <Nav.Item>More Services</Nav.Item>
                    <Nav.Item>Hire Us</Nav.Item>                   
                </Nav>
                <Button variant="outline-primary" className="nav-button">Log In</Button>

            </Container>
            </BNavbar>
        </div>
    )
}

export default Navbar
