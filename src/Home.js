import { TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Home() {
  return (
    <div>
      <h1>Welcome to Mobile Shopping</h1>
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  const navigate = useNavigate();
  const [formstate, setFormstate] = useState("success");
  const { handleChange, values, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async () => {
      console.log(values);

      const data = await fetch("http://localhost:4000/user/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (data.status === 401) {
        console.log("Error");
        setFormstate("error");
      } else {
        const result = await data.json();
        console.log("Successs", result);
        localStorage.setItem("token", result.token);
        localStorage.setItem("roleId", result.roleId);
        navigate("/mobiles");
      }
    },
  });

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>
      <TextField
        variant="outlined"
        label="Username"
        onChange={handleChange}
        value={values.username}
        name="username"
        placeholder="admin"
      />
      <TextField
        variant="outlined"
        label="Password"
        onChange={handleChange}
        value={values.password}
        name="password"
        placeholder="admin@123"
      />

      <Button color={formstate} type="submit" variant="contained">
        {formstate === "error" ? "Retry" : "Submit"}
      </Button>
    </form>
  );
}
