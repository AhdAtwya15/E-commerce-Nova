import { createBrowserRouter } from "react-router-dom";
import React from "react";
import ProtectedRoute from "../Compenets/ProtectedRoutes/ProtectedRoute";
import AdminRoute from "../Compenets/ProtectedRoutes/AdminRoute";

const Layout = React.lazy(() => import("../Compenets/Layout/Layout"));
const HomePage = React.lazy(() => import("../Pages/Home/HomePage"));
const RegisterPage = React.lazy(() => import("../Pages/Auth/RegisterPage"));
const LoginPage = React.lazy(() => import("../Pages/Auth/LoginPage"));
const ForgotPassPage = React.lazy(() => import("../Pages/Auth/ForgotPassPage"));
const VerifyResetCodePage = React.lazy(() => import("../Pages/Auth/VerifyResetCodePage"));
const ResetPasswordPage = React.lazy(() => import("../Pages/Auth/ResetPasswordPage"));
const AboutPage = React.lazy(() => import("../Pages/About/AboutPage"));
const CartPage = React.lazy(() => import("../Pages/Cart/CartPage"));
const PaymentMethodPage = React.lazy(() => import("../Pages/Cart/PaymentMethodPage"));

const ProductDetailsPage = React.lazy(() => import("../Pages/Product/ProductDetailsPage"));
const ShowProductsPage = React.lazy(() => import("../Pages/Product/ShowProductsPage"));

const BrandsPage = React.lazy(() => import("../Pages/Brands/BrandsPage"));
const CategoriesPage = React.lazy(() => import("../Pages/Categories/CategoriesPage"));
const WishlistPage = React.lazy(() => import("../Pages/Wishlit/WishlistPage"));

const ProfilePageLayout = React.lazy(() => import("../Pages/Profile/ProfilePageLayout"));
const MyProfileSection = React.lazy(() => import("../Compenets/Profile/Sections/MyProfileSection"));
const MyAddressesSection = React.lazy(() => import("../Compenets/Profile/Sections/MyAddressesSection"));
const MyOrdersSection = React.lazy(() => import("../Compenets/Profile/Sections/MyOrdersSection"));

const AdminDashboard = React.lazy(() => import("../Pages/Admin/AdminDashboard"));
const AdminProductsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminProductsManagement"));
const AdminCatManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminCatManagement"));
const AdminBrandsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminBrandsManagement"));
const AdminSubCategoryManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminSubCategoryManagement"));

const AddProductSection = React.lazy(() => import("../Compenets/Admin/Add/AddProductSection"));
const AdminCouponsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminCouponsManagement"));
const EditProductSection = React.lazy(() => import("../Compenets/Admin/Edits/EditProductSection"));

const AllOrdersSection = React.lazy(() => import("../Compenets/Admin/Managements/AdminOrdersManagement"));
const OrderDetailsSection = React.lazy(() => import("../Compenets/Admin/OrderDetailsSection"));

const NotFoundPage = React.lazy(() => import("../Pages/NotFound/NotFoundPage"));
const SuccessPage = React.lazy(() => import("../Pages/Success/SuccessPage"));

