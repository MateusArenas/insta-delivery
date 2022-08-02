import React from 'react';
import Link from 'next/link'
import { Navbar, Nav } from 'react-bootstrap';

import { MdAccountCircle, MdHome, MdSearch, MdShoppingCart } from 'react-icons/md';

const BottomTabNavigator: React.FC = () => {
  return (
    <Navbar className='bottom-tab-height d-lg-none d-block border-top p-0' fixed="bottom" bg="light" variant="light">
      <div className='container-fluid px-0 justify-content-center'>
        <Nav className="row w-100">
          <div className="col-3 text-center">
            <Link href={'/'}>
              <Nav.Link href="/">
                <MdHome className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -4 }}>Home</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link href={'/search'}>
              <Nav.Link href="/search">
                <MdSearch className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -4 }}>Search</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link href={'/cart'}>
              <Nav.Link href="/cart">
                <MdShoppingCart className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -4 }}>Cart</div>
              </Nav.Link>
            </Link>
          </div>
          <div className="col-3 text-center">
            <Link href={'/account'}>
              <Nav.Link href="/account">
                <MdAccountCircle className='w-100' size={24} />
                <div style={{ fontSize: 10, marginTop: -4 }}>Account</div>
              </Nav.Link>
            </Link>
          </div>
        </Nav>
      </div>
    </Navbar>
  )
}

export default BottomTabNavigator;