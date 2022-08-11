import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { MdAccountCircle, MdHome, MdSearch, MdShoppingCart } from 'react-icons/md';

import useBreakpoint from '../hooks/useBreakpoint';

const BottomTabNavigator: React.FC = () => {
  const router = useRouter()

//   const breakpoint = useBreakpoint()

//   const [lastOpen, setLastOpen] = React.useState({ pathname: '/', asPath: '/', query: {} });

  
// function removeParameterFromUrl(url: string, parameter: string) {
//   return url
//     .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
//     .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
// }

//   React.useEffect(() => {
//     if (router.query?.open && breakpoint === 'md' || breakpoint === 'sm' || breakpoint === 'xs') {
//       if (router.pathname !== '/cart') {
//         (async () => {
//           if (router.query.open === 'cart') {
//             setLastOpen({ pathname: router.pathname, asPath: router.asPath, query: router.query })
//             await router.replace(`/${router.query?.open}`, undefined, { shallow: true })
//           } else if (router.query.open === 'andress') {
//             setLastOpen({ pathname: router.pathname, asPath: router.asPath, query: router.query })
//             await router.replace(`/${router.query?.open}`, undefined, { shallow: true })
//           }
//         })()
//       }
//     }
//   }, [router, breakpoint])

//   React.useEffect(() => {
//     if (!router.query?.open && breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === 'xxl') {
//       (async () => {
//           if (router.pathname === '/cart') {
//             await router.replace(
//               { pathname: lastOpen.pathname, query: { ...lastOpen.query, open: 'cart' } }, 
//               removeParameterFromUrl(lastOpen.asPath, 'open')+'?open=cart', { shallow: true }
//             )
//           } else if (router.pathname === '/andress') {
//             await router.replace(
//               { pathname: lastOpen.pathname, query: { ...lastOpen.query, open: 'andress' } }, 
//               removeParameterFromUrl(lastOpen.asPath, 'open')+'?open=andress', { shallow: true }
//             )
//           }
//         })()
//     }
//   }, [router, breakpoint, lastOpen])

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