const Router = createBrowserRouter([
  {
    path: "/success/:id",
    element: <SuccessPage />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "forgotPassword", element: <ForgotPassPage /> },
      { path: "resetCode", element: <VerifyResetCodePage /> },
      { path: "resetPassword", element: <ResetPasswordPage /> },
      { path: "about", element: <AboutPage /> },

      { path: "cart", element: <ProtectedRoute><CartPage /></ProtectedRoute> },
      { path: "paymentMethod/:cartId", element: <ProtectedRoute><PaymentMethodPage /></ProtectedRoute> },
      { path: "wishlist", element: <ProtectedRoute><WishlistPage /></ProtectedRoute> },

      { path: "products", element: <ShowProductsPage /> },
      { path: "products/:id", element: <ProductDetailsPage /> },

      { path: "brands", element: <BrandsPage /> },
      { path: "categories", element: <CategoriesPage /> },
      
      {
        path: "profile",
        element: <ProtectedRoute><ProfilePageLayout /></ProtectedRoute>,
        children: [
          { index: true, element: <MyProfileSection /> },
          { path: "addresses", element: <MyAddressesSection /> },
          { path: "orders", element: <MyOrdersSection /> },
        ],
      },

      {
        path: "admin",
        element: <AdminRoute><AdminDashboard /></AdminRoute>,
        children: [
          { index: true, element: <AdminProductsManagement /> },
          { path: "categories", element: <AdminCatManagement /> },
          { path: "brands", element: <AdminBrandsManagement /> },
          { path: "subCategories", element: <AdminSubCategoryManagement /> },
          { path: "allOrders", element: <AllOrdersSection /> },
          { path: "allOrders/:id", element: <OrderDetailsSection /> },
          { path: "addProduct", element: <AddProductSection /> },
          { path: "coupons", element: <AdminCouponsManagement /> },
          { path: "editProduct/:id", element: <EditProductSection /> },
        ],
      },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default Router;


// import { createBrowserRouter } from "react-router-dom";
// import React from "react";

// const Layout = React.lazy(() => import("../Compenets/Layout/Layout"));
// const HomePage = React.lazy(() => import("../Pages/Home/HomePage"));
// const RegisterPage = React.lazy(() => import("../Pages/Auth/RegisterPage"));
// const LoginPage = React.lazy(() => import("../Pages/Auth/LoginPage"));
// const ForgotPassPage = React.lazy(() => import("../Pages/Auth/ForgotPassPage"));
// const VerifyResetCodePage = React.lazy(() => import("../Pages/Auth/VerifyResetCodePage"));
// const ResetPasswordPage = React.lazy(() => import("../Pages/Auth/ResetPasswordPage"));
// const AboutPage = React.lazy(() => import("../Pages/About/AboutPage"));
// const CartPage = React.lazy(() => import("../Pages/Cart/CartPage"));
// const PaymentMethodPage = React.lazy(() => import("../Pages/Cart/PaymentMethodPage"));

// const ProductDetailsPage = React.lazy(() => import("../Pages/Product/ProductDetailsPage"));
// const ShowProductsPage = React.lazy(() => import("../Pages/Product/ShowProductsPage"));

// const BrandsPage = React.lazy(() => import("../Pages/Brands/BrandsPage"));
// const CategoriesPage = React.lazy(() => import("../Pages/Categories/CategoriesPage"));
// const WishlistPage = React.lazy(() => import("../Pages/Wishlit/WishlistPage"));

// const ProfilePageLayout = React.lazy(() => import("../Pages/Profile/ProfilePageLayout"));
// const MyProfileSection = React.lazy(() => import("../Compenets/Profile/Sections/MyProfileSection"));
// const MyAddressesSection = React.lazy(() => import("../Compenets/Profile/Sections/MyAddressesSection"));
// const MyOrdersSection = React.lazy(() => import("../Compenets/Profile/Sections/MyOrdersSection"));


// const AdminDashboard = React.lazy(() => import("../Pages/Admin/AdminDashboard"));
// const AdminProductsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminProductsManagement"));
// const AdminCatManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminCatManagement"));
// const AdminBrandsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminBrandsManagement"));
// const AdminSubCategoryManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminSubCategoryManagement"));



// const AddProductSection = React.lazy(() => import("../Compenets/Admin/Add/AddProductSection"));
// const AdminCouponsManagement = React.lazy(() => import("../Compenets/Admin/Managements/AdminCouponsManagement"));
// const EditProductSection = React.lazy(() => import("../Compenets/Admin/Edits/EditProductSection"));


// const AllOrdersSection = React.lazy(() => import("../Compenets/Admin/Managements/AdminOrdersManagement"));
// const OrderDetailsSection = React.lazy(() => import("../Compenets/Admin/OrderDetailsSection"));

// const NotFoundPage = React.lazy(() => import("../Pages/NotFound/NotFoundPage"));
// const SuccessPage = React.lazy(() => import("../Pages/Success/SuccessPage"));



// const Router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: "register", element: <RegisterPage /> },
//       { path: "login", element: <LoginPage /> },
//       { path: "forgotPassword", element: <ForgotPassPage /> },
//       { path: "resetCode", element: <VerifyResetCodePage /> },
//       { path: "resetPassword", element: <ResetPasswordPage /> },
//       { path: "about", element: <AboutPage /> },

//       { path: "cart", element: <CartPage /> },
//       { path: "paymentMethod/:cartId", element: <PaymentMethodPage /> },
//       { path: "wishlist", element: <WishlistPage /> },

//       { path: "products", element: <ShowProductsPage /> },
//       { path: "products/:id", element: <ProductDetailsPage /> },

//       { path: "brands", element: <BrandsPage /> },
//       { path: "categories", element: <CategoriesPage /> },
//       {path:"success",element:<SuccessPage/>},
//       {
//         path: "profile",
//         element: <ProfilePageLayout />,
//         children: [
//           { index: true, element: <MyProfileSection /> },
//           { path: "addresses", element: <MyAddressesSection /> },
//           { path: "orders", element: <MyOrdersSection /> },
//         ],
//       },
//       {
//         path: "admin",
//         element: <AdminDashboard />,
//         children: [
//           { index: true, element: <AdminProductsManagement /> },
//           { path: "categories", element: <AdminCatManagement /> },
//           { path: "brands", element: <AdminBrandsManagement /> },
//             { path: "subCategories", element: <AdminSubCategoryManagement /> },
//           { path: "allOrders", element: <AllOrdersSection /> },
//           { path: "allOrders/:id", element: <OrderDetailsSection /> },
//           { path: "addProduct", element: <AddProductSection /> },
//           { path: "coupons", element: <AdminCouponsManagement /> },
//           { path: "editProduct/:id", element: <EditProductSection /> },
          
//         ],
//       },

//       { path: "*", element: <NotFoundPage /> },
//     ],
//   },
// ]);

// export default Router;



