import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'

import React from 'react'

import { Button, CloseButton } from 'react-bootstrap'
import { MdArrowBackIos, MdArrowBackIosNew, MdArrowLeft, MdChevronLeft, MdLocalActivity, MdMyLocation } from 'react-icons/md' 
import { useRouter } from 'next/router'
import SearchInput from '../components/SearchInput'
import { useDebounce } from '../hooks/useDebounce'

const SignIn: NextPage<any> = ({ presentation }) => {

  const router = useRouter()

  return (
    <div className="container pt-4 bottom-tab-content-offset">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!presentation && (
        <Button variant='light' className='position-absolute d-lg-none start-0 top-0 m-3 rounded-circle px-2 border-2 text-dark border' 
          onClick={() => router.back()} style={{ zIndex: 1 }}
        >
          <MdArrowBackIosNew style={{ marginLeft: -2 }} size={24} />
        </Button>
      )}

      <div className="row justify-content-center mt-0 mt-lg-3">

        <div className="col-11 col-md-7 col-lg-5">
          <div className="card">
            <div className="card-header text-center p-3">
              <h1 className='fs-4 mb-0'>Sign in to insta-delivery</h1>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">Username or email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  {/* <div id="emailHelp" className="form-text">Well never share your email with anyone else.</div> */}
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                  <Link passHref shallow href="#" >
                    <a className='text-decoration-none float-end'>Forgot password?</a>
                  </Link>
                  <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <Button variant='primary' type="submit" className="w-100">Sign In</Button>
              </form>
            </div>

            <div className="card-footer text-center p-3">
              <p className='mb-0'>New to insta-delivery? <Link passHref shallow href="/signup"><a className='text-decoration-none'>Create account</a></Link> .</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}

export default SignIn