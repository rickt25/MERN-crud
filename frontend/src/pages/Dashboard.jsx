import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { logout, reset } from '../features/auth/authSlice';

export default function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function loggingout(){
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  }

  return (
    <>
      <DashboardLayout>
        <h1>INI DASHBOARD</h1>
        <button onClick={loggingout}>Logout</button>
      </DashboardLayout>
    </>
  )
}