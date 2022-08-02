import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { ReactElement, ReactNode } from 'react'
import Head from 'next/head'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import HeaderDesktopOnly from '../components/HeaderDesktopOnly';
import { Offcanvas, CloseButton, Container, Modal, Button } from 'react-bootstrap';

import Cart from './cart'
import { useRouter } from 'next/router';

type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const [show, setShow] = React.useState(false);
  const [modalShow, setModalShow] = React.useState(false);

  const router = useRouter()

  const handleClose = () => {
    setShow(false)
    router.push(router.pathname)
  };
  const handleToggle = () => setShow(!show);

  const getLayout = Component.getLayout ?? ((page) => page) // Use the layout defined at the page level, if available


  React.useEffect(() => {
    if (router.query?.cart) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [router.query])

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HeaderDesktopOnly onOpenOffcanvas={handleToggle} onOpenModal={() => setModalShow(!modalShow)} />

      {getLayout(<Component {...pageProps} />)}

      <Modal size="lg" aria-labelledby="contained-modal-title-vcenter" centered 
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header className='border-0 mb-4' closeButton />
        <Modal.Body>
          <h4 className="text-center" >Onde você quer receber seu pedido?</h4>

          <div className="text-center mb-5">
            <p>Já tem um endereço salvo?</p>
            <p>Entre na sua conta para selecionar seu endereço.</p>
          </div>

          <div className="d-flex justify-content-center mb-5">
            <Link href={'#'}>
              <a className='p-1 text-primary fw-semibold text-decoration-none'>Entrar ou cadastrar</a>
            </Link>
          </div>
        </Modal.Body>
      </Modal>

      <Offcanvas tabindex className='header-offset' backdropClassName='header-offset' show={show} onHide={handleClose} placement={'end'}>
        <div className='d-flex flex-row'>
          <CloseButton className='m-3 p-2' onClick={handleClose} />

          <div className="d-flex flex-column mt-5">
            <Cart />
          </div>
        </div>
      </Offcanvas>
    </>
  )
}

export default MyApp
