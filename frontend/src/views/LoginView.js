import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userAction'
import FormContainer from '../components/FormContainer'


const LoginView = ({location, history}) => {
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1]:'/'
    
        useEffect(()=> {
            if (userInfo){ //if user info exists , dont need to sign in. skip sign in sheet
                 history.push(redirect)}
        }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email,password))
    }

    return (
         <FormContainer>
            <h1>Sign In</h1>
            {loading && <Loader/>}
            {error && <Message variant='danger'>{error}{console.log(error)}</Message>}
            <Form className='py-3' onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}>

                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button className="py-3 grow" type='submit' variant='primary'>Log In</Button>
            </Form>
            <Row className='py-3 grow'>
                <Col>
                    New Customer?<Link to={redirect? `/register?redirect=${redirect}`:'/register'}> Register</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default LoginView
