import React from "react";
import "./sidebarProducts.scss";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SidebarProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state) => state.user.categories);
  const limit = useSelector((state) => state.shop.limit);
  const category = useSelector((state) => state.shop.category);
  const q = useSelector((state) => state.shop.q);
  const sort = useSelector((state) => state.shop.sort);
  const order = useSelector((state) => state.shop.order);

  function searchHandler(value) {
    const params = getNewSearchParams(searchParams, "q", value);
    setSearchParams(params);
  }

  function categoryHandler(value) {
    const params = getNewSearchParams(searchParams, "category", value);
    const secondparams = getNewSearchParams(params, "page", 1);
    setSearchParams(secondparams);
  }

  function sortHandler(value) {
    let newValue = { sort: "updatedAt", order: "desc" };
    if (value == "cheapest") {
      newValue.sort = "price";
      newValue.order = "asc";
    } else if (value == "expensive") {
      newValue.sort = "price";
    } else if (value == "oldest") {
      newValue.order = "asc";
    }
    const params = getNewSearchParams(searchParams, "sort", newValue.sort);
    const secondparams = getNewSearchParams(params, "order", newValue.order);
    const thirdParams = getNewSearchParams(secondparams, "page", 1);
    setSearchParams(thirdParams);
  }

  function getSortType() {
    if (sort === "updatedAt" && order === "desc") {
      return "newest";
    } else if (sort === "updatedAt" && order === "asc") {
      return "oldest";
    } else if (sort === "price" && order === "desc") {
      return "expensive";
    } else if (sort === "price" && order === "asc") {
      return "cheapest";
    }
  }

  function numHandler(value) {
    const params = getNewSearchParams(searchParams, "limit", value);
    const secondparams = getNewSearchParams(params, "page", 1);
    setSearchParams(secondparams);
  }

  return (
    <div className="sidebarProducts rounded-1 ps-5 row ">
      <div className="d-flex col-6 col-md-12 flex-column justify-content-center align-items-baseline mb-5">
        <label className="text-white mb-2 title fs-3">Search</label>
        <input
          className="input w-100 px-1 py-1 rounded-1"
          placeholder="search..."
          onChange={(e) => searchHandler(e.target.value)}
          value={q}
        />
      </div>
      <div className="d-flex col-6 col-md-12 flex-column justify-content-center align-items-baseline mb-5">
        <label className="text-white mb-2 fs-3">Categories</label>
        <select
          className="w-100 category px-1 py-2 rounded-1"
          onChange={(e) => categoryHandler(e.target.value)}
          value={category}
        >
          <option value="">All</option>
          {categories.map((c) => {
            return (
              <option key={c._id} value={c.slug}>
                {c.title}
              </option>
            );
          })}
        </select>
      </div>
      <div className="d-flex col-6 col-md-12 flex-column justify-content-center align-items-baseline mb-5">
        <label className="text-white mb-2 fs-3">Sort</label>
        <select
          className="w-100 category  px-1 py-2 rounded-1"
          onChange={(e) => sortHandler(e.target.value)}
          value={getSortType()}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="expensive">The most expensive</option>
          <option value="cheapest"> cheapest</option>
        </select>
      </div>
      <div className="d-flex col-6 col-md-12 flex-column justify-content-center align-items-baseline mb-5">
        <label className="text-white mb-2 fs-3">Number oF Products</label>
        <select
          className=" w-100 category px-1 py-2 rounded-1"
          onChange={(e) => numHandler(e.target.value)}
          value={limit}
        >
          <option value="6">6</option>
          <option value="9">9</option>
          <option value="12">12</option>
          <option value="24">24</option>
        </select>
      </div>
    </div>
  );
}
