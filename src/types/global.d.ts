/// <reference types="vite/client" />

export {};

declare global {
  /**
   * Now declare things that go in the global namespace,
   * or augment existing declarations in the global namespace.
   */

  interface ILogin {
    email: string;
    password: string;
  }

  interface IRegister extends ILogin {
    confirmPassword: string;
  }

  interface ISignOut {
    sign_out: string;
    message: string;
  }

  interface IRefreshToken {
    access_token: string;
  }

  interface IUser {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    address: string;
    phone_number: string;
    role: {
      id: number;
      role_name: string;
    };
    created_at: string;
    updated_at: string;
    deleted_at: string;
  }

  interface IUserResponse {
    message: string;
    user: IUser;
  }

  interface IUserUpdate {
    first_name: string;
    last_name: string;
    phone_number: string;
    address: string;
  }

  interface IChangePassword {
    current_password: string;
    new_password: string;
  }

  interface IChangePasswordResponse {
    message: string;
  }

  interface IForgotPassword {
    email: string;
  }

  interface IForgotPasswordResponse {
    message: string;
  }

  interface IResetPassword {
    new_password: string;
    userId: number;
    token: string;
  }

  interface IAccount {
    access_token: string;
    message: string;
    user: IUser;
  }

  interface IProduct extends IProductCart {
    category_id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    category: ICategory;
  }

  interface IProductsMeta {
    total?: number;
    skip?: number;
    limit?: number;
  }

  interface IProductsData extends IProductsMeta {
    products: IProduct[];
  }

  interface IProductData {
    product: IProduct;
  }

  interface ICategory {
    id: number;
    category_name: string;
    created_at?: string;
    updated_at?: string;
  }

  interface ICategoriesData {
    categories: ICategory[];
  }

  interface IProductCart extends ICartItem {
    id: number;
    title: string;
    description: string;
    image_url: string;
    price: number;
    discount_percentage: number;
    discount_price: number;
    stock_quantity: number;
  }

  interface ICartItem {
    cart_item: {
      quantity: number;
    };
  }

  interface ICartResponse {
    message: string;
  }

  interface ICartData {
    cart: {
      id: number;
      user_id: number;
      total_price: number;
      products: IProductCart[];
    };
    total_quantity: number;
    total_products: number;
  }

  interface INewProductToCart {
    quantity: number;
    product: IProductCart;
  }

  interface IOrder {
    user_id: number;
    email: string;
    total_price: number;
    products_list: IProductsOrder[];
  }

  interface IProductsOrder {
    id: number;
    name: string;
    price: number;
    quantity: number;
  }

  interface IError {
    error: boolean;
    statusCode: number;
    message: string[];
  }

  interface IWishlist extends IWishlistPost {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    product: IProduct;
  }

  interface IWishlistPost {
    product_id: number;
  }

  interface IWishlistData {
    wishlists: IWishlist[];
  }

  interface IWishlistResponse {
    message: string;
    wishlist?: IWishlist;
  }
}
