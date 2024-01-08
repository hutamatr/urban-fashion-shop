import { Route, Routes } from 'react-router-dom';

import RequireAuth from '@components/Auth/RequireAuth';
import Layout from '@components/Layout/Layout';

import Cart from '@pages/CartPage/Cart.page';
import Checkout from '@pages/CheckoutPage/Checkout.page';
import Home from '@pages/HomePage/Home.page';
import MyAccount from '@pages/MyAccountPage/MyAccount.page';
import OrderStatus from '@pages/OrderStatusPage/OrderStatus.page';
import ProductDetails from '@pages/ProductDetailsPage/ProductDetail.page';
import Products from '@pages/ProductsPage/Products.page';
import ResetPassword from '@pages/ResetPasswordPage/ResetPassword.page';
import SignIn from '@pages/SignInPage/SignIn.page';
import SignUp from '@pages/SignUpPage/SignUp.page';
import Wishlist from '@pages/WishlistPage/WIshlist.page';

import { useAppSelector } from '@store/store';

export default function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='shop' element={<Products />} />
        <Route path='shop/:productId' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='signin' element={isAuth ? <Home /> : <SignIn />} />
        <Route path='signup' element={isAuth ? <Home /> : <SignUp />} />
        <Route element={<RequireAuth />}>
          <Route path='account' element={<MyAccount />} />
          <Route path='wishlist' element={<Wishlist />} />
          <Route path='checkout' element={<Checkout />} />
          <Route path='order-status' element={<OrderStatus />} />
        </Route>
      </Route>
      <Route path='reset-password/:id/:token' element={<ResetPassword />} />
    </Routes>
  );
}
