import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { getUsers, removeUserById } from "../../../utils/api";
import { useSelector } from "react-redux";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Pagination from "../../../components/share/Pagination/Pagination";
import "./users.css";
export default function Users() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(null);
  let numOfPage = Math.ceil(parseInt(totalUsers) / 5);
  const [searchParams, setSearchParams] = useSearchParams();

  const theme = useSelector((state) => state.user.theme);

  useEffect(() => {
    const page = searchParams.get("page") ?? 1;
    setPage(+page);
  }, [searchParams]);

  useEffect(() => {
    const timeOut = setTimeout(fetchUsers, 20);
    return () => clearTimeout(timeOut);
  }, [page]);

  async function fetchUsers() {
    setIsLoading(true);
    const result = await getUsers(page);
    if (result.success) {
      setError(false);
      setUsers(result.body.users);
      setTotalUsers(result.body.totalUsers.all);
    } else {
      setError(result.message);
    }
    setIsLoading(false);
  }

  async function removeUserHandler(id) {
    if (!confirm("Are you sure for deleting the User?")) {
      return;
    }
    const t = toast.loading("Deleating...", {
      theme,
      style: { fontSize: 15 },
    });

    const result = await removeUserById(id);
    if (result.success) {
      const result = await getUsers(1);
      setSearchParams({ page: 1 });
      if (result.success) {
        setUsers(result.body.users);

        toast.update(t, {
          render: <p className="fs-4">The User deleted successfully!</p>,
          isLoading: false,
          type: "success",
          autoClose: 2000,
        });
      } else {
        toast.update(t, {
          render: <p className="fs-4">{result.message}</p>,
          isLoading: false,
          type: "error",
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
  return (
    <div className="userAdmin px-2 px-md-4 py-5">
      <Helmet>
        <title>Managing Users</title>
      </Helmet>
      <h1>Managing Users</h1>
      <Link
        className="addNewUser link d-flex justify-content-center align-items-center"
        to="new"
      >
        <div className="addUserBtn ">
          <span>Add User</span>
          <FaPlus className="iconPlusUser" />
        </div>
      </Link>
      {isLoading ? (
        <div className="fs-2 w-md-75 text-center loadingUserAdmin">
          <p>Loading ...</p>
          <p className=" spinner spinner-grow"></p>
        </div>
      ) : error ? (
        <div className="text-center loadingProductsAdmin w-75">
          <p className="fs-1">{error}</p>
          <button
            className="btn-tryAgain fs-3"
            onClick={() => fetchCategories()}
          >
            Try Again
          </button>
        </div>
      ) : (
        <div>
          <div>
            <table className="table table-bordered table-striped text-center my-5">
              <thead className="table-dark">
                <tr className="table-row">
                  <th scope="col">Username</th>
                  <th scope="col">Name & Family</th>
                  <th scope="col">role</th>
                  <th scope="col">Operation</th>
                </tr>
              </thead>
              <tbody>
                {users.map((p) => {
                  return (
                    <tr key={p._id} className="table-row">
                      <td>{p.username}</td>
                      <td>
                        {p.firstname} {p.lastname}
                      </td>
                      <td>{p.role}</td>
                      <td>
                        <div className=" d-flex justify-content-center align-items-center">
                          {p.role == "Main Admin" ? (
                            <span className="MainAdminTrash d-flex justify-content-center align-items-center me-2   me-md-5">
                              <FaRegTrashAlt />
                            </span>
                          ) : (
                            <span
                              className="operation-trash d-flex justify-content-center align-items-center me-2   me-md-5"
                              onClick={() => removeUserHandler(p._id)}
                            >
                              <FaRegTrashAlt />
                            </span>
                          )}
                          {p.role == "Main Admin" ? (
                            <Link className="MainAdminEdit  d-flex justify-content-center align-items-center">
                              <FaRegEdit />
                            </Link>
                          ) : (
                            <Link
                              className="operation-edit  d-flex justify-content-center align-items-center"
                              to={"edit/" + `${p._id}`}
                            >
                              <FaRegEdit />
                            </Link>
                          )}
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
