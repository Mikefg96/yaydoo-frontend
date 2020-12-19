import React, { useReducer, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const endpoint = process.env.REACT_APP_API_URL

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const RegisterScreen = () => {

    let history = useHistory()
    const [formData, setFormData] = useReducer(formReducer, {})
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [passwordVerificationError, setPasswordVerificationError] = useState('')

    const validateForm = () => {
        
        !formData.email ? setEmailError('El correo electrónico es un campo requerido.') : setEmailError('')
 
        if(!formData.password) {
            setPasswordError('La contraseña es un campo requerido.')
        } else if(!(formData.password === formData.passwordVerification)) {
            setPasswordError('Las contraseñas no coinciden.')
        } else {
            setPasswordError('')
        }

        !formData.passwordVerification ? setPasswordVerificationError('La verificación de la contraseña es un campo requerido.') : setPasswordVerificationError('')

        if(emailError || passwordError || passwordVerificationError) {
            return false
        }

        return true;
    }

    const handleChange = event => {
        const isCheckbox = event.target.type === 'checkbox'
        setFormData({
            name: event.target.name,
            value: isCheckbox ? event.target.checked : event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault()

        const isValid = validateForm()
        if(isValid) {
            axios.post(`${endpoint}/register`, formData)
            .then((response) =>  {
                
                history.push('/login')
                toast.success('¡Cuenta creada exitosamente!🤙');
                console.log(response);
            })
            .catch((error) => {
                setEmailError('Ya existe una cuenta asociada al correo electrónico.')
                console.log(error);
            });
        }
    }

    return (
        <div className='register-wrapper relative overflow-hidden'>
            <Card>
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
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Validación de contraseña</Form.Label>
                            <Form.Control type="password" name='passwordVerification' onChange={handleChange} placeholder="Vuelve a ingresar tu contaseña"/>
                            { passwordVerificationError ? <Form.Text className="red">{passwordVerificationError}</Form.Text> : null }
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" name='isSeller' onChange={handleChange} label="¿Soy vendedor?" />
                        </Form.Group>
                        <Button variant="success" type="submit">
                            Registrar
                        </Button>
                    </Form>
                    <Link to='/login'>¿Ya tienes una cuenta con nosotros? Inicia sesión</Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default RegisterScreen