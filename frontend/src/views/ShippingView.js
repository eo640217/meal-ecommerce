import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import { saveShippingAddress } from '../actions/cartAction'
import CheckoutSteps from '../components/CheckoutSteps'

const ShippingView = ({history}) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}))
        history.push('/payment')
    }

    return (
        <div className='form-card'>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <p className='form-sub'>Where should we deliver?</p>
            <Form onSubmit={submitHandler}>
                <Form.Group className='form-group-gap'>
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control type='text' placeholder='123 Main St' value={address} onChange={(e) => setAddress(e.target.value)} required />
                </Form.Group>
                <Form.Group className='form-group-gap'>
                    <Form.Label>City</Form.Label>
                    <Form.Control type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} required />
                </Form.Group>
                <Form.Group className='form-group-gap'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control type='text' placeholder='Postal Code' value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
                </Form.Group>
                <Form.Group className='form-group-gap'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} required />
                </Form.Group>
                <div style={{marginTop: '1.5rem'}}>
                    <Button className='btn-food' type='submit'>Continue to Payment</Button>
                </div>
            </Form>
        </div>
    )
}

export default ShippingView

