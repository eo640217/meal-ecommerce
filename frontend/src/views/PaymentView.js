import React, { useState } from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
// import Message from '../components/Message'
// import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
import { savePaymentMethod} from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentView = ({history}) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress){history.push('/shipping');}

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    
    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    
    return (
        <FormContainer>
            <CheckoutSteps step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='Paypal'  
                            id='PayPal' 
                            name='paymentMethod' 
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                    <Col>
                        <Form.Check 
                            type='radio' 
                            label='Credit card'  
                            id='CreditCard' 
                            name='paymentMethod' 
                            checked
                            onChange={(e)=>setPaymentMethod(e.target.value)}>
                        </Form.Check>
                    </Col>
                </Form.Group>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentView
