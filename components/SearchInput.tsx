import React from 'react';

import { Button, Form, Dropdown, FormControlProps } from 'react-bootstrap';

import { MdHistory, MdStore } from 'react-icons/md';
import { RiSearchLine } from 'react-icons/ri';

interface SearchInputProps {
  history?: string[]
  suggestions?: string[]
  queryName?: string
  value?: string
  debounce?: string
  onChangeText: (text: string) => any
  handleSubmit?: () => any
}

const SearchInput: React.FC<SearchInputProps> = ({ 
  history=[],
  suggestions=[],
  queryName='search',
  value, onChangeText, handleSubmit,
  debounce,
}) => {

  const inputRef = React.useRef(null)

  function onSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleSubmit?.();
  }

  return (
    <Form onSubmit={onSubmit} className="d-flex align-items-center flex-grow-1 ms-3 me-5">
      <Dropdown className='w-100' autoClose >

          <Button type='submit' onClick={() => value && onChangeText(value)} variant="link" className="position-absolute border-0 text-dark">
            <RiSearchLine style={{ marginTop: -4 }} />
          </Button>

          <Dropdown.Toggle ref={inputRef}
            as={CustomToggleAndInputSearch} 
            id="dropdown-custom-components" 
            value={value} onChange={e => onChangeText(e?.target?.value || '')}
          />

          {/* <input type="hidden" id="search-velue" name={queryName} value={value} /> */}
        
          <Dropdown.Menu className='w-100' >
            {!value && <Dropdown.Header>{'Buscas recentes'}</Dropdown.Header>}
            {!!debounce && !!value && <Dropdown.Header>{'Você procura por'}</Dropdown.Header>}
            {(!!debounce && !!value) && suggestions?.map(textEnter => 
                <Dropdown.Item as='button' key={textEnter} onClick={() => onChangeText(textEnter)} type='submit' variant="link" className="dropdown-item py-2 px-3 text-decoration-none border-0 text-dark">
                  <div className="d-flex flex=row align-items-center justify-content-between">
                    <span className='me-5'>{textEnter}</span>
                    <MdStore />
                  </div>
                </Dropdown.Item>
            )}
            {(!debounce) && history?.map(textEnter => 
                <Dropdown.Item as='button' key={textEnter} onClick={() => onChangeText(textEnter)} type='submit' variant="link" className="dropdown-item py-2 px-3 text-decoration-none border-0 text-dark">
                  <MdHistory className='me-2' />
                  <span className='me-5'>{textEnter}</span>
                </Dropdown.Item>
            )}
          </Dropdown.Menu>

      </Dropdown>
    </Form>
  )
}

export default SearchInput;

// eslint-disable-next-line react/display-name
const CustomToggleAndInputSearch = React.forwardRef(({ onClick, ...props }: any, ref) => ( 
  <Form.Control {...props}
    type='search' autocomplete="off"
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