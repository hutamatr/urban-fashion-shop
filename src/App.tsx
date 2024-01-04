import { Route, Routes } from 'react-router-dom';

import RequireAuth from '@components/Auth/RequireAuth';
import Layout from '@components/Layout/Layout';
import Wishlist from '@components/Wishlist/Wishlist';

import Cart from '@pages/CartPage';
import Home from '@pages/HomePage';
import MyAccount from '@pages/MyAccountPage';
import ProductDetails from '@pages/ProductDetailsPage';
import Shop from '@pages/ProductPage';
import ResetPassword from '@pages/ResetPasswordPage';
import SignIn from '@pages/SignInPage';
import SignUp from '@pages/SignUpPage';

import { useAppSelector } from '@store/store';

export default function App() {
  const isAuth = useAppSelector((state) => state.auth.isAuth);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='shop' element={<Shop />} />
        <Route path='shop/:productId' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='signin' element={isAuth ? <Home /> : <SignIn />} />
        <Route path='signup' element={isAuth ? <Home /> : <SignUp />} />
        <Route element={<RequireAuth />}>
          <Route path='account' element={<MyAccount />} />
          <Route path='wishlist' element={<Wishlist />} />
        </Route>
      </Route>
      <Route path='reset-password/:id/:token' element={<ResetPassword />} />
    </Routes>
  );
}
