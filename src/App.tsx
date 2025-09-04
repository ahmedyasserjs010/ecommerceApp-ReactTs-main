//  app routes
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Layout from "./shared_components/Layouts/Layout.tsx";
import Home from "./Modules/User/Home/Home.tsx";
import Categories from './Modules/User/Categories/Categories.tsx';
import Cart from './Modules/User/Cart/Cart.tsx';
import Brands from './Modules/User/Brands/Brands.tsx';
import Products from './Modules/User/Products/Products.tsx';
import Wishlist from './Modules/User/Wishlist/Wishlist.tsx';
import Login from './Modules/Auth/Login/Login.tsx';
import Signup from './Modules/Auth/Signup/Signup.tsx';
import ForgotPassword from './Modules/Auth/ForgotPassword/ForgotPassword.tsx';
import SpecialProduct from './Modules/User/Products/specialProduct.tsx';
import SpecialCategories from './Modules/User/Categories/specialCategories.tsx';
import ProtectedRoutes from './shared_components/ProtectedRoutes/ProtectedRoutes.tsx';
import AdminLayout from './shared_components/Layouts/AdminLayout.tsx';
import AdminDashboard from './Modules/Admin/AdminDashboard/AdminDashboard.tsx';
import Plastic from './Modules/User/Plastic/Plastic.tsx';
import Housewares from './Modules/User/Housewares/Housewares.tsx';
import Cookware from './Modules/User/Cookware/Cookware.tsx';
// import PlasticAdmin from './Modules/Admin/PlasticAdmin/PlasticAdmin.tsx';
import HousewaresAdmin from './Modules/Admin/HousewaresAdmin/HousewaresAdmin.tsx';
import CookwareAdmin from './Modules/Admin/CookwareAdmin/CookwareAdmin.tsx';
import EditMainSlider from './Modules/Admin/EditMainSlider/EditMainSlider.tsx';
import AddOffers from './Modules/Admin/OffersAdsManager/OffersAdsManager.tsx';
import ProductsAdmin from './Modules/Admin/ProductsAdmin/ProductsAdmin.tsx';
import DiscountManager from './Modules/Admin/DiscountManager/DiscountManager.tsx';
import AddProduct from './Modules/Admin/AddProduct/AddProduct.tsx';
import EditProduct from './Modules/Admin/EditProduct/EditProduct.tsx';

function App() {

  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { index: true, element: <ProtectedRoutes><Home /></ProtectedRoutes> },
        { path: 'plastic', element: <ProtectedRoutes><Plastic /></ProtectedRoutes> },
        { path: 'housewares', element: <ProtectedRoutes><Housewares /></ProtectedRoutes> },
        { path: 'cookware', element: <ProtectedRoutes><Cookware /></ProtectedRoutes> },
        { path: 'categories', element: <ProtectedRoutes><Categories /></ProtectedRoutes> },
        { path: 'categories/:id', element: <ProtectedRoutes><SpecialCategories /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><Products /></ProtectedRoutes> },
        { path: 'products/:id', element: <ProtectedRoutes><SpecialProduct /></ProtectedRoutes> },
        { path: 'brands', element: <ProtectedRoutes><Brands /></ProtectedRoutes> },
        { path: 'cart', element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
        { path: 'wishlist', element: <ProtectedRoutes><Wishlist /></ProtectedRoutes> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <Signup /> },
        { path: 'forgot-password', element: <ForgotPassword /> },
      ],
    },
    {
      path: 'admin',
      element:<ProtectedRoutes><AdminLayout /></ProtectedRoutes>,
      children: [
        { index: true, element: <ProtectedRoutes><EditMainSlider /></ProtectedRoutes> },
        // { path: 'dashboard', element: <ProtectedRoutes><AdminDashboard /></ProtectedRoutes> },
        { path: 'editSlider', element: <ProtectedRoutes><EditMainSlider /></ProtectedRoutes> },
        { path: 'products', element: <ProtectedRoutes><ProductsAdmin /></ProtectedRoutes> },
        { path: 'addOffers', element: <ProtectedRoutes><AddOffers /></ProtectedRoutes> },
        { path: 'housewares', element: <ProtectedRoutes><HousewaresAdmin /></ProtectedRoutes> },
        { path: 'cookware', element: <ProtectedRoutes><CookwareAdmin /></ProtectedRoutes> },
        { path: 'discount', element: <ProtectedRoutes><DiscountManager /></ProtectedRoutes> },
        { path: 'addProduct', element: <ProtectedRoutes><AddProduct /></ProtectedRoutes> },
        { path: 'editProduct', element: <ProtectedRoutes><EditProduct /></ProtectedRoutes> },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;