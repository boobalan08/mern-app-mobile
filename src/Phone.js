import { Button } from "@mui/material";
import { CheckAuth, logout } from "./App";
import { API } from "./global";
const ROLE_ID = {
  ADMIN: "0",
  USER: "1",
};

export function Phone({ mobile, getMobiles }) {
  const roleId = localStorage.getItem("roleId");
  const deleteMobile = (mobileId) => {
    fetch(`${API}/${mobileId}`, {
      method: "DELETE",
      headers: {
        "x-auth-token": localStorage.getItem("token"),
        roleId: roleId,
      },
    })
      .then((res) => CheckAuth(res))
      .then(() => getMobiles())
      .catch((err) => logout());
  };
  return (
    <div className="col p-2">
      <div className="card shadows " style={{ width: "540px" }}>
        <img
          src={mobile.img}
          alt={mobile.model}
          className="card-img-top phone-picture"
        />
        <div className="card-body">
          <h2 className="phone-name">{mobile.model}</h2>
          <p className="phone-company">{mobile.company}</p>
          {roleId === ROLE_ID.ADMIN ? (
            <Button
              color="error"
              variant="contained"
              sx={{ width: "100%" }}
              onClick={() => deleteMobile(mobile._id)}
            >
              Delete
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
