import React from 'react';
import '../stylesheets/styles.css'

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>    
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li onClick={() => paginate(number)} key={number} className='page-item'>
            <span className='page-link'>
              {number}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;