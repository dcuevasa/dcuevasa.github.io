import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from "./LanguageSelector";

const NavBar = () => {
    const { t } = useTranslation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">David Cuevas</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">{t('home')}</Nav.Link>
                        <Nav.Link as={Link} to="/about">{t('about')}</Nav.Link>
                        <Nav.Link as={Link} to="/projects">{t('projects')}</Nav.Link>
                    </Nav>
                    <LanguageSelector />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;