import Link from 'next/link'
import { useRouter } from 'next/router';
import Router from 'next/router'
import React from 'react'
import { Button, Container, Dropdown, Form, FormControlProps, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { IoBagOutline, IoEnterOutline } from 'react-icons/io5';
import { MdChevronRight, MdExpandMore, MdFavoriteBorder, MdHelpOutline, MdHistory, MdHome, MdOutlineAccountCircle, MdOutlineHome, MdPersonOutline } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';

import { useDebounce, useDebounceState } from '../hooks/useDebounce';
import SearchInput from './SearchInput';
import Account from '../pages/account';

function HeaderDesktopOnly(props: any) {

  const router = useRouter()

  console.log({ router });

  const [search, setSearch] = React.useState('')

  const debounce = useDebounce(search, 1000)

  return (
    <Navbar style={{ zIndex: 3 }} sticky='top' bg='white' className='border-bottom d-none d-lg-block align-items-center header-height' collapseOnSelect expand="md">
      <Container className='h-100'>
          <Link passHref href='/' replace >
            <Navbar.Brand className='me-0' onClick={() => setSearch('')} >
              insta-delivery
            </Navbar.Brand>
          </Link> 
          <NavDropdown className='not-arrow mx-2' title={<MdExpandMore size={16} />}  id="collasible-nav-dropdown">
              <ol className="list-group list-group-flush px-2">
                {[
                    { Icon: MdOutlineHome, name: 'Home', href: '/' },
                    { Icon: MdFavoriteBorder, name: 'Favoritos', href: '/?variant=favorites' },
                  ].map(({ Icon, name, href }, key) => (
                    <li key={key} className="list-group-item p-0">
                      <Link passHref shallow href={href}>
                        <Dropdown.Item bsPrefix="none" as="a" className='btn btn-link d-flex my-1 justify-content-between align-items-center text-dark text-decoration-none px-3 py-2'
                          onClick={() => setSearch('')}
                        >
                          <Icon size={20} />
                          <div className="ms-3 me-auto">
                            <div className="fw-semibold">{name}</div>
                            {/* Content for list item */}
                          </div>
                          {/* <span className="badge bg-primary rounded-pill">14</span> */}
                          <span className='ms-4'><MdChevronRight /></span>
                        </Dropdown.Item>
                      </Link>
                    </li>
                  ))}
              </ol>
              {/* <div className="p-2">
                <NavDropdown.Item className='d-flex flex-row align-items-center' href="#action/3.1">
                  <MdOutlineHome />
                  <span className='mx-3 me-auto'>Inicio</span>
                  <span className='ms-4'><MdChevronRight /></span>
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item className='d-flex flex-row align-items-center' href="#action/3.2">
                  <MdFavoriteBorder />
                  <span className='mx-3 me-auto'>Favoritos</span>
                  <span className='ms-4'><MdChevronRight /></span>
                </NavDropdown.Item>
              </div> */}
            </NavDropdown>

          <Nav className="ms-2 col-3">

            <Link passHref shallow
              href={{ pathname: router.pathname, query: { ...router.query, open: 'andress' } }}
              as={`/andress`}
              scroll={false}
            >
              <Nav.Link className="position-relative pe-3"
                disabled={router.pathname === '/andress'} 
                active={router.pathname === '/andress'}
                // onClick={props?.onOpenModal}
              >
                <span className='text-ellipsis-1'>Próximo de Jardim Maria Eneida Rua Antonia de oliveira, n53</span>
                <span className="position-absolute top-50 end-0 translate-middle">
                  <MdExpandMore />
                </span>
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

          <SearchInput className={`ms-3 me-5`} value={search} onChangeText={setSearch}
            handleSubmit={() => router.push(`/search/${search}`, undefined, { shallow: true })}
            history={['oi', 'hamburger']}
            debounce={debounce}
            suggestions={['hamburger', 'habibgs']}
          />

          <Nav>
            {/* <Nav.Link href="#deets" className='not-arrow mx-2'> */}

            {/* <IoEnterOutline size={24} /> */}
              <NavDropdown className='not-arrow mx-2' title={<MdOutlineAccountCircle size={24} />}  id="collasible-nav-dropdown">
                {/* <div className="p-4">
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
                </div> */}
                <Account />
              </NavDropdown>

            {/* </Nav.Link> */}


            <Link shallow passHref // eventKey={2}
              href={{ pathname: router.pathname, query: { ...router.query, open: 'cart' } }}
              as={`/cart`}
              scroll={false}
            >
              <Nav.Link onClick={async e => {
                if (router.query?.store) { 
                  e.preventDefault()
                  await router.push(
                    { pathname: router.pathname, query: { ...router.query, open: 'cart' } },
                    `/cart`,
                    { shallow: true, scroll: false }
                  )
                  await router.push(
                    { pathname: router.pathname, query: { ...router.query, open: 'cart', storeName: router.query.store } },
                    `/cart/${router.query.store}`,
                    { shallow: true, scroll: false }
                  )
                }
              }}
                disabled={router.pathname.includes('/cart')} 
                active={router.pathname.includes('/cart')}
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