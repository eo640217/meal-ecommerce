import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userAction'


const LoginView = ({location, history}) => {
    const userLogin = useSelector(state => state.userLogin);
    const {loading, error, userInfo} = userLogin;
    const dispatch = useDispatch();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) history.push(redirect)
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <div className='form-card'>
            <h1>Welcome back</h1>
            <p className='form-sub'>Sign in to your account</p>
            {loading && <Loader />}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group-gap'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className='form-group-gap'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div style={{marginTop: '1.5rem'}}>
                    <Button className='btn-food' type='submit'>Sign In</Button>
                </div>
            </Form>
            <div className='form-divider' style={{marginTop: '1.25rem'}}>
                New customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Create account</Link>
            </div>
        </div>
    )
}

export default LoginView
