import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { savePaymentMethod } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentView = ({history}) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;
    if (!shippingAddress) history.push('/shipping');

    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push('/placeorder')
    }

    return (
        <div className='form-card'>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment</h1>
            <p className='form-sub'>How would you like to pay?</p>
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group-gap'>
                    <div className='payment-options'>
                        {['PayPal', 'Credit Card'].map(method => (
                            <label key={method} className={`payment-option${paymentMethod === method ? ' active' : ''}`}>
                                <Form.Check
                                    type='radio'
                                    name='paymentMethod'
                                    value={method}
                                    checked={paymentMethod === method}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                                <span>{method === 'PayPal' ? '💳 PayPal' : '💳 Credit Card'}</span>
                            </label>
                        ))}
                    </div>
                </Form.Group>
                <div style={{marginTop: '1.5rem'}}>
                    <Button className='btn-food' type='submit'>Continue to Review</Button>
                </div>
            </Form>
        </div>
    )
}

export default PaymentView

