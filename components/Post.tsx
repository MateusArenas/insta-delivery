import React from 'react';
import { MdMoreHoriz } from 'react-icons/md';

const Post: React.FC = () => {
  return (
    <div className="card">
      <div className="card-header border-sm-0">
        <div className="row">

          <div className="col-4">
            <div className="d-flex h-100 flex-row align-items-center">
              <div  className="bg-dark rounded-circle" style={{ height: 32, width: 32 }} />
              <h6 className="card-title ms-2 mb-0">Card title</h6>
            </div>
          </div>

          <div className="col-8">
            <div className="d-flex h-100 flex-row align-items-center justify-content-end">
              <a href="#" className="btn btn-primary me-2">Favorite</a>
              <button type="button" className="btn btn-transparent border-0 rounded-circle">
                <MdMoreHoriz size={24} />
              </button>
            </div>
          </div>

        </div>
      </div>

      <div className="position-relative ">
        <div  className="card-img-center  bg-dark w-100" style={{ height: 300 }} />

        <button className="btn btn-transparent position-absolute top-50 start-50 translate-middle p-2 bg-white border border-light rounded-circle">
          <span className="visually-hidden">New alerts</span>
        </button>
        
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