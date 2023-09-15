import React, { useEffect, useState } from "react";
import { Link, matchPath, useLocation } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropdown from "../core/Auth/ProfileDropdown";
import { apiConnector } from "../../services/apiconnector";
import { categories } from '../../services/apis';
import { IoIosArrowDropdownCircle } from 'react-icons/io'
import { BsSearch } from "react-icons/bs";



const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const location = useLocation();

    const [subLinks, setSubLinks] = useState([]);

    const fetchSublinks = async () => {
      try {
        const result = await apiConnector("GET", categories.CATEGORIES_API);
        // console.log("Printing Sublinks Detailes", result);
        setSubLinks(result.data.allCategory);
      } catch (error) {
        console.log("Could not fetch category list");
      }
    };
    useEffect(() => {
        fetchSublinks();
    }, [])
  // console.log("subLinks", subLinks);
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
            <ul className="flex gap-x-8 text-richblack-25">
              {NavbarLinks.map((link, index) => (
                <li key={index}>
                  {/* <NavLink></NavLink> */}
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">
                      <p>{link?.title}</p>
                      <IoIosArrowDropdownCircle />

                      <div
                        className="invisible absolute
                               left-[50%] translate-x-[-50%]
                               top-[50%] translate-y-[25%] flex flex-col rounded-md
                               bg-richblack-25 p-4 text-richblack-900 opacity-0 transition-all duration-200
                               group-hover:visible group-hover:opacity-100 md:w-[200px] group-hover:z-10 "
                      >
                        <div className="absolute left-[60%] translate-y-[-40%] top-0 h-6 w-6 rotate-45  bg-richblack-25"></div>
                        <div>
                          {subLinks.length > 0 ? (
                            <div className="flex flex-col gap-4 px-4">
                              {subLinks.map((link, index) => (
                                <Link key={index} to={link.link}>
                                  {link.name}
                                </Link>
                              ))}
                            </div>
                          ) : (
                            <div></div>
                          )}
                        </div>
                      </div>
                    </div>
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
                <div><BsSearch size={20} /></div>
                <Link to={"/dashboard/cart"} className="relative">
                  <AiOutlineShoppingCart size={20} />
                  {totalItems > 0 && <span>{totalItems}</span>}
                </Link>
              </div>
            )}
            {token === null && (
              <Link to={"/login"}>
                <button className="border border-richblack-700 bg-richblack-800 px-3 py-2 text-richblack-100 rounded-md hover:bg-richblack-900 transition-all duration-200 scale-95">
                  Log in
                </button>
              </Link>
            )}
            {token === null && (
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
