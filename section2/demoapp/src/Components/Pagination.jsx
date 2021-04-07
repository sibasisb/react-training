import React from 'react';
import '../stylesheets/styles.css'

const Pagination = ({ productsPerPage, totalProducts, paginate,moveLeft,moveRight }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>    
      <ul className='pagination'>
        <li onClick={() => moveLeft()} className='page-item'>
        <span className="material-icons page-link">
          arrow_left
        </span>
        </li>
        {pageNumbers.map(number => (
          <li onClick={() => paginate(number)} key={number} className='page-item'>
            <span className='page-link'>
              {number}
            </span>
          </li>
        ))}
        <li onClick={() => moveRight()} className='page-item'>
        <span className="material-icons page-link">
          arrow_right
        </span>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;