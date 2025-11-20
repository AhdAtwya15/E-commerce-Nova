import { NavLink, useNavigate, useLocation } from "react-router-dom";
import type { INavPages } from "../../Interfaces";
import { BsCart4 } from "react-icons/bs";
import { FaHeart, FaUser} from "react-icons/fa";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Button from "../UI/Button";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../app/store";
import { logout } from "../../app/Features/Slices/authSlice";

import { loggedUserApi, useGetUserDataQuery } from "../../app/Features/loggedUserApi";
import { IoIosArrowDown } from "react-icons/io";
import { cartApi, useGetCartProductQuery } from "../../app/Features/cartApi";
import { useGetWishlistProductsQuery, wishlistApi } from "../../app/Features/wishlistApi";
 import { setKeyword, clearKeyword } from "../../app/Features/Slices/filterSlice"; 
import { preload } from "../../utilis/global-preload";

const NavPages: INavPages[] = [
  { text: "Home",
     path: "/" ,
    importFn: () => import("../../Pages/Home/HomePage")
  },
  { text: "About",
    path: "/about",
    importFn: () => import("../../Pages/About/AboutPage")
     },
  { text: "Products",
    path: "/products",
  importFn: () => import("../../Pages/Product/ShowProductsPage"),
},
 { text: "Categories", 
    path: "/categories",
    importFn: () => import("../../Pages/Categories/CategoriesPage"),
   },
  { text: "Brands",
    path: "/brands",
    importFn: () => import("../../Pages/Brands/BrandsPage")
     },
 
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const dropdownRef = useRef<HTMLDivElement>(null);
   const menuRef = useRef<HTMLDivElement>(null);
   const serachRef = useRef<HTMLDivElement>(null);
  
  

   
   const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

const { data: loggedInData } = useGetUserDataQuery(token || '', { 
  skip: !token,
});

const { data: wishlistData } = useGetWishlistProductsQuery({}, {
  skip: !token,  
});

 
const userData = token ? loggedInData?.data : null;
const userRole = userData?.role;
const userName = userData?.name;
const wishlistLength = token ? (wishlistData?.data?.length || 0) : 0;

const shouldFetchUserData =
  !!token && userRole !== undefined && userRole === "user";

const { data: cartItems } = useGetCartProductQuery({}, {
  skip: !shouldFetchUserData,
});

const cartProducts = token ? (cartItems?.data?.products ?? []) : [];

const handleLogout = () => {
  setIsDropdownOpen(false);
  
  dispatch(logout());
  dispatch(loggedUserApi.util.resetApiState());
  dispatch(cartApi.util.resetApiState());
  dispatch(wishlistApi.util.resetApiState());
  
  navigate("/login");
};

useEffect(() => {
  if (!token) {
    setSearchInput("");
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
    setIsSearchOpen(false);
  }
}, [token]);
 
  

//   const { data: loggedInData } = useGetUserDataQuery(token || '', { 
//   skip: !token ,
// });

// const {data:wishlistData}=useGetWishlistProductsQuery({})

//   const userData=loggedInData?.data

//   const userRole = userData?.role;
//   const userName = userData?.name;
//   const wishlistLength = wishlistData?.data.length|| 0;
  
//   const shouldFetchUserData =
//   !!token && userRole !== undefined && userRole === "user";
//   const { data: cartItems } = useGetCartProductQuery({}, {
//   skip: !shouldFetchUserData,
// });
// const cartProducts=cartItems?.data?.products??[]



// // عدّل handleLogout بهذا الكود:
// const handleLogout = () => {
//   console.log('🔴 Starting Logout...');
//   setIsDropdownOpen(false);
  
//   dispatch(logout());
//   console.log('✅ Token cleared');
  
//   const result1 = dispatch(loggedUserApi.util.resetApiState());
//   console.log('✅ loggedUserApi reset:', result1);
  
//   const result2 = dispatch(cartApi.util.resetApiState());
//   console.log('✅ cartApi reset:', result2);
  
//   const result3 = dispatch(wishlistApi.util.resetApiState());
//   console.log('✅ wishlistApi reset:', result3);
  
//   navigate("/login");
//   console.log('✅ Navigated to login');
// };

// // أضف Effect جديد لتتبع البيانات:
// useEffect(() => {
//   console.log('📊 Current state:');
//   console.log('   Token:', !!token);
//   console.log('   User Role:', userRole);
//   console.log('   Cart Products:', cartProducts);
//   console.log('   Wishlist Length:', wishlistLength);
//   console.log('   shouldFetchUserData:', shouldFetchUserData);
// }, [token, userRole, cartProducts, wishlistLength, shouldFetchUserData]);
  

// // // أضف هذا Effect بعد باقي ال useEffect
// // useEffect(() => {
// //   // عند logout، حدث واجهة المستخدم بشكل فوري
// //   if (!token) {
// //     // إعادة تعيين الـ state
// //     setSearchInput("");
// //     setIsDropdownOpen(false);
// //     setIsMenuOpen(false);
// //   }
// // }, [token]);

// // // وعدّل الـ handleLogout ليكون كالتالي:
// // const handleLogout = () => {
// //   setIsDropdownOpen(false);
  
// //   // أولاً: امسح البيانات من الـ Redux store
// //   dispatch(logout());
  
// //   // ثانياً: invalid tags لتنظيف الـ cache
// //   dispatch(loggedUserApi.util.invalidateTags(['LoggedUser']));  
// //   dispatch(cartApi.util.invalidateTags(['CartProducts']));
// //   dispatch(wishlistApi.util.invalidateTags(['WishlistProducts']));
  
// //   // ثالثاً: انقل بعد شوية (الـ token بيتمسح أولاً، فبتحديث الـ UI)
// //   setTimeout(() => {
// //     navigate("/login");
// //   }, 500); // قلل الوقت من 1500 لـ 500 عشان أسرع
// // };

useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }

    if (
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsMenuOpen(false);
    }

    if (
      serachRef.current &&
      !serachRef.current.contains(event.target as Node)
    ) {
      setIsSearchOpen(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);





  const isInAdminLayout = location.pathname.startsWith("/admin");

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

 useEffect(() => {
  const trimmed = searchInput.trim();

  if (trimmed) {
    const timeout = setTimeout(() => {
      dispatch(setKeyword(trimmed));

      if (!location.pathname.startsWith("/products") && !isInAdminLayout) {
        navigate(`/products?keyword=${encodeURIComponent(trimmed)}`);
      } else if (isInAdminLayout && location.pathname !== "/admin") {
        navigate(`/admin?keyword=${encodeURIComponent(trimmed)}`);
      }
    }, 600);
    return () => clearTimeout(timeout);
  } else {
    dispatch(clearKeyword());
    const params = new URLSearchParams(location.search);
    if (params.has("keyword")) {
      params.delete("keyword");
      navigate({ search: params.toString() }, { replace: true });
    }
  }
}, [searchInput, dispatch, navigate, location.pathname, location.search, isInAdminLayout]);

useEffect(() => {
  if (!location.pathname.startsWith("/products") && !isInAdminLayout) {
    setSearchInput("");
  }
 
}, [location.pathname, isInAdminLayout]);



  return (
    <motion.nav className="bg-white border-gray-200 font-roobert sticky top-0 z-40">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-3 py-1">
        <motion.div
          className="flex items-center space-x-3"
          whileHover={{ scale: 1.05, rotate: 5 }}
        >
          <motion.img
            src="https://res.cloudinary.com/df2nbeovz/logo_j2rnop"
            className="h-10 w-auto cursor-pointer"
            alt="Nova Logo"
            onClick={() => navigate("/")}
            transition={{ duration: 0.2 }}
          />
        </motion.div>

        <div className="hidden lg:flex items-center space-x-7">
          {NavPages.map((page, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.1, 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <NavLink
                to={page.path}
                 onMouseEnter={() => preload(page.importFn)}
                                onClick={(e) => {
                    e.preventDefault();         
                    preload(page.importFn);      
                    navigate(page.path);     }}
                end
                className={({ isActive }) =>
                  `relative block pt-2 pb-1 transition duration-300 font-medium ${
                    isActive
                      ? "text-[#E8765E] "
                      : "text-[#3B8D90] hover:text-[#E8765E] after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[1.5px] after:bg-[#E8765E] after:w-0 hover:after:w-full after:transition-all after:duration-300"
                  }`
                }
              >
                {page.text}
              </NavLink>
            </motion.div>
          ))}
        </div>

        <div 
        ref={serachRef}
        className="flex items-center gap-3 md:gap-6">
          
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <motion.input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="block w-56 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-[#3B8D90] focus:border-[#3B8D90] transition-all mt-1"
              placeholder={
                isInAdminLayout ? "Search for Admin..." : "Search products..."
              }
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            />
          </div>

     
          <motion.button
            className="md:hidden text-[#3B8D90]"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </motion.button>

        
          {userRole === "admin"? null: (
            <div className="flex gap-3 items-center mt-2">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button onClick={() => navigate("/cart")}>
                <BsCart4 className="text-3xl text-[#3B8D90] hover:text-[#E8765E] cursor-pointer transition-colors duration-300" />
              </button>
              {userRole === "user" && cartProducts.length > 0 && (
                              <motion.span
                className="absolute -top-2 -right-2 bg-[#E8765E] text-white text-xs px-1.5 rounded-full "
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                {cartProducts.length}
              </motion.span>
              )
              }

            </motion.div>

         
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button onClick={()=>navigate("/wishlist")}>
                <FaHeart
                 className="text-2xl mt-1 text-[#3B8D90] hover:text-[#E8765E] cursor-pointer transition-colors duration-300" />
              </button>

               {userRole === "user" && wishlistLength > 0 && (
                <motion.span
                className="absolute -top-2 -right-2 bg-[#E8765E] text-white text-xs px-1.5 rounded-full "
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              >
                {wishlistLength}
              </motion.span>
              )
              }

             
            </motion.div>
          </div>
          )}

          <motion.div transition={{ duration: 0.4, ease: "easeOut" }}>
            <motion.div whileTap={{ scale: 0.95 }}>
              {token ? (
                <div className="relative hidden lg:block" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#3B8D90] text-white rounded-lg hover:bg-[#E8765E] transition-colors duration-300 mt-2"
                  >
                    <IoIosArrowDown className="text-sm" />
                    <span className="text-sm font-medium">
                      {userRole=== "admin" ? "Admin" :`Hi, ${userName?.split(" ")[0] || ""}`}
                      </span>
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
                      >
                        <button
                          onClick={() => {
                            setIsDropdownOpen(false);
                            if (userRole === "admin") {
                              navigate("/admin");
                            } else {
                              navigate("/profile");
                            }
                          }}
                          className="w-full text-left px-4 py-3 text-sm text-[#3B8D90] hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
                        >
                          <FaUser className="text-xs" />
                          {userRole=== "admin" ? "Admin Dashboard" : "My Profile" }
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full text-left px-4 py-3 text-sm text-red-700 hover:bg-gray-100 transition-colors duration-200 border-t border-gray-200"
                        >
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
              ) : (
                <Button
                  variant="apply"
                  size="md"
                  className="hidden lg:block md:mt-2"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              )}
            </motion.div>
          </motion.div>

  
          <motion.button
            className="lg:hidden text-[#3B8D90] text-3xl"
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <HiX /> : <HiMenuAlt3 />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isSearchOpen && (

           <>
     
    
          <motion.div
          
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-gray-200 overflow-hidden"
          >
            <div className="px-4 py-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-[#3B8D90] focus:border-transparent"
                  placeholder={
                    isInAdminLayout
                      ? "Search for Admin..."
                      : "Search products..."
                  }
                />
              </div>
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
           ref={menuRef}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-gray-200 bg-white overflow-hidden"
          >
            <div className="py-4 px-3 space-y-3">
              {NavPages.map((page, index) => (
                <motion.div
                  key={index}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <NavLink
                    to={page.path}
                    end
                    className={({ isActive }) =>
                      `block py-2 px-3 rounded-lg text-base font-medium transition-colors duration-300 ${
                        isActive
                          ? " text-[#E8765E]"
                          : "text-[#3B8D90] hover:bg-gray-100 hover:text-[#E8765E]"
                      }`
                    }
                  >
                    {page.text}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: NavPages.length * 0.1 }}
                className="pt-3 space-y-2"
              >
                {token ? (
                  <>
                    <Button
                      variant="apply"
                      size="md"
                      className="w-full"
                      onClick={() => {
                        if (userRole === "admin") {
                          navigate("/admin");
                        } else {
                          navigate("/profile");
                        }
                        setIsMenuOpen(false);
                      }}
                    >
                      {userRole=== "admin" ? "Admin Dashboard" : "My Profile" }
                    </Button>
                    <Button
                      variant="apply"
                      size="md"
                      className="w-full"
                      onClick={() => {
                        dispatch(logout());
                        dispatch(loggedUserApi.util.invalidateTags(['LoggedUser'])); 
                        setTimeout(() => {
                          navigate("/login");
                          setIsMenuOpen(false);
                        }, 1500);
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="apply"
                    size="md"
                    className="w-full"
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                  >
                    Login
                  </Button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;




