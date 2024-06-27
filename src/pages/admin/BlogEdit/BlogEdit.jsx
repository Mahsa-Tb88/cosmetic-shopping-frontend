import React, { useEffect, useState } from "react";
import "./blogEdit.css";
import { useParams } from "react-router-dom";
import { getBlogById } from "../../../utils/api";
import { Helmet } from "react-helmet";
import BlogForm from "../../../components/admin/BlogForm/BlogForm";

export default function BlogEdit() {
  const [blog, setBlog] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const timeOut = setTimeout(fetchBlog, 20);
    return () => clearTimeout(timeOut);
  }, [params]);

  async function fetchBlog() {
    setIsLoading(true);
    const result = await getBlogById(params.id);
    if (result.success) {
      setBlog(result.body);
      setIsLoading(false);
    } else {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <div className="blogEdit">
      {isLoading ? (
        <div className="fs-2 w-75 text-center blogLoading">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center blogLoading w-75 ">
          <p className="fs-1">{error}</p>
          <button className="btn-tryAgain fs-3" onClick={() => fetchUser()}>
            Try Again
          </button>
        </div>
      ) : (
        <div className="blogEdit px-2 px-md-4 py-5">
          <Helmet>
            <title>Edit Blog</title>
          </Helmet>
          <h1 className="ms-3  ">Edit Blog</h1>
          <BlogForm type="edit" blog={blog} />
        </div>
      )}
    </div>
  );
}
