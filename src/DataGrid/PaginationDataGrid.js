import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

const PaginationDataGrid = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Pagination>
      <PaginationItem>
        <PaginationLink first onClick={() => paginate(1)} />
      </PaginationItem>
        {pageNumbers.map(pageNumber => (
          <PaginationItem key={pageNumber}>
            <PaginationLink onClick={() => paginate(pageNumber)}>
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
      <PaginationItem>
        <PaginationLink last onClick={() => paginate(pageNumbers.length)} />
      </PaginationItem>
    </Pagination>
  );
};

export default PaginationDataGrid;