import * as yup from "yup"

export const registerSchema = yup
    .object({
    name: yup.string().required("Name is Required!").min(3,"Full Name must be at-least 3 characters"),
    email: yup.string().required("Email Address is Required!").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Email Address is not Valid"),
    password: yup.string().required("Password is Required!").min(6,"Password must be at-least 6 characters"),
    passwordConfirm: yup.string().required("Password is Required!").oneOf([yup.ref('password')], "Password confirmation is incorrect"),
    phone:yup.string().required("Phone Number is Required!").matches(/^\d+$/, "accept only egypt phone numbers")
    .length(11, "Phone Number must be exactly 11 digits"),
    })
    .required()

export const loginSchema = yup
    .object({
    email: yup.string().required("Email Address is Required!").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Email Address is not Valid"),
    password: yup.string().required("Password is Required!").min(6,"Password must be at-least 6 characters"),
    })
    .required()

    export const forgotPassSchema = yup
    .object({
    email: yup.string().required("Email Address is Required!").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Email Address is not Valid"),
    })
    .required()


   export const resetCodeSchema = yup
  .object({
    resetCode: yup
      .string()
      .required("Reset code is required!")
      .matches(/^\d{6}$/, "Reset code must be exactly 6 digits"),
  })
  .required();

     export const resetPassSchema = yup
  .object({
     email: yup.string().required("Email Address is Required!").matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Email Address is not Valid"),
    newPassword: yup.string().required("Password is Required!").min(6,"Password must be at-least 6 characters"),
  })
  .required();

  export const updateUserDataSchema = yup.object().shape({
      name: yup.string().required("Name is Required!").min(3,"Full Name must be at-least 3 characters"),
       phone:yup.string().required("Phone Number is Required!").matches(/^\d+$/, "accept only egypt phone numbers")
    .length(11, "Phone Number must be exactly 11 digits"),
    email: yup.string().matches(/^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,"Email Address is not Valid").optional()

  })
    

    export const updatePassSchema = yup
    .object({
    currentPassword: yup.string().required("Current password is Required!"),
    password: yup.string().required("Password is Required!").min(6,"Password must be at-least 6 characters"),
    passwordConfirm: yup.string().required("Password is Required!").oneOf([yup.ref('password')], "Password confirmation is incorrect"),

    })
    .required()

  

  export const addProductSchema = yup.object().shape({
  title: yup
    .string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: yup
    .string()
    .required("Product description is required")
    .max(2000, "Description must be less than 2000 characters"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than zero")
    .max(999999, "Price is too large"),

  priceAfterDiscount: yup
  .number()
  .typeError("Discount price must be a number")
  .transform((value, originalValue) =>
    String(originalValue).trim() === "" ? null : value
  )
  .nullable()
  .optional()
  .max(yup.ref("price"), "Discount price can't be greater than price")
  .min(0, "Discount price cannot be negative"),


  availableColors: yup.array().of(yup.string().trim()).optional(),

  category: yup.string().required("Category is required"),

  subcategory: yup.array().of(yup.string()).optional(),

  brand: yup.string().nullable().optional(),

  images: yup
    .array()
    .of(
      yup.mixed<File>().test(
        "fileType",
        "Only image files are allowed",
        (file) => {
          if (!file) return true;
          return ["image/jpeg", "image/png", "image/webp"].includes(
            (file as File).type
          );
        }
      )
    )
    .min(1, "At least one image is required")
    .max(5, "You can upload up to 5 images only"),
});


export const editProductSchema = yup.object().shape({
  title: yup
    .string()
    .required("Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),

  description: yup
    .string()
    .required("Product description is required")
    .max(2000, "Description must be less than 2000 characters"),

  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .integer("Quantity must be an integer")
    .min(0, "Quantity cannot be negative"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required")
    .positive("Price must be greater than zero")
    .max(999999, "Price is too large"),

  priceAfterDiscount: yup
    .number()
    .typeError("Discount price must be a number")
    .transform((value, originalValue) =>
      String(originalValue).trim() === "" ? null : value
    )
    .nullable()
    .optional()
    .max(yup.ref("price"), "Discount price can't be greater than price")
    .min(0, "Discount price cannot be negative"),

  availableColors: yup.array().of(yup.string().trim()).optional(),

  category: yup.string().required("Category is required"),

  subcategory: yup.array().of(yup.string()).optional(),

  brand: yup.string().nullable().optional(),

  images: yup
    .array()
    .of(
      yup
        .mixed<File | string>()
        .test("fileOrUrl", "Invalid image format", (value) => {
          if (!value) return false;
          if (typeof value === "string") return true;
          if (value instanceof File) {
            return ["image/jpeg", "image/png", "image/webp"].includes(
              value.type
            );
          }
          return false;
        })
    )
    .min(1, "At least one image is required")
    .max(5, "You can upload up to 5 images only"),
});



export const addSectionSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters")
    .max(32, "Name must be less than 32 characters"),

  image: yup
    .mixed<File>()
    .required("image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      const file = value as File;
      if (!file) return false;
      return file.type.startsWith("image/");
    })
    .test("fileSize", "Image must be less than 5 MB", (value) => {
      const file = value as File;
      if (!file) return false;
      return file.size <= 5 * 1024 * 1024;
    }),
});


export const editSectionSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  image: yup
    .mixed()
    .nullable()
    .notRequired()
    .test("fileType", "Only image files are allowed", function (value) {
      if (!value) return true;
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return ["image/jpeg", "image/png", "image/jpg", "image/gif", "image/webp", "image/svg+xml"].includes(
          value.type
        );
      }
      
      return true;
    })
    .test("fileSize", "File size must be less than 5MB", function (value) {
      if (!value) return true;
      if (typeof value === "string") return true;
      if (value instanceof File) {
        return value.size <= 5 * 1024 * 1024; 
      }
      return true;
    }),
});

export const addSubCategorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Subcategory name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),

  category: yup
    .string()
    .required("You must select a category"),
});



export const couponSchema = yup.object({
  name: yup
    .string()
    .required("Coupon name is required")
    .min(3, "Name must be at least 3 characters"),

  expire: yup
    .date()
    .typeError("Expire must be a valid date")
    .required("Expire date is required")
    .test("is-future-date", "Expire date must be in the future", (value) => {
      if (!value) return false;
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return value > today;
    }),

  discount: yup
    .number()
    .transform(( originalValue) => {
      if (originalValue === "" || isNaN(originalValue)) return undefined;
      return Number(originalValue);
    })
    .typeError("Discount must be a number")
    .required("Discount is required")
    .min(1, "Discount must be at least 1%")
    .max(100, "Discount can't exceed 100%"),
});

export const addressSchema = yup.object({
  alias: yup
    .string()
    .required("Alias is required")
    .min(2, "Alias must be at least 2 characters"),

  details: yup
    .string()
    .required("Details are required")
    .min(5, "Details must be at least 5 characters"),

  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d+$/, "Phone must contain only digits")
    .length(11, "Phone must be exactly 11 digits"),

  city: yup
    .string()
    .required("City is required")
    .min(2, "City must be at least 2 characters"),
});

export const editSubCategorySchema = yup.object().shape({
  name: yup
    .string()
    .required("Subcategory name is required")
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters"),
});
