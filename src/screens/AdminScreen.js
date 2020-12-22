import React, { useEffect, useState } from 'react'
import { Button, Card, Form, ListGroup } from 'react-bootstrap'
import axios from 'axios'

const endpoint = process.env.REACT_APP_API_URL

const AdminScreen = () => {
    const [products, setProducts] = useState([])
    const [sellers, setSellers] = useState([])
    const [keyword, setKeyword] = useState('')

    const resetHandler = (e) => {
        e.preventDefault()

        fetchUserProducts().then((userProducts) => {
            setProducts(userProducts)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        axios
            .get(`${endpoint}/seller/product?sellerEmail=${keyword}`)
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

    const fetchSellers = () => {
        return axios
            .get(`${endpoint}/sellers`)
            .then(({ data }) => {
                return data.data
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        fetchUserProducts().then((userProducts) => {
            setKeyword('')
            setProducts(userProducts)
        })

        fetchSellers().then((sellers) => {
            setSellers(sellers)
        })
    }, [])

    return (
        <div id='landing-screen'>
            <div className='w-100 flex justify-between items-center'>
                <Form onSubmit={resetHandler}>
                    <Button type='submit' variant='warning' className='p-2 mb3'>Limpiar Filtro</Button>
                </Form>
                <div>
                    <Form className='fr mb3' onSubmit={submitHandler} inline>
                        <Form.Control as="select" className='mr2' onChange={(e) => setKeyword(e.target.value)}>
                            {
                                sellers.map((seller, idx) => (
                                    <option key={idx}>{seller}</option>
                                ))
                            }
                        </Form.Control>
                        <Button type='submit' variant='outline-success' className='p-2'>Buscar</Button>
                    </Form>
                </div>
            </div>
            <div className="products-wrapper pt3">
                {
                    products.map((product, idx) => (
                        <Card key={idx} className='mr3 mb3' style={{ width: '18rem' }} data-aos='fade-up'>
                            <Card.Body className='text-center'>
                                <Card.Title className='h0'>{product.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{product.sku}</Card.Subtitle>
                                <ListGroup className='tl mb-4' variant="flush">
                                    <ListGroup.Item>Stock: {product.qty}</ListGroup.Item>
                                    <ListGroup.Item>Precio: {product.price} MXN</ListGroup.Item>
                                    <ListGroup.Item>Contacto: {product.seller_id.email}</ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    )) 
                }
            </div>
        </div>
    )
}

export default AdminScreen
