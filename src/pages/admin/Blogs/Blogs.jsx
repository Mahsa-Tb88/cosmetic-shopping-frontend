import React from "react";
import "./blogs.css";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getBlogs, removeBlogById } from "../../../utils/api";
import { toast } from "react-toastify";

import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import Pagination from "../../../components/share/Pagination/Pagination";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";

export default function BlogAdmin() {
  const [isLoading, setIsLoading] = useState(true);
  const [errorLoading, setErrorLoading] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const theme = useSelector((state) => state.user.theme);
  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    setPage(+page);
  }, [searchParams]);

  useEffect(() => {
    const timeOut = setTimeout(() => fetchBlogs(), 20);
    return () => clearTimeout(timeOut);
  }, [page]);

  async function fetchBlogs() {
    setIsLoading(true);
    const result = await getBlogs(page);
    if (result.success) {
      setBlogs(result.body);
      setErrorLoading(false);
      setTotalBlogs(result.totalBlogs.all);
    } else {
      setErrorLoading(result.message);
    }
    setIsLoading(false);
  }
  async function removeBlogHandler(id) {
    if (!confirm("Are you sure for deleting the Blog?")) {
      return;
    }
    const t = toast.loading("Deleating...", {
      theme,
      style: { fontSize: 15 },
    });
    const result = await removeBlogById(id);
    if (result.success) {
      const result = await getBlogs();
      if (result.success) {
        setBlogs(result.body);
        toast.update(t, {
          render: <p className="fs-4">The Blog deleted successfully!</p>,
          isLoading: false,
          type: "success",
          autoClose: 2000,
        });
      }
    } else {
      toast.update(t, {
        render: <p className="fs-4">{result.message}</p>,
        isLoading: false,
        type: "error",
        autoClose: 2000,
      });
    }
  }

  const numOfPage = Math.ceil(totalBlogs / 5);
  return (
    <div className="blogAdmin px-2 px-md-4 py-5">
      <Helmet>
        <title>Managing Blog</title>
      </Helmet>
      <h1>Managing Blogs</h1>
      <Link
        className="addNewBlog link d-flex justify-content-center align-items-center"
        to="new"
      >
        <div className="addBlogBtn ">
          <span>Add Blog</span>
          <FaPlus className="iconPlusUser" />
        </div>
      </Link>
      {isLoading ? (
        <div className="fs-2  text-center loadingBlogAdmin">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : errorLoading ? (
        <div className="text-center loadingBlogAdmin ">
          <p className="fs-1">{errorLoading}</p>
          <button className="btn-tryAgain fs-3" onClick={() => fetchBlogs()}>
            Try Again
          </button>
        </div>
      ) : !blogs.length ? (
        <h2 className="text-center mt-5">There is no blog</h2>
      ) : (
        <div>
          <div className="">
            <table className="table table-bordered table-striped text-center my-5">
              <thead className="table-dark">
                <tr className="table-row">
                  <th scope="col">Title</th>
                  <th scope="col">Slug</th>
                  <th scope="col">Operation</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((b) => {
                  return (
                    <tr key={b._id} className="table-row">
                      <td>{b.title}</td>
                      <td>{b.slug}</td>
                      <td>
                        <div className=" d-flex justify-content-center align-items-center">
                          <span
                            className="operation-trash d-flex justify-content-center align-items-center me-2   me-md-5"
                            onClick={() => removeBlogHandler(b._id)}
                          >
                            <FaRegTrashAlt />
                          </span>
                          <Link
                            className="operation-edit  d-flex justify-content-center align-items-center"
                            to={b._id}
                          >
                            <FaRegEdit />
                          </Link>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div>{numOfPage > 1 && <Pagination numOfPage={numOfPage} />}</div>
          </div>
        </div>
      )}
    </div>
  );
}
