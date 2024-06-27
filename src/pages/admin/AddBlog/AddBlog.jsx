import React from "react";
import { Helmet } from "react-helmet";
import BlogForm from "../../../components/admin/BlogForm/BlogForm";

export default function AddBlog() {
  return (
    <div className="addProduct px-2 px-md-4 py-5">
      <Helmet>
        <title>New Blog</title>
      </Helmet>
      <h1>Create New Blog</h1>
      <BlogForm type="new" />
    </div>
  );
}
