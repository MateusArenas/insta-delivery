import React from 'react';

import { Button, Form, Dropdown, FormControlProps } from 'react-bootstrap';

import { MdHistory } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';

const SearchInput: React.FC = () => {
  return (
    <Form onSubmit={() => console.log('search')} className="d-flex align-items-center flex-grow-1 ms-3 me-5">
      <Dropdown className='w-100' >

          <Button type='submit' variant="link" className="position-absolute border-0 text-dark">
            <RiSearchLine style={{ marginTop: -4 }} />
          </Button>

          <Dropdown.Toggle 
            as={CustomToggleAndInputSearch} 
            id="dropdown-custom-components" 
          />
        
          <Dropdown.Menu className='w-100' >
            <Dropdown.Header>Buscas recentes</Dropdown.Header>
            <Button type='submit' variant="link" className="dropdown-item py-2 text-decoration-none border-0 text-dark">
              <MdHistory />
              <span className='mx-3 me-5'>d</span>
            </Button>
            <Button type='submit' variant="link" className="dropdown-item py-2 text-decoration-none border-0 text-dark">
              <MdHistory />
              <span className='mx-3 me-5'>hamburger</span>
            </Button>
          </Dropdown.Menu>
      </Dropdown>
    </Form>
  )
}

export default SearchInput;

// eslint-disable-next-line react/display-name
const CustomToggleAndInputSearch = React.forwardRef(({ onClick, ...props }: any, ref) => ( 
  <Form.Control {...props}
    type='search'
    placeholder="Busque por item ou loja"
    className="me-2 ps-5"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    onFocus={(e) => {
      e.preventDefault();
      setTimeout(() => {
        onClick(e);
      }, 300);
    }}
  />
));