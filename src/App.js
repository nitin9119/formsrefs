import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [form, setForm] = useState({});
  const [user, setUser] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    return fetch("http://localhost:3002/users")
      .then((d) => d.json())
      .then((res) => {
        setUser(res);
        //console.log(res);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <div className="App">
      <h1>Employees Details App:-</h1>
      <div style={{ display: "flex" }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <strong>Enter employee details Below:-</strong>
          <hr />
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="enter full name"
          />
          <br />
          <input
            type="text"
            name="age"
            onChange={handleChange}
            placeholder="enter Age"
          />
          <br />
          <input
            type="text"
            name="address"
            onChange={handleChange}
            placeholder="enter address"
          />
          <br />
          <input
            type="text"
            name="department"
            onChange={handleChange}
            placeholder="Enter Department"
          />
          <br />
          <input
            type="text"
            name="salary"
            onChange={handleChange}
            placeholder="Enter salary"
          />
          <br />
          <input
            type="text"
            name="marital_status"
            onChange={handleChange}
            placeholder="Enter Marital status"
          />
          <br />
          <input
            type="text"
            name="photo"
            onChange={handleChange}
            placeholder="Enter photo's url"
          />
          <br />
          <button
            onClick={() => {
              fetch("http://localhost:3002/users", {
                method: "POST",
                body: JSON.stringify(form),
                headers: {
                  "content-type": "application/json",
                },
              }).then(() => {
                getUser();
              });
            }}
          >
            {" "}
            Submit Details{" "}
          </button>
        </form>
        {
          <div style={{ marginLeft: "140px" }}>
            <div className="table">
              <p>
                <strong>Name</strong>
              </p>
              <hr />
              <p>
                <strong>Age</strong>
              </p>
              <hr />
              <p>
                <strong>Address</strong>
              </p>
              <hr />
              <p>
                <strong>Department</strong>
              </p>
              <hr />
              <p>
                <strong>Salary</strong>
              </p>
              <hr />
              <p>
                <strong>Marital_status</strong>
              </p>
              <hr />
              <p>
                <strong>Photo</strong>
              </p>
            </div>

            <div>
              {user.map((e) => (
                <div className="table">
                  <p>{e.name}</p>
                  <hr />
                  <p>{e.age}</p>
                  <hr />
                  <p>{e.address}</p>
                  <hr />
                  <p>{e.department}</p>
                  <hr />
                  <p>{e.salary}</p>
                  <hr />
                  <p>{e.marital_status}</p>
                  <hr />
                  <img
                    style={{
                      width: "30px",
                      height: "30px",
                      backgroundSize: "contain",
                    }}
                    src={e.photo}
                  />
                  <button
                    onClick={() => {
                      fetch(`http://localhost:3002/users/${e.id}`, {
                        method: "DELETE",
                      }).then(() => {
                        getUser();
                      });
                    }}
                  >
                    delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
