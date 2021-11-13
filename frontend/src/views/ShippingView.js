import React, { useState } from 'react'
import {Form, Button} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const ShippingView = ({history}) => {
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    return (
        <FormContainer>
            Shipping
        </FormContainer>
    )
}

export default ShippingView
