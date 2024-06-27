import React, { useEffect, useState } from "react";
import { getBlogs } from "../../../utils/api";
import "./blogs.css";
import Pagination from "../../../components/share/Pagination/Pagination";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/slices/userSlice";
export default function Blogs() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({ top: 0, behaviar: "smoothly" });
    dispatch(userActions.setOpenMenu(false));
  }, []);
  useEffect(() => {
    const timeOut = setTimeout(fetchBlogs, 10);
    return () => clearTimeout(timeOut);
  }, [searchParams]);

  async function fetchBlogs() {
    setIsLoading(true);
    const result = await getBlogs(searchParams.get("page") || 1, 4);
    if (result.success) {
      setError(false);
      setBlogs(result.body);
      setTotalBlogs(result.totalBlogs.filtered);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
    window.scrollTo({ top: 0, behaviar: "smoothly" });
  }
  const numOfPage = Math.ceil(totalBlogs / 4);
  return (
    <div className="blogs container mx-auto">
      <h1 className="text-center py-5">Blogs</h1>
      {isLoading ? (
        <div className="d-flex justify-content-center align-items-center">
          <h2 className="msg me-3 fs-2">Is Loading...</h2>
          <span className="spinner spinner-grow msg"></span>
        </div>
      ) : error ? (
        <div>
          <h2 className="fs-2 msg">{error}</h2>
          <button className="btn-error" onClick={fetchBlogs}>
            Try again
          </button>
        </div>
      ) : (
        <div>
          {blogs.length ? (
            <div className="row mb-5 ">
              {blogs.map((blog) => {
                return (
                  <Link
                    key={blog._id}
                    className="col-12 col-md-6 col-lg-3 col-blog link "
                    to={blog._id}
                  >
                    <div className="blog-item rounded-1">
                      <div className="blog-item-overlay"></div>
                      <div className="blog-item-container">
                        <div className="blog-item-img">
                          <img src={SERVER_URL + blog.image} alt={blog.slug} />
                        </div>
                        <div className="blog-item-table">
                          <h3 className="blog-item-title">{blog.title}</h3>
                          <div className="blog-item-info">
                            <span className="blog-item-info-product">
                              {blog.slug}
                            </span>
                            <span className="blog-item-info-dash"></span>
                            <span className="blog-item-info-dr">
                              {blog.details[1]}
                            </span>
                            <span className="blog-item-info-dash"></span>
                            <span className="blog-item-info-date">
                              {blog.updatedAt.split("T")[0]}
                            </span>
                          </div>
                          <p className="blog-item-desc">
                            {blog.description.substring(0, 120)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="text-center cardEmpty fs-2 ">There is no blog</p>
          )}
          <Pagination numOfPage={numOfPage} />
        </div>
      )}
    </div>
  );
}
