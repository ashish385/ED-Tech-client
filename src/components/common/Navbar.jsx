import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from '../../services/apis';
// import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { BsChevronDown, BsSearch } from "react-icons/bs";



const Navbar = () => {

  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

  const [subLinks, setSubLinks] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSublinks = async () => {
     setLoading(true);
     try {
       const res = await apiConnector("GET", categories.CATEGORIES_API);
       console.log("getAllCategories api =====>",res);
       setSubLinks(res.data.data);
     } catch (error) {
       console.log("Could not fetch Categories.", error);
     }
     setLoading(false);
    };
    useEffect(() => {
        fetchSublinks();
    }, [])
  console.log("subLinks", subLinks);
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };
  return (
    <>
      <div className="h-14 flex flex-row justify-between items-center border-b-[1px] border-b-richblack-700">
        <div className="flex w-11/12 max-w-maxContent items-baseline justify-between ">
          <Link to={"/"}>
            <img src={logo} alt="logo" width={160} height={32} loading="lazy" />
          </Link>

          {/* Nav links */}
          <nav>
            <ul className="flex gap-x-6 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <>
                      <div
                        className={`group relative flex cursor-pointer items-center gap-1 ${
                          matchRoute("/catalog/:catalogName")
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        <p>{link.title}</p>
                        <BsChevronDown />
                        <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                          <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>
                          {loading ? (
                            <p className="text-center text-white">Loading...</p>
                          ) : subLinks.length  ? (
                            <>
                              {subLinks
                                ?.filter(
                                  (subLink) => subLink?.courses?.length > 0
                                )
                                ?.map((subLink, i) => (
                                  <Link
                                    to={`/catalog/${subLink.name
                                      .split(" ")
                                      .join("-")
                                      .toLowerCase()}`}
                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50"
                                    key={i}
                                  >
                                    <p className="text-black">{subLink.name}</p>
                                  </Link>
                                ))}
                            </>
                          ) : (
                            <p className="text-center">No Courses Found</p>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link to={link?.path}>
                      <p
                        className={`${
                          matchRoute(link?.path)
                            ? "text-yellow-25"
                            : "text-richblack-25"
                        }`}
                      >
                        {link.title}
                      </p>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* buttons */}
          <div className="flex gap-8 text-center text-white items-center ">
            {user && user?.accountType !== "Instructor" && (
              <div className="flex gap-5 ">
                <div>
                  <BsSearch size={20} />
                </div>
                <Link to={"/dashboard/cart"} className="relative">
                  <AiOutlineShoppingCart size={20} />
                  {totalItems > 0 && <span>{totalItems}</span>}
                </Link>
              </div>
            )}
            {!token && (
              <Link to={"/login"}>
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md hover:bg-richblack-900 transition-all duration-200 scale-95">
                  Log in
                </button>
              </Link>
            )}
            {!token && (
              <Link to={"/signup"}>
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md hover:bg-richblack-900 transition-all duration-200 scale-95">
                  Sign up
                </button>
              </Link>
            )}
            {token !== null && <ProfileDropdown />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
