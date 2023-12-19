// Authentication

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  confirmPassword: string;
}

export interface ISignOut {
  sign_out: string;
  message: string;
}

export interface IRefreshToken {
  access_token: string;
}

export interface IUser {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  // username: string;
  // confirmed: boolean;
  // address: string;
  // phone_number: string;
}

export interface IUserUpdate {
  username: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface IChangePassword {
  password: string;
  currentPassword: string;
  passwordConfirmation: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IAccount {
  access_token: string;
  message: string;
  user: IUser;
}

// Products

export interface IProduct extends IProductCart {
  category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  category: ICategory;
}

export interface IProductsMeta {
  total?: number;
  skip?: number;
  limit?: number;
}

export interface IProductsData extends IProductsMeta {
  products: IProduct[];
}

export interface IProductData {
  product: IProduct;
}

// Categories

export interface ICategory {
  id: number;
  category_name: string;
  created_at?: string;
  updated_at?: string;
}

export interface ICategoriesData {
  categories: ICategory[];
}

// Carts

export interface IProductCart extends ICartItem {
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

export interface ICartResponse {
  message: string;
}

export interface ICartData {
  cart: {
    id: number;
    user_id: number;
    total_price: number;
    products: IProductCart[];
  };
  total_quantity: number;
  total_products: number;
}

export interface INewProductToCart {
  quantity: number;
  product: IProductCart;
}

// Order

export interface IOrder {
  user_id: number;
  email: string;
  total_price: number;
  products_list: IProductsOrder[];
}

export interface IProductsOrder {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Error

export interface IError {
  error: boolean;
  statusCode: number;
  message: string[];
}

// Wishlist

export interface IWishlist extends IWishlistPost {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  product: IProduct;
}

export interface IWishlistPost {
  product_id: number;
}

export interface IWishlistData {
  wishlists: IWishlist[];
}

export interface IWishlistResponse {
  message: string;
  wishlist?: IWishlist;
}
