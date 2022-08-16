import { NextPage } from 'next'
import Head from 'next/head'
import React, { ReactElement, ReactNode } from 'react'

import '../styles/globals.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

import type { AppProps } from 'next/app'
import Link from 'next/link'
import HeaderDesktopOnly from '../components/HeaderDesktopOnly';
import { Offcanvas, Modal, CloseButton, ModalDialog, ModalDialogProps, Button } from 'react-bootstrap';

import Cart from './cart'
import { useRouter } from 'next/router';
import Andress from './andress';

import BottomTabNavigator from '../components/BottomTabNavigator';
import Product from './product/[id]';
import Post from './post/[id]';
import { BagProvider } from '../contexts/bag';
import useSwicthPageShowCase from '../hooks/useSwitchPageShowCases';
import useBreakpoint from '../hooks/useBreakpoint';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';


type NextPageWithLayout = NextPage & { getLayout?: (page: ReactElement) => ReactNode }
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout }

interface PresentationContextData {
  setMemoryPosts: (posts: any[]) => any 
}

export const PresentationContext = React.createContext<PresentationContextData>({} as PresentationContextData)

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const ModalRef = React.createRef<HTMLDivElement>()
  const [posts, setPosts] = React.useState<any[]>([])

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
    <PresentationContext.Provider value={{ setMemoryPosts: posts => setPosts(posts) }}>
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
        <Offcanvas tabindex placement={'bottom'} className="offcanvas-height-adapter open-bellow" backdropClassName='open-bellow-bg'
          show={router.query.productId as unknown as boolean} 
          onHide={() => router.back()}
        >
          <Offcanvas.Body className='p-0'>
            <Product presentation />
          </Offcanvas.Body>
        </Offcanvas>

        {/* offcanvas for post */}
        <Modal tabindex aria-labelledby="contained-modal-title-vcenter" centered style={{ zIndex: 1 }}
          className='open-bellow header-offset-divided-down-lg px-0' 
          backdropClassName='open-bellow-bg header-offset-divided-down-lg' 
          show={router.query.postId as unknown as boolean} 
          onHide={() => router.back()}
          onShow={() => ModalRef.current?.scrollTo?.({ top: 0, behavior: "smooth" })}
          dialogAs={CustomModalDialog}
          size="xl" 
          fullscreen={'lg-down'}
          nextId={posts[posts?.findIndex(post => post?._id === router.query.postId)+1]?._id}
          previousId={posts[posts?.findIndex(post => post?._id === router.query.postId)-1]?._id}
          scrollable
        >
          <Modal.Body ref={ModalRef} className='p-0 m-0'>
            <Post {...(posts?.find(post => post?._id === router.query.postId) || {})} component />
          </Modal.Body>
        </Modal>

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
    </PresentationContext.Provider>
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

interface CustomModalDialogProps extends ModalDialogProps {
  nextId: number | string
  previousId: number | string
}

const CustomModalDialog: React.FC<CustomModalDialogProps> = ({ children, nextId, previousId, ...props }) => {
  const router = useRouter()
  return (
    <>
      <CloseButton style={{ zIndex: 1 }} className='position-absolute header-offset-divided-down-lg end-0 m-3 rounded-circle bg-white p-2 d-none d-lg-block' 
          onClick={() => router.back()}
      />

      {!!nextId && <Link replace passHref shallow  
        href={{ pathname: router.pathname, query: { ...router.query, postId: nextId } }}
        as={`/post/${nextId}`}
      >
        <Button disabled={!nextId} as={'a'} style={{ zIndex: 1 }} className='position-absolute text-dark end-0 top-50 mx-3 rounded-circle bg-white py-2 px-2 d-none d-lg-block' >
          <MdChevronRight size={24} style={{ top: -2 }} />
        </Button>
      </Link>}

      {!!previousId && <Link replace passHref shallow
        href={{ pathname: router.pathname, query: { ...router.query, postId: previousId } }}
        as={`/post/${previousId}`}
      >
        <Button disabled={!previousId} as={'a'} style={{ zIndex: 1 }} className='position-absolute text-dark start-0 top-50 mx-3 rounded-circle bg-white py-2 px-2 d-none d-lg-block' >
          <MdChevronLeft size={24} style={{ top: -2 }} />
        </Button>
      </Link>}
      <ModalDialog {...props} >
        {children}
      </ModalDialog>
    </>
  )
}

