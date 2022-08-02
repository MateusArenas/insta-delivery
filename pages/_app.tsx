import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import HeaderDesktopOnly from '../components/HeaderDesktopOnly';
import { Offcanvas, Modal } from 'react-bootstrap';

import Cart from './cart'
import { useRouter } from 'next/router';
import Andress from './andress';

import BottomTabNavigator from '../components/BottomTabNavigator';


type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

function MyApp({ Component, pageProps }: AppPropsWithLayout) {

  const router = useRouter()


  const getLayout = Component.getLayout ?? ((page) => page) // Use the layout defined at the page level, if available


  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <HeaderDesktopOnly />

      <BottomTabNavigator />

      {getLayout(<Component {...pageProps} />)}

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered 
        show={router.query.andress as unknown as boolean}
        onHide={() => router.push(router.pathname)}
      >
        <Modal.Header className='border-0' closeButton />
        <Modal.Body>
          <Andress />
        </Modal.Body>
      </Modal>

      <Offcanvas tabindex placement={'end'} className='header-offset' backdropClassName='header-offset' 
        show={router.query.cart as unknown as boolean} 
        onHide={() => router.push(router.pathname)}
      >
        <div className='d-flex flex-row'>
          <Offcanvas.Header className='border-0 mb-4 position-absolute'  closeButton />

          <div className="d-flex flex-column mx-4">
            <Cart />
          </div>
        </div>
      </Offcanvas>
    </>
  )
}

export default MyApp
