import React from "react";
import "./pagination.css";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
export default function Pagination({ numOfPage }) {
  const [searchParams, setSearchParams] = useSearchParams();
  let pages = [];
  for (let i = 1; i <= numOfPage; i++) {
    pages.push(i);
  }
  const currentPage = searchParams.get("page") || 1;
  function pageHandler(p) {
    const params = getNewSearchParams(searchParams, "page", p);
    setSearchParams(params);
  }
  if (!numOfPage) {
    return;
  }
  return (
    <div className=" d-flex justify-content-center align-items-center">
      <ul className="pagination">
        <li className="page-item" onClick={() => pageHandler(1)}>
          <a
            className={`${1 == currentPage ? "disabled" : ""}` + " page-link "}
          >
            <MdKeyboardDoubleArrowLeft />
          </a>
        </li>
        {pages.map((p) => {
          return (
            <li
              className={`${p == currentPage ? "active" : ""}` + " page-item "}
              onClick={() => pageHandler(p)}
              key={p}
            >
              <a
                className={
                  `${p == currentPage ? "active" : ""}` + " page-link "
                }
              >
                {p}
              </a>
            </li>
          );
        })}
        <li className="page-item" onClick={() => pageHandler(numOfPage)}>
          <a
            className={
              `${numOfPage == currentPage ? "disabled" : ""}` + " page-link "
            }
          >
            <MdKeyboardDoubleArrowRight />
          </a>
        </li>
      </ul>
    </div>
  );
}
