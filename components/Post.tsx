import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';
import { Dropdown } from 'react-bootstrap'

const Post: React.FC = () => {
  const router = useRouter()
  return (
    <div className="card mb-md-4">
      <div className="card-header border-sm-0">
        <div className="row">

          <div className="col">
            <div className="d-flex h-100 flex-row align-items-center">
              <div  className="bg-dark rounded-circle" style={{ height: 32, width: 32 }} />
              <h6 className="card-title ms-2 mb-0">Card title</h6>
            </div>
          </div>

          <div className="col">
            <div className="d-flex h-100 flex-row align-items-center justify-content-end">
              <button  className="btn btn-primary me-2">Favorite</button>
              <Dropdown className='not-arrow'>
                <Dropdown.Toggle variant="dakr" id="dropdown-basic" className='btn btn-transparent border-0 rounded-circle'>
                  <MdMoreHoriz size={24} />
                </Dropdown.Toggle>

                <Dropdown.Menu >
                  <Dropdown.Item className=' text-danger' href="#/action-3"><strong>Denunciar</strong></Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item className=' text-danger' href="#/action-2"><strong>Desfavoritar</strong></Dropdown.Item>
                  <Dropdown.Divider />
                  <Link passHref href={`/post/${'abc1234'}`}>
                    <Dropdown.Item>Ir para publicação</Dropdown.Item>
                  </Link>

                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-1">Copiar link</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              {/* <button type="button" className="btn btn-transparent border-0 rounded-circle">
                <MdMoreHoriz size={24} />
              </button> */}
            </div>
          </div>

        </div>
      </div>

      <div className="position-relative ">
        <div  className="card-img-center  bg-dark w-100" style={{ height: 300 }} />

        <Link passHref shallow
          href={router.query?.['productId'] ? router.pathname : `/?productId=${'abc1234'}`}
          as={router.query?.['productId'] ? router.pathname : `/product/${'abc1234'}`}
        >
          <a className="btn btn-transparent position-absolute top-50 start-50 translate-middle p-2 bg-white border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </a>
        </Link>
        
        {/* <div className="card-img-overlay text-white">
          <h5 className="card-title">Card title</h5>
          <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          <p className="card-text">Last updated 3 mins ago</p>
        </div> */}
      </div>

      <div className="card-body border-top border-sm-0">
        <p className="card-text">Favorited by <strong>ambaracadia</strong> and <strong>51</strong> others</p>
        <p className="card-text"><strong>Habibis</strong> esse hamburger com batatas são uma escolha ideal.</p>
      </div>
      <div className="card-footer border-sm-0">
        <small className='opacity-50'>59 minutes ago</small>
      </div>
    </div>
  )
}

export default Post;