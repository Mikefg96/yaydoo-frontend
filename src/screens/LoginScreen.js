import React, { useContext, useReducer, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UserContext } from '../UserContext'

const endpoint = process.env.REACT_APP_API_URL

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const LoginScreen = () => {
    let history = useHistory()
    const { setUser } = useContext(UserContext);
    const [formData, setFormData] = useReducer(formReducer, {})
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateForm = () => {
        
        !formData.email ? setEmailError('El correo electrónico es un campo requerido.') : setEmailError('')
        !formData.password ? setPasswordError('La contraseña es un campo requerido.') : setPasswordError('')
 
        if(emailError || passwordError) {
            return false
        }

        return true;
    }

    const handleChange = event => {
        setFormData({
            name: event.target.name,
            value: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const isValid = validateForm()
        if(isValid) {
            axios.post(`${endpoint}/login`, formData)
                .then((response) =>  {
                    setUser(response.data.data)

                    history.push('/')

                    toast.success('¡Iniciaste sesión exitosamente!🤙');
                })
                .catch((error) => {
                    //TODO: ¿Qué pasa si el error es ocasionado por algo más?
                    setEmailError('Credenciales incorrectas.')
                    console.log(error);
                });
        }
    }

    return (
        <div className='register-wrapper relative overflow-hidden'>
            <Card data-aos='fade-left'>
                <Card.Body>
                    <Form className='mb4' onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Correo electrónico</Form.Label>
                            <Form.Control type="email" name='email' onChange={handleChange} placeholder="Ingresa tu correo electrónico"/>
                            { emailError ? <Form.Text className="red">{emailError}</Form.Text> : null }
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control type="password" name='password' onChange={handleChange} placeholder="Ingresa tu contraseña"/>
                            { passwordError ? <Form.Text className="red">{passwordError}</Form.Text> : null }
                        </Form.Group>
                        <Button variant="info" type="submit">
                            Iniciar sesión
                        </Button>
                    </Form>
                    <Link to='/register'>No tienes una cuenta con nosotros? Regístrate</Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginScreen