import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Container, Nav, Navbar } from 'react-bootstrap'

import { UserContext } from '../UserContext'
import { toast } from 'react-toastify'

const Header = () => {
    const { user, setUser } = useContext(UserContext);

    return (
        <header>
            <Navbar id='nav' bg='dark' expand="lg" collapseOnSelect>
                <Container>
                    <Link to='/' className='nav-link'>Inicio</Link>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">   
                            { !user 
                                ? 
                                (
                                    <>
                                        <Link to='/register' className='nav-link mr-4'>Registrar</Link>
                                        <Link to='/login' className='nav-link'>Iniciar sesión</Link>
                                    </>
                                )
                                : 
                                (
                                    <>
                                        <Link to='/products' className='nav-link mr-4'>Mis Productos</Link>
                                        <Link to='/admin' className='nav-link mr-4'>Panel de Administración</Link>
                                        <Link className='nav-link' onClick={() => {
                                            setUser(null)
                                            toast.warning('¡Sesión cerrada! ⚠️')
                                        }}>Cerrar sesión</Link>
                                    </>
                                ) 
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header