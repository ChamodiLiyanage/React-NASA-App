import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/usersSlice";
import { hideLoading, showLoading } from "../redux/alertsSlice";

function ProtectedRoute(props) {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      } else {
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user]);
  if (localStorage.getItem("token")) {
    return props.children;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export default ProtectedRoute;
