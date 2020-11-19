import React from "react";
import { Pagination } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function Paginate({
  page,
  pages,
  isAdmin = false,
  adminPage = "",
  keyword = "",
  paginateStr = "",
}) {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center p-3">
      {pages > 1 && (
        <Pagination className="mb-0">
          {[...Array(pages).keys()].map((x) => (
            <Pagination.Item
              key={x + 1}
              active={x + 1 === page}
              onClick={() =>
                history.push(
                  !isAdmin
                    ? keyword
                      ? `/search/${keyword}/page/${x + 1}`
                      : `${paginateStr}/page/${x + 1}`
                    : `/admin/${adminPage}/${x + 1}`
                )
              }
            >
              {x + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
}

export default Paginate;
