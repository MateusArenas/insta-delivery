import { Button, Container, Form, Nav, Navbar, NavDropdown, Dropdown, FormControlProps } from 'react-bootstrap';
import { IoBagOutline, IoEnterOutline } from 'react-icons/io5';
import { MdExpandMore, MdPersonOutline, MdHelpOutline, MdChevronRight, MdOutlineAccountCircle, MdHistory } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';

import { useRouter } from 'next/router';

import Link from 'next/link'
import React from 'react'
import SearchInput from './SearchInput';


function HeaderDesktopOnly(props: any) {

  const router = useRouter()


  return (
    <Navbar sticky='top' bg='white' className='border-bottom d-none d-lg-block align-items-center header-height' collapseOnSelect expand="md">
      <Container className='h-100'>
        
        <Link href='/'>
          <Navbar.Brand href='/'>
            insta-delivery
          </Navbar.Brand>
        </Link> 

          <Nav className="">

            <Link shallow href={router.query?.['andress'] ? router.pathname : `/?andress=${'andress'}`}
              as={router.query?.['andress'] ? router.pathname : `/andress`}
            >
              <Nav.Link 
                disabled={router.pathname === '/andress'} 
                href={router.query?.['andress'] ? router.pathname : `/andress`}  
                active={router.pathname === '/andress'}
                // onClick={props?.onOpenModal}
              >
                <span>Próximo de Jardim Maria Eneida</span>
                <MdExpandMore />
              </Nav.Link>
            </Link>
  

{/* 
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown> */}
            
            
          </Nav>

          <SearchInput />

          <Nav>
            {/* <Nav.Link href="#deets" className='not-arrow mx-2'> */}

            {/* <IoEnterOutline size={24} /> */}
              <NavDropdown className='not-arrow mx-2' title={<MdOutlineAccountCircle size={24} />}  id="collasible-nav-dropdown">
                <div className="p-4">
                  <NavDropdown.Header>
                    <h5>Olá Mateus</h5>
                  </NavDropdown.Header>
                  <NavDropdown.Divider />
                  <NavDropdown.Item className='d-flex flex-row align-items-center' href="#action/3.1">
                    <MdHelpOutline />
                    <span className='mx-3 me-5'>Ajuda</span>
                    <MdChevronRight />
                  </NavDropdown.Item>
                  <NavDropdown.Item className='d-flex flex-row align-items-center' href="#action/3.2">
                    <MdPersonOutline />
                    <span className='mx-3 me-5'>Entrar</span>
                    <MdChevronRight />
                  </NavDropdown.Item>
                </div>
              </NavDropdown>

            {/* </Nav.Link> */}


            <Link shallow
              href={router.query?.['cart'] ? router.pathname : `/?cart=${'cart'}`}
              as={router.query?.['cart'] ? router.pathname : `/cart`}
              // eventKey={2} 
            >
              <Nav.Link 
                disabled={router.pathname === '/cart'} 
                href={router.query?.['cart'] ? router.pathname : `/cart`}  
                active={router.pathname === '/cart'}
                className={`d-flex align-items-center mx-2`}
              >
                <IoBagOutline size={24} />
                <div className={`d-flex flex-column ms-1`}>
                  <small style={{ fontSize: 12, fontWeight: 'bold' }}>R$ 0,00</small>
                  <small style={{ fontSize: 10, fontWeight: '500', marginTop: -4 }}>0 items</small>
                </div>
              </Nav.Link>
            </Link>

          </Nav>


      </Container>
    </Navbar>
  );
}

export default HeaderDesktopOnly;