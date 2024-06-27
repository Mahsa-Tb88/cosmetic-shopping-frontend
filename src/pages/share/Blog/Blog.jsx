import React, { useEffect, useState } from "react";
import "./blog.css";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../../utils/api";
import { Helmet } from "react-helmet";
export default function Blog() {
  const params = useParams();
  const [blog, setBlog] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(true);
  const blogId = params.id;
  useEffect(() => {
    const timeOut = setTimeout(fetchBlog, 20);
    window.scrollTo({ top: 0, behaviar: "smoothly" });
    return () => clearTimeout(timeOut);
  }, []);
  console.log(blog);
  async function fetchBlog() {
    const result = await getBlogById(blogId);
    if (result.success) {
      setError(false);
      setBlog(result.body);
    } else {
      setError({ message: result.message });
    }
    setIsLoading(false);
  }
  return (
    <div className="blog ">
      <Helmet>
        <title>{blog.title}</title>
      </Helmet>
      {isLoading ? (
        <div className="fs-2  text-center loadingBlog">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center ">
          <p className="fs-1">{error.message}</p>
          <button
            className="btn-tryAgainBlog fs-3 py-2 px-4"
            onClick={() => fetchBlog()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-center blog-title ">{blog.title}</h1>
          <div className="row  mt-5">
            <div className="col-12 col-lg-6 text-center order-lg-last">
              <div className=" blog-img">
                <img src={SERVER_URL + blog.image} />
              </div>
              <div className="my-5">
                <div className="fs-4">Author: {blog.details[1]}</div>
                <div className="fs-5 my-5">Subject: {blog.details[0]}</div>
                <div className="fs-5">Date: {blog.updatedAt.split("T")[0]}</div>
              </div>
            </div>
            <div className="col-12 col-lg-6 fs-2 desc">
              <p className="my-5 my-md-0">{blog.description}</p>
              <br />
            </div>
          </div>
          <div className="blog-item  mx-auto rounded-1 px-5 py-5">
            {blog.items.map((item, index) => {
              return (
                <div className="pb-5 " key={index}>
                  <h2 className="title-item">{item.titleItem}</h2>
                  <p className="fs-3 title-item-desc">{item.descItem}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
