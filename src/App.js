import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core//Auth/OpenRoute"
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';
import PrivateRoute from './components/core/Auth/PrivateRoute';
import Error from './pages/Error'
import Setting from "./components/core/Dashboard/Settings/Setting";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Wishlist from "./components/core/Dashboard/Wishlist";
import Cart from "./components/core/Dashboard/Cart";
import {ACCOUNT_TYPE} from './utils/constants'
import { useDispatch, useSelector } from "react-redux";

function App() {
   const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  const { user } = useSelector((state) => state.profile)
  return (
    <>
      <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
    <Navbar/>
    <Routes >
      <Route path="/" element={<Home/>} />
      <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
    <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
    <Route path="about" element={<About />}/>
          
          <Route path="/contact" element={<Contact />} />

          <Route element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="dashboard/my-profile" element={<MyProfile />} />
            <Route path="dashboard/settings" element={<Setting />} />
           
            {
              user?.accountType === ACCOUNT_TYPE.STUDENT && (
                <> 
                   <Route path="dashboard/cart" element={<Cart />} />
            <Route path="dashboard/enrolled-courses" element={<EnrolledCourses />} />
            <Route path="dashboard/whishlist" element={<Wishlist />} />
                </>
              )
            }
          </Route>
          
          <Route path="*" element={<Error />} />
    </Routes>

   </div>
    </>
  );
}

export default App;
