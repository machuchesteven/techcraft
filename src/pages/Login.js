import React from 'react'
import {Form, Button, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){
    <div>
        <Container>
        <h1 class="display-5  fw-bold">Login and Help Us Deliver To You our best products</h1>
        <Form>
            <Form.Control placeholder="enter the username" id="username" type="text" />
            <Form.Control placeholder="enter the username" id="password" type="password" />
            <Button type="submit">Log In </Button>
        </Form>
        </Container>
    </div>

}

export default Login;