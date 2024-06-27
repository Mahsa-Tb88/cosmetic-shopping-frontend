import React, { useEffect, useState } from "react";
import "./productEdit.css";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../utils/api";
import ProductForm from "../../../components/admin/ProductForm/ProductForm";

export default function ProductEdit() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const timeOut = setTimeout(fetchProduct, 20);
    return () => clearTimeout(timeOut);
  }, [params]);

  async function fetchProduct() {
    setIsLoading(true);
    const result = await getProductById(params.id);
    if (result.success) {
      setProduct(result.body);
      setIsLoading(false);
    } else {
      setError(true);
    }
    setIsLoading(false);
  }

  return (
    <div className="editProduct">
      {isLoading ? (
        <div className="fs-2 text-center loadingProductAdmin">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center loadingProductAdmin w-75 mx-auto">
          <p className="fs-1">Error Connection</p>
          <button className="btn-tryAgain fs-3" onClick={() => fetchProduct()}>
            Try Again
          </button>
        </div>
      ) : (
        <div className=" px-2 px-md-4 py-5">
          <Helmet>
            <title>Edit Product</title>
          </Helmet>
          <h1 className="ms-md-3  title-editProduct">Edit Product</h1>
          <ProductForm type="edit" product={product} />
        </div>
      )}
    </div>
  );
}
