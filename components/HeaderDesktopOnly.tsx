import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'
import { Button, Container, Dropdown, Form, FormControlProps, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { IoBagOutline, IoEnterOutline } from 'react-icons/io5';
import { MdChevronRight, MdExpandMore, MdHelpOutline, MdHistory, MdOutlineAccountCircle, MdPersonOutline } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';

import Router from 'next/router'

import SearchInput from './SearchInput';
import { useDebounceState, useDebounce } from '../hooks/useDebounce';

function HeaderDesktopOnly(props: any) {

  const router = useRouter()

  console.log({ router });

  const [search, setSearch] = React.useState('')

  const debounce = useDebounce(search, 1000)

  return (
    <Navbar style={{ zIndex: 1 }} sticky='top' bg='white' className='border-bottom d-none d-lg-block align-items-center header-height' collapseOnSelect expand="md">
      <Container className='h-100'>
        
        <Link passHref href='/' replace >
          <Navbar.Brand onClick={() => setSearch('')} >
            insta-delivery
          </Navbar.Brand>
        </Link> 

          <Nav className="">

            <Link passHref 
              // href={{
              //   pathname: router.pathname,
              //   // query: { ...router.query, open: router.query?.['open'] === 'andress' ? undefined : 'andress' },
              //   query: router.query?.['open'] === 'andress' ? removeQuery(router.query, 'open') : { ...router.query, open: 'andress' } ,
              // }}
              // as={`${removeParameterFromUrl(router.asPath, 'open')}?open=andress`}
              href={{
                pathname: router.pathname,
                query: router.query?.['open'] === 'andress' ? removeQuery(router.query, 'open') : { ...router.query, open: 'andress' },
              }}
              as={{ 
                pathname: router.query?.['open'] ? removeParameterFromUrl(router.asPath, 'open') : router.asPath,
                query: router.query?.['open'] === 'andress' ? {} : { open: 'andress' },
              }}
              replace
            >
              <Nav.Link 
                disabled={router.pathname === '/andress'} 
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

          <SearchInput value={search} onChangeText={setSearch}
            handleSubmit={() => router.push(`/search/${search}`, undefined, { shallow: true })}
            history={['oi', 'hamburger']}
            debounce={debounce}
            suggestions={['hamburger', 'habibgs']}
          />

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


            <Link shallow passHref
              href={{
                pathname: router.pathname,
                query: router.query?.['open'] === 'cart' ? removeQuery(router.query, 'open') : { ...router.query, open: 'cart' },
              }}
              as={{ 
                pathname: router.query?.['open'] ? removeParameterFromUrl(router.asPath, 'open') : router.asPath,
                query: router.query?.['open'] === 'cart' ? {} : { open: 'cart' },
              }}
              replace
              // eventKey={2} 
            >
              <Nav.Link 
                disabled={router.pathname === '/cart'} 
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

function removeQuery(query: any, parameter: string | string[]) {
  const clone = {...query};
  if (typeof parameter === 'string') {
    delete clone[parameter]
  } else if (Array.isArray(parameter)) {
    parameter.forEach(param => delete clone[param])
  }
  return clone
}

function removeParameterFromUrl(url: string, parameter: string) {
  return url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

export default HeaderDesktopOnly;