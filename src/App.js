import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { API } from "./global";
import { Home } from "./Home";
import { Phone } from "./Phone";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/mobiles"
          element={
            <ProductedRoute>
              <PhoneList />
            </ProductedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProductedRoute({ children }) {
  const isAuth = localStorage.getItem("token");

  return isAuth ? children : <Navigate replace to="/" />;
}

export function CheckAuth(data) {
  if (data.status === 401) {
    throw Error("unauthorised");
  } else {
    return data.json();
  }
}
export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/";
}

function PhoneList() {
  const [mobiles, setMobiles] = useState([]);
  const getMobiles = () => {
    fetch(API, {
      method: "GET",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
      .then((res) => CheckAuth(res))
      .then((data) => setMobiles(data))
      .catch((err) => logout());
  };
  useEffect(() => {
    getMobiles();
  }, []);

  return (
    <div className="container">
      <h1 className="p-2 bold">Mobile Shopping</h1>
      <div className="row m-2">
        {mobiles.map((mb, i) => (
          <Phone key={i} mobile={mb} getMobiles={getMobiles} />
        ))}
      </div>
    </div>
  );
}

export default App;
