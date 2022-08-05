import React from 'react';
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap';

import { MdAccountCircle, MdHome, MdSearch, MdShoppingCart } from 'react-icons/md';
import { useRouter } from 'next/router';

const BottomTabNavigator: React.FC = () => {
  const router = useRouter()

  return (
    <Navbar className='bottom-tab-height d-lg-none d-block border-top p-0' fixed="bottom" bg="light" variant="light">
      <div className='container-fluid px-0 justify-content-center'>
        <Nav className="row w-100">
          <div className="col-3 text-center">
            <Link passHref href={'/'} >
              <Nav.Link active={router.route === '/'} >
                <MdHome style={{ marginTop: -4 }} className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -2 }}>Home</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link passHref href={'/search'}>
              <Nav.Link active={router.route === '/search'} >
                <MdSearch style={{ marginTop: -4 }} className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -2 }}>Search</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link passHref href={'/cart'}>
              <Nav.Link active={router.route === '/cart'} >
                <MdShoppingCart style={{ marginTop: -4 }} className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -2 }}>Cart</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link passHref href={'/account'}>
              <Nav.Link active={router.route === '/account'} >
                <MdAccountCircle style={{ marginTop: -4 }} className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -2 }}>Account</div>
              </Nav.Link>
            </Link>
          </div>
        </Nav>
      </div>
    </Navbar>
  )
}

export default BottomTabNavigator;