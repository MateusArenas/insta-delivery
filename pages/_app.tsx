import { NextPage } from 'next'
import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'

import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app'
import Link from 'next/link'
import HeaderDesktopOnly from '../components/HeaderDesktopOnly';
import { Offcanvas, Modal } from 'react-bootstrap';

import Cart from './cart'
import { useRouter } from 'next/router';
import Andress from './andress';

import BottomTabNavigator from '../components/BottomTabNavigator';
import Product from './product/[id]';
import Post from './post/[id]';
import { BagProvider } from '../contexts/bag';
import useSwicthPageShowCase from '../hooks/useSwitchPageShowCases';
import useBreakpoint from '../hooks/useBreakpoint';


type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const router = useRouter()

  const getLayout = Component.getLayout ?? ((page) => page) // Use the layout defined at the page level, if available

  const breakpoint = useBreakpoint()

  useSwicthPageShowCase({
    isPresentation: ['lg', 'xl', 'xxl'].includes(breakpoint),
    isPage: ['md', 'sm', 'xs'].includes(breakpoint),
    paths: ['/cart', '/andress'],
    options: { queryKey: 'open' }
  })

  return (
    <BagProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderDesktopOnly />

      <BottomTabNavigator />

      {getLayout(<Component {...pageProps} />)}

      {/* modal for andress */}
      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered 
        className='open-master' backdropClassName='open-master-bg'
        show={(router.query?.open === 'andress') as unknown as boolean} 
          onHide={() => router.replace({ 
            pathname: router.pathname, 
            query: removeQuery(router.query, 'open')
          }, {
            pathname: removeParameterFromUrl(router.asPath, 'open'),
            query: {}
          }, { shallow: true }
        )}
      >
        <Modal.Header className='border-0' closeButton />
        <Modal.Body>
          <Andress />
        </Modal.Body>
      </Modal>

      {/* offcanvas for product */}
      <Offcanvas tabinde placement={'bottom'} className="offcanvas-height-adapter open-bellow" backdropClassName='open-bellow-bg'
        show={router.query.productId as unknown as boolean} 
        onHide={() => router.back()}
      >
        {/* <Offcanvas.Header className='border-0 mb-4 position-absolute end-0' closeButton /> */}
        <Offcanvas.Body className='p-0'>
          <Product />
        </Offcanvas.Body>
      </Offcanvas>

      {/* offcanvas for post */}
      <Offcanvas tabindex placement={'bottom'} 
        show={router.query.postId as unknown as boolean} 
        onHide={() => router.push(removeParameterFromUrl(router.asPath, 'open'), undefined, { shallow: true })}
      >
        <div className='d-flex flex-row'>
          <Offcanvas.Header className='border-0 mb-4 position-absolute end-0' closeButton />

          <div className="d-flex flex-column mx-4">
            <Post />
          </div>
        </div>
      </Offcanvas>

      {/* offcanvas for cart */}
      <Offcanvas tabindex placement={'end'} 
        className='header-offset open-master' 
        backdropClassName='header-offset open-master-bg' 
        show={(router.query?.open === 'cart') as unknown as boolean} 
        onHide={() => router.replace({ 
            pathname: router.pathname, 
            query: removeQuery(router.query, 'open')
          }, {
            pathname: removeParameterFromUrl(router.asPath, 'open'),
            query: {}
          }, { shallow: true }
        )}
      >
        <div className='d-flex flex-row'>
          <Offcanvas.Header className='border-0 mb-4 position-absolute'  closeButton />

          <div className="d-flex flex-column mx-4">
            <Cart />
          </div>
        </div>
      </Offcanvas>

    </BagProvider>
  )
}


function removeQuery(query: any, parameter: string) {
  const clone = {...query};
  delete clone[parameter]
  return clone
}

function removeParameterFromUrl(url: string, parameter: string) {
  return url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

export default MyApp
