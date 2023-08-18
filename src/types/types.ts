export interface IAuth {
  accessToken: string | null;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IRegister extends ILogin {
  username: string;
}

export interface IRefreshToken {
  jwt: string;
  refreshToken: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  address: string;
  phone_number: string;
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
  jwt: string;
  refreshToken: string;
  user: IUser;
}

export interface IImage {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: {
        name: string;
        hash: string;
        ext: string;
        mime: string;
        path: string | null;
        width: number;
        height: number;
        size: number;
        url: string;
      };
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ICategory {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface IProduct {
  id: number;
  attributes: {
    name: string;
    description: string;
    price: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    images: {
      data: IImage[];
    };
    category: {
      data: ICategory;
    };
  };
}

interface IAllProductsMeta {
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IProductsData extends IAllProductsMeta {
  data: IProduct[];
}

export interface IProductData extends IAllProductsMeta {
  data: IProduct;
}

export interface ICategoriesData extends IAllProductsMeta {
  data: ICategory[];
}

export interface INewProductToCart {
  quantity: number;
  product: IProduct;
}

export interface IProductsOrder {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface IOrder {
  user_id: number;
  email: string;
  total_price: number;
  products_list: IProductsOrder[];
}
