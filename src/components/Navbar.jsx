import Cookies from "js-cookie";
import React from "react";
import { useDispatch } from "react-redux";
//import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../redux/api/authApi";
import { removeUser } from "../redux/services/authSlice";

const Navbar = () => {
  //const { user } = useSelector((state) => state.authSlice);
  //const { token } = useSelector((state) => state.authSlice);

const user=JSON.parse(Cookies.get("user"));
const token=Cookies.get("token");
  console.log(token);
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch=useDispatch();

  const logoutHandler = async () => {
    const {data} = await logout(token);
    dispatch(removeUser());
    if(data?.success){
      nav('/login');
    }
    console.log(data);
  };

  return (
    <div>
      <div className=" p-7 shadow-lg flex justify-around items-center">
        <h2>MMS IT</h2>
        <div className=" flex gap-5 items-center">
          <div>
            <p>{user?.name}</p>
            <p>{user?.email}</p>
          </div>
          <button
            onClick={logoutHandler}
            className=" bg-red-500 text-white px-3 py-1"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
