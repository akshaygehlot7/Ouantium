import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(date);
};

const Home = () => {
  const [data, setData] = useState([]);
  const [tabledark, setTableDark] = useState("");
  
  function getData() {
    axios
      .get("/api/users/allUser")
      .then((res) => {
        console.log(res.data.user);
        setData(res.data.users || []);
      })
      .catch((err) => {
        console.error("Error fetching data: ", err);
        setData([]); // Fallback to an empty array in case of error
      });
  }
  
  // const setToLocalStorage = (id, name, email) => {
  //   localStorage.setItem("id", id);
  //   localStorage.setItem("name", name);
  //   localStorage.setItem("email", email);
  // };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="d-flex justify-content-between m-2">
        <h2>Read Operation</h2>
        {/* <Link to="/">
          <button className="btn btn-secondary">Create</button>
        </Link> */}
      </div>
      {/* {data.map((data)=>{
        <h1>{data.email}</h1>
      })} */}
      <table className={`table ${tabledark}`}>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            {/* <th scope="col"></th>
            <th scope="col"></th> */}
          </tr>
        </thead>
        <tbody>
          {data.map((data, index) => (
            <tr key={data.id}>
              <th scope="row">{index + 1}</th>
              <td>{data.name}</td>
              <td>{data.email}</td>
              <td>{formatDate(data.dateofBirth)}</td>
              {/* <td>  
                <Link to="/update">
                  <button
                    className="btn btn-success"
                    onClick={() =>
                      setToLocalStorage(user.id, user.name, user.email)
                    }
                  >
                    Edit
                  </button>
                </Link>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td> */}
            </tr>
          ))}
        </tbody>

        {/* {data.map((users) => {
          return (
            <>
              <tbody>
                <tr>
                  <th scope="row">{users.id}</th>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  {/* <td>
                    <Link to="/update">
                      <button
                        className="btn-success"
                        onClick={() =>
                          setToLocalStorage(
                            users.id,
                            users.name,
                            users.email
                          )
                        }
                      >
                        Edit{" "}
                      </button>
                    </Link>
                  </td> */}
                  {/* <td>
                    <button
                      className="btn-danger"
                      onClick={() => handleDelete(eachData.id)}
                    >
                      Delete
                    </button>
                  </td> */}
                {/* </tr> */}
              {/* </tbody> */}
            {/* </> */}
          {/* ); */}
        {/* })} */}
      </table>
    </>
  )
}

export default Home
