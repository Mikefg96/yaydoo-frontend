import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap'

const Header = () => {
    return (
        <header>
            <Navbar id='nav' bg='dark' expand="lg" collapseOnSelect>
                <Container>
{/*                     <Link to='/'>
                        <Image src='./logo-white.png' className='logo'></Image>
                    </Link> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Link to='/register' className='nav-link mr-4'>Registrar</Link>
                            <Link to='/login' className='nav-link'>Iniciar sesión</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header