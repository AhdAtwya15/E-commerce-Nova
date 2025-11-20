import type { ComponentType, ReactNode } from "react";

export interface INavPages {
    text: string;
    path: string;
    importFn: () => Promise<{ default: ComponentType }>;
}

export interface IPagination {
    currentPage: number,
    numberOfPages: number,
}

export interface IPagination {
    currentPage: number,
    numberOfPages: number,
}
export interface IRequest {
  name: string;
  image: File|null|string; 
}
export interface IEditRequest {
  name: string;
  image: File |null|string; 
}

// Auth Interface

export interface IRegForm {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;
    phone: string;

}

export interface IUser {
  _id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  password: string;
  role: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IAuthResponse {
  data: IUser;
  token: string;
}

export interface ILoginForm {
    email: string;
    password: string;
}

export interface IForgotPass {
    email: string;
    
}

export interface IForgotPassResponse {
  status: string;
  message: string;
}


export interface IResetCode {
    resetCode:string
    
}

export interface IResetPassForm {
    email: string;
    newPassword: string;
}

export interface IResetPassResponse {
    token:string;
}





// Category Interfaces
export interface ICategory {
    _id: string;
    name: string;
    slug?: string;
    image: string;
}

export interface ICategoryData {
    results?:number;
    data: ICategory[];
    paginationResult: IPagination;
}
export interface ICategoryResponse {
    data: ICategory;
}

//SubCategory Interfaces

export interface ISubCategoryRequest {
  name: string;
  category: string;
}
export interface IEditSubCategory{
  name: string;
  
}

export interface ISubCategory {
    _id:string
    name: string;
    slug: string;
    category: string;
}
export interface ISubCategoryResponse {
    data: ISubCategory;
}



export interface ISubCategoryData {
    results?:number;
    data: ISubCategory[];
    paginationResult: IPagination;
}

// Brand Interfaces
export interface IBrand {
    _id: string;
    name: string;
    slug?: string;
    image: string;
}

export interface IBrandData {
    results?:number;
    data: IBrand[];
    paginationResult: IPagination;
}

export interface IBrandResponse {
    data: IBrand;
}

//SubOnCategory Interfaces

export interface ISubOnCategoryReq {
    name: string;
}
export interface ISubOnCategory {
    data: ISubCategory[];
    paginationResult: IPagination;
}

// Product Interfaces

export interface IProduct {
  _id: string
  title: string;
  slug?: string;
  description: string;
  quantity?: number;
  sold?: number;
  price: number;
  priceAfterDiscount?: number;
  availableColors?: string[];
  imageCover: string;
  images?: string[];
  category: string;
  subcategory?:  string[];
  brand?:  string;
 
  ratingsAverage?: number;
  ratingsQuantity?: number;
}

export interface IProductResponse {
    data: IProduct;
}


export interface IProductData {
    results?:number;
    data: IProduct[];
    paginationResult?: IPagination;
}

export interface IData {
    data: IProduct[];

}


export interface ICounter {
    icon: ReactNode,
    number: string,
    description: string,


}
export interface IBrands {
    imgSrc: string;
}


export interface IRateSummary {
    averageRating: number;
    totalReviews: number;
    ratingDistribution: {
        [key: number]: number;
    };
}

export interface IFilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface IFilterSection {
  title: string;
  options: IFilterOption[];
  type: 'checkbox' | 'radio' | 'range';
  isOpen?: boolean;
}

export interface IAdminDashboard {
    sectionName: string;
    path: string;
    importFn: () => Promise<{ default: ComponentType }>;
  }

//params interface

export interface IParams {
  limit?: number;
  page?: number;
  sort?: string;
  keyword?: string;
  "price[gte]"?: number;
  "price[lte]"?: number;
  "ratingsQuantity[gte]"?: number;
  "ratingsQuantity[lte]"?: number;
  "brand[in][]"?: string[];
  "category[in][]"?: string[];
    [key: string]: unknown;
}

// Wishlist Interfaces

export interface IWishlistAdd
{
    productId: string
}

// Cart Interfaces


export interface ICartProduct {
  _id: string;
  title: string;
  imageCover: string;
  category?: {
    name: string;
  };
  id: string;
}


export interface ICartProductItem {
  product: ICartProduct;
  count: number;
  color: string;
  price: number;
  _id: string;
}

export interface ICartData {
  _id: string;
  products: ICartProductItem[];
  cartOwner: string;
  createdAt: string;
  updatedAt: string;
  totalCartPrice: number;
  totalAfterDiscount:number
}


 export interface ICartResponse {
  status: string;
  numOfCartItems: number;
  data: ICartData;
}


 export interface IAddToCart {
  productId: string;
    color: string;
}

export interface IUpdateQuantityCart {
 count:string
}

export interface IApplyCoupon {
 couponName:string
}
// Review Interfaces

export interface IUserDetails {
  _id: string;
  name: string;
}



export interface IReview {
  _id: string;
  review: string;
  rating: number;
  user: IUserDetails|string;
  product: string;
  createdAt?:string

}

export interface IReviewsResponse {
  results: number;
  paginationResult: IPagination;
  data: IReview[];
}

// Logged User Interfaces

export interface ILoggedUser {
  _id: string;
  name: string;
  slug: string;
  email: string;
  phone: string;
  password: string;
  role: "user" | "admin"; 
  active: boolean;
  wishlist?: string[];     
  addresses?: string[];  
  createdAt?: string;
  updatedAt?: string;
}

export interface ILoggedUserResponse {
  data: ILoggedUser;
}

export interface IUpdatePassword {
  currentPassword: string;
  password: string;
  passwordConfirm: string;
}
export interface IUpdateProfileData {
  name: string;
  phone: string;
  email?:string|undefined;
}

// Coupons interface

export interface ICoupon {
  _id: string;
  name: string;
  expire: string; 
  discount: number;
  createdAt?: string;
  updatedAt?: string;
  
}
export interface ICouponData {
  results: number;
  paginationResult:IPagination;
  data: ICoupon[];
}

export interface ICouponResponse {
  data: ICoupon;
}

// Addresses Interfaces

export interface IAddress {
  _id: string;
  alias: string;
  details: string;
  phone: string;
  city: string;
  
}

export interface IAddressResponse {
  results: number;
  status: string;
  data: IAddress[];
}

export interface IAddOrUpdateAddressPayload {
  alias: string;
  details: string;
  phone: string;
  city: string;
}

// Orders Interfaces

export interface IShippingAddress {
  details: string;
  phone: string;
  city: string;

}

export interface IOrderBody {
  shippingAddress: IShippingAddress;

}

export interface IOrder {
  _id: string;
  user:Partial <IUser>;
  shippingAddress?: IShippingAddress;
  cartItems: ICartProductItem[];
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
}

export interface IResOrder
{
  data:IOrder
}

export interface IOrdersResponse {
  results: number;
  paginationResult:IPagination
  data: IOrder[];
}

export interface ICheckoutSession{
  session:{
    url:string
  }

}

//filter interfaces

export interface FilterState {
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
  priceRange: [number, number];
  sort: string;
  activeCategory: string;
  page: number;
    keyword: string;
}

