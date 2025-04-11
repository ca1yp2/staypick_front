import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import './index.css'

const Layout = () => {
  return (
    <>
        <Header />
        <Container>
            <Row>
                <Col>
                    <Outlet />
                </Col>
            </Row>
        </Container>
        <Footer />
    </>
  )
}

export default Layout