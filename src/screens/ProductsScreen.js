import React, { useContext, useEffect, useReducer, useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify';

import { UserContext } from '../UserContext'

const endpoint = process.env.REACT_APP_API_URL

const formReducer = (state, event) => {
    return {
        ...state,
        [event.name]: event.value
    }
}

const ProductsScreen = () => {
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [isRegistering, setIsRegistering] = useState(false)

    //Form data state handlers
    const [formData, setFormData] = useReducer(formReducer, {})
    const [nameError, setNameError] = useState('')
    const [skuError, setSkuError] = useState('')
    const [qtyError, setQtyError] = useState('')
    const [priceError, setPriceError] = useState('')

    const validateForm = () => {
        
        !formData.name ? setNameError('El nombre es un campo requerido.') : setNameError('')
        !formData.sku ? setSkuError('El SKU es un campo requerido.') : setSkuError('')
        !formData.qty ? setQtyError('La cantidad en stock es un campo requerido.') : setNameError('')
        !formData.price ? setPriceError('El precio es un campo requerido.') : setNameError('')
 
        if(nameError || skuError || qtyError || priceError) {
            return false
        } else {
            return true;
        }
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
            axios.post(`${endpoint}/register/product`, {...formData, userId: user[0]._id})
            .then((response) =>  {
                setProducts(products => [...products, response.data.data])
                setIsRegistering(false)
                toast.success('¡Producto registrado exitosamente!🤙');
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }

    const fetchUserProducts = () => {
        return axios
            .get(`${endpoint}/products/${user[0]._id}`)
            .then(({ data }) => {
                return data.data
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUserProducts().then((userProducts) => {
            setProducts(userProducts)
        })
    }, [])

    if(!isRegistering) {
        return (
            <div className='product-screen'>
                <Button variant='primary' className='fr mb3' onClick={() => {
                    setIsRegistering(true)
                }}>Registrar Producto</Button>
                <div className="products-wrapper pt3">
                    { 
                        products.map((product, idx) => (
                            <Card key={idx} className='mr3 mb3' style={{ width: '18rem' }}  data-aos='fade-up'>
                            <Card.Body className='text-center'>
                                <Card.Title className='h0'>{product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{product.sku}</Card.Subtitle>
                                <ListGroup className='tl mb-4' variant="flush">
                                    <ListGroup.Item>Stock: {product.qty}</ListGroup.Item>
                                    <ListGroup.Item>Precio: {product.price} MXN</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                        )) 
                    }
                </div>
            </div>
        )
    } else {
        return(
            <div className='register-wrapper relative overflow-hidden'>
                <Card style={{ width: '18rem' }}  data-aos='fade-down'>
                    <Card.Body>
                        <Form className='mb4' onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name='name' onChange={handleChange} placeholder="Ingresa el nombre"/>
                                { nameError ? <Form.Text className="red">{nameError}</Form.Text> : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>SKU</Form.Label>
                                <Form.Control type="text" name='sku' onChange={handleChange} placeholder="Ingresa el SKU"/>
                                { skuError ? <Form.Text className="red">{skuError}</Form.Text> : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Stock</Form.Label>
                                <Form.Control type="number" name='qty' onChange={handleChange} placeholder="Ingresa la cantidad en stock"/>
                                { qtyError ? <Form.Text className="red">{qtyError}</Form.Text> : null }
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Precio</Form.Label>
                                <Form.Control type="number" name='price' onChange={handleChange} placeholder="Ingresa el precio"/>
                                <Form.Text className="text-muted">Los precios deben de estar en MXN.</Form.Text>
                                { priceError ? <Form.Text className="red">{priceError}</Form.Text> : null }
                            </Form.Group>
                            <Button variant="info" type="submit">
                                Registrar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default withRouter(ProductsScreen)