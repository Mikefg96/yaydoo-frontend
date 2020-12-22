import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { toast } from 'react-toastify';

import { UserContext } from '../UserContext'

const endpoint = process.env.REACT_APP_API_URL

const LandingScreen = () => {
    const { user } = useContext(UserContext)
    const [products, setProducts] = useState([])
    const [keyword, setKeyword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        axios
            .get(`${endpoint}/products?keyword=${keyword}`)
            .then(({ data }) => {
                setProducts(data.data)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const fetchUserProducts = () => {
        return axios
            .get(`${endpoint}/products`)
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

    return (
        <div id='landing-screen'>
            <Form className='fr mb3' onSubmit={submitHandler} inline>
                <Form.Control type='text' name='q' className='mr-sm-2 ml-sm-5'
                    onChange={(e) => setKeyword(e.target.value)} placeholder='Nombre / SKU'></Form.Control>
                <Button type='submit' variant='outline-success'>Buscar</Button>
            </Form>
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
                                    <ListGroup.Item>Contacto: {product.seller_id.email}</ListGroup.Item>
                                </ListGroup>
                                {
                                    user ? <Button variant="info" onClick={() => toast.info('¡Producto añadido al 🛒!')}>Añadir al carrito</Button> : <Button variant='secondary' disabled>Añadir al carrito</Button>
                                }
                            </Card.Body>
                        </Card>
                    )) 
                }
            </div>
        </div>
    )
}

export default LandingScreen
