import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const RegisterView = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch();
    const userRegister = useSelector(state => state.userRegister);
    const {loading, error, userInfo} = userRegister;

    const redirect = location.search ? location.search.split('=')[1]:'/'
    
        useEffect(()=> {
            if (userInfo){ //if user info exists , dont need to sign in. skip sign in sheet
                 history.push(redirect)}
        }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if(password !== confirmPassword){setMessage('Passwords do not match');}
        else
            { dispatch(register(name, email,password))}
    }

    return (
         <FormContainer>
            <h1>Sign Up</h1>
            {error && <Message variant='danger'>{error}{console.log(error)}</Message>}
            {message && <Message variant='danger'>{message}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label> Name </Form.Label>
                    <Form.Control type='name' placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                </Form.Group>
                {/* <TextField
                    className = 'tc'
                    required
                    id='name'
                    label="Name"
                    margin="normal" 
                    placeholder="Name"
                    onChange={(e)=>setName(e.target.value)}
                    /> */}
                

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
                   
                </Form.Group>
                <Button className="py-3 grow" type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Have an account?<Link to={redirect? `/signin?redirect=${redirect}`:'/signin'}> Login</Link>
                </Col>
            </Row>
            
        </FormContainer>
    )
}

export default RegisterView
