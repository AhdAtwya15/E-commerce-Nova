import { useEffect, useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import ManageTitle from "../ManageTitle";
import Button from "../../UI/Button";
import { useGetProductByIdQuery, useUpdatProductMutation } from "../../../app/Features/productApi";
import { useGetCategoriesQuery, useGetCategoryByIdQuery } from "../../../app/Features/categoriesApi";
import { useGetBrandByIdQuery, useGetBrandsQuery } from "../../../app/Features/brandsApi";
import { IoMdCloseCircle } from "react-icons/io";
import type { ISubCategory } from "../../../Interfaces";
import { useGetAllSubOnByIdQuery } from "../../../app/Features/subOnCategoryApi";
import { useGetSubCategoriesQuery } from "../../../app/Features/subCategoriesApi";
import { useNavigate, useParams } from "react-router-dom";
import { PRODUCT_COLORS } from "../../../Constants/colors";
import { yupResolver } from "@hookform/resolvers/yup";
import { editProductSchema } from "../../../Validation";
import InputsErrMsg from "../../UI/InputsErrMsg";
import useNotification from "../../../hook/useNotification";







interface IProductForm {
    title: string;
    description: string;
    priceAfterDiscount: number;
    price: number;
    quantity: number;
    category: string;
    subcategory: string[];
    brand: string;
    availableColors: string[];
    images: (File | string)[];
}



const EditProductSection = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [mainCategoryOpen, setMainCategoryOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [selectedMainCategory, setSelectedMainCategory] = useState("Select Main Category");
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedSubCategoriesArray, setSelectedSubCategoriesArray] = useState<ISubCategory[]>([]);
    const [selectedBrand, setSelectedBrand] = useState("Select Brand");
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [currentProductImages, setCurrentProductImages] = useState<string[]>([]);
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
        const brandDropdownRef = useRef<HTMLDivElement>(null);
        const subCategoryDropdownRef = useRef<HTMLDivElement>(null);
        const notify = useNotification


    const navigate=useNavigate();
    const { id } = useParams()

    const { data: oneProductData } = useGetProductByIdQuery(id!)
    const product = oneProductData?.data
    const catId = product?.category
    const brandId = product?.brand



    const { data: getOneCat } = useGetCategoryByIdQuery(catId!, { skip: !catId });
    const catName = getOneCat?.data.name


    const { data: getOneBrand } = useGetBrandByIdQuery(brandId!, { skip: !brandId });
    const brandName = getOneBrand?.data.name





    const { data: getCategoriesData } = useGetCategoriesQuery()
    const categoriesData = getCategoriesData?.data ?? [];
   


    const { data: getBrandsData } = useGetBrandsQuery()
    const brandsData = getBrandsData?.data ?? [];
   

    const [updateProduct] = useUpdatProductMutation()

     useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      categoryDropdownRef.current &&
      !categoryDropdownRef.current.contains(event.target as Node)
    ) {
      setMainCategoryOpen(false);
    }
 if (
      brandDropdownRef.current &&
      !brandDropdownRef.current.contains(event.target as Node)
    ) {
      setBrandOpen(false);
    }
     if (
      subCategoryDropdownRef.current &&
      !subCategoryDropdownRef.current.contains(event.target as Node)
    ) {
      setSubCategoryOpen(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: { errors }
    } =useForm<IProductForm>({
               resolver: yupResolver(editProductSchema) as Resolver<IProductForm>,
                
            });

    const images = watch("images") || [];

    useEffect(() => {
        if (product) {
            const allImages: string[] = [];
            if (product.imageCover) allImages.push(product.imageCover);
            if (product.images && product.images.length > 0) {
                allImages.push(...product.images);
            }
            setCurrentProductImages(allImages);
            setValue("images", allImages);
        }
    }, [product, setValue]);



    const handleBrowse = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const currentImages = watch("images") || [];

        const merged = [...currentImages, ...selectedFiles];

        if (merged.length > 5) {
            alert("You can upload a maximum of 5 images only.");
            setValue("images", merged.slice(0, 5));
        } else {
            setValue("images", merged);
        }

        if (e.target) e.target.value = "";
    };


    const removeImage = (indexToRemove: number) => {
        const currentImages = watch("images") || [];
        const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
        setValue("images", updated);
    };


    const { data: allSubCategoriesData } = useGetSubCategoriesQuery();
    const allSubCategories = useMemo(() => allSubCategoriesData?.data ?? [], [allSubCategoriesData]);

    useEffect(() => {
        if (product) {
            const catId = product.category;
            const brandId = product.brand;

            setValue("title", product.title);
            setValue("description", product.description);
            setValue("priceAfterDiscount", product.priceAfterDiscount || 0);
            setValue("price", product.price || 0);
            setValue("quantity", product.quantity || 0);
            if (catId) setValue("category", catId);
            if (brandId) setValue("brand", brandId);
            setValue("subcategory", product.subcategory || []);
            setValue("availableColors", product.availableColors || []);

            setSelectedSubCategories(product.subcategory || []);
            setValue("subcategory", product.subcategory || []);

            if (catName) setSelectedMainCategory(catName);
            if (brandName) setSelectedBrand(brandName);
            setSelectedColors(product.availableColors || []);
        }
    }, [product, catName, brandName, setValue]);

    useEffect(() => {
        if (product && allSubCategories.length > 0) {
            const subCategoryIds = product.subcategory || [];
            const selectedSubCategories = allSubCategories.filter(subCat =>
                subCategoryIds.includes(subCat._id)
            );

            if (selectedSubCategories.length > 0) {
                setSelectedSubCategoriesArray(selectedSubCategories);
            }
        }
    }, [product, allSubCategories]);

    const handleMainCategorySelect = (id: string, name: string) => {
        setSelectedMainCategory(name);
        setValue("category", id);
        setMainCategoryOpen(false);
    };
    const categoryId = getValues("category")


    const { data: getSubOnCategoriesData } = useGetAllSubOnByIdQuery(categoryId)
    const subOnCategoriesData = getSubOnCategoriesData?.data ?? [];
  

    const handleSubCategorySelect = (category: ISubCategory) => {

        if (!selectedSubCategoriesArray.includes(category)) {
            const updatedSubCategories = [...selectedSubCategoriesArray, category];
            setSelectedSubCategoriesArray(updatedSubCategories);
            const updatedSubCategoriesIds = updatedSubCategories.map(subCat => subCat._id);
            setSelectedSubCategories(updatedSubCategoriesIds);
            setValue("subcategory", updatedSubCategoriesIds);
        }
        setSubCategoryOpen(false);
    };



    const removeSubCategory = (categoryIdToRemove: string) => {
        const updatedSubCategories = selectedSubCategories.filter(id => id !== categoryIdToRemove);
        const updatedSubCategoriesArray = selectedSubCategoriesArray.filter(sub => sub._id !== categoryIdToRemove);

        setSelectedSubCategories(updatedSubCategories);
        setSelectedSubCategoriesArray(updatedSubCategoriesArray);
        setValue("subcategory", updatedSubCategories);
    };


    const handleBrandSelect = (id: string, name: string) => {
        setSelectedBrand(name);
        setValue("brand", id);
        setBrandOpen(false);
    };

    const addColor = (color: string) => {
        if (color && !selectedColors.includes(color)) {
            const updatedColors = [...selectedColors, color];
            setSelectedColors(updatedColors);
            setValue("availableColors", updatedColors);
        }
    };

    const removeColor = (colorToRemove: string) => {
        const updatedColors = selectedColors.filter(color => color !== colorToRemove);
        setSelectedColors(updatedColors);
        setValue("availableColors", updatedColors);
    };

    const getColorValue = (colorName: string): string => {
     const color = PRODUCT_COLORS.find(
       (c) => c.name.toLowerCase() === colorName.toLowerCase()
     );
     return color ? color.value : colorName;
   };
    const onSubmit: SubmitHandler<IProductForm> = async (values) => {
     
        setIsLoading(true);
        try {
            const formData = new FormData();

           
            const finalFiles: File[] = await Promise.all(
                values.images.map(async (img, index) => {
                    if (img instanceof File) {
                        return img;
                    } else {
                        
                        const response = await fetch(img);
                        if (!response.ok) throw new Error(`Failed to fetch image: ${img}`);
                        const blob = await response.blob();
                        return new File([blob], `existing_image_${index}_${Date.now()}.${blob.type.split('/')[1]}`, { type: blob.type });
                    }
                })
            );

           
            if (finalFiles.length > 0) {
                formData.append("imageCover", finalFiles[0]);
                finalFiles.slice(1).forEach((file) => {
                    formData.append("images", file);
                });
            }

            if (values.title) formData.append("title", values.title);
            if (values.description) formData.append("description", values.description);
            if (values.priceAfterDiscount) formData.append("priceAfterDiscount", values.priceAfterDiscount.toString());
            if (values.price) formData.append("price", values.price.toString());
            if (values.quantity !== undefined) formData.append("quantity", values.quantity.toString());
            if (values.category) formData.append("category", values.category);
            
            if (values.subcategory && Array.isArray(values.subcategory)) {
                values.subcategory.forEach((id) => formData.append("subcategory", id));
            }
            if (values.brand) formData.append("brand", values.brand);
            if (values.availableColors && values.availableColors.length > 0) {
                values.availableColors.forEach((color) => formData.append("availableColors", color));
            }
            formData.append("slug", values.title.toLowerCase().replace(/\s+/g, "-"));


            await updateProduct({ id: id!, data: formData }).unwrap();
            notify("Product Updated successfully", "success")
            navigate('/admin')
          
        } catch {
            notify("Failed to update product", "success")
           
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full font-roobert space-y-6">
            <ManageTitle title="Edit Product" name={product?.title} />

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>

                <motion.div
                    className="relative flex flex-col gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="text-sm text-gray-400">
                       {images.length===0?" Upload Product Images":images.length<5?"Click to add more images":""} 
                        </span>
                    <div
                        className="w-[260px] h-[180px] rounded-xl border border-gray-300 bg-white flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition"
                        onClick={handleBrowse}
                    >
                        {images.length > 0 ? (
                            <img
                                src={typeof images[0] === "string" ? images[0] : URL.createObjectURL(images[0])}
                                alt={product?.slug}
                                className="w-full h-full object-cover rounded-xl"
                            />
                        ) : (
                            <>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 23 23"
                                    fill="currentColor"
                                    className="size-10 text-gray-400"
                                >
                                    <path d="M19.5 6h-15A1.5 1.5 0 003 7.5v9A1.5 1.5 0 003.5 18h15a1.5 1.5 0 001.5-1.5v-9A1.5 1.5 0 0019.5 6zm-9 9l2.25-3 3 3.5h-9l2.25-3zM9 9.75a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
                                </svg>
                                <span className="text-xs text-gray-500">Click to upload</span>
                            </>
                        )}

                    </div>
                    {images.length > 0 && (
                        <div className="mt-3 flex gap-5 flex-wrap">
                            {images.map((img, idx) => {
                                const src = typeof img === "string" ? img : URL.createObjectURL(img);
                                const isCurrentImage = currentProductImages.includes(typeof img === "string" ? img : src);

                                return (
                                    <div key={idx} className="relative group">
                                        <img
                                            src={src}
                                            alt={`image-${idx}`}
                                            className={`w-20 h-20 object-cover rounded-lg border-2 ${isCurrentImage
                                                ? 'border-blue-400'
                                                : 'border-[#3B8D90]'
                                                }`}
                                        />

                                      
                                        <div className="absolute -top-1 -left-1 bg-blue-500 text-white text-xs px-1 rounded">
                                            {isCurrentImage ? 'Current' : 'New'}
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeImage(idx)}
                                            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                            aria-label="Remove image"
                                        >
                                            <IoMdCloseCircle className="text-[#E8765E] hover:text-[#9E3A38] text-lg bg-white rounded-full" />
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        onClick={(e) => {
                            if (images.length >= 5) {
                                e.preventDefault();
                                alert("You already have 5 images uploaded.");
                            }
                        }}
                    />


                                     {errors["images"] && (
                                                    <motion.div
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.3 }}
                                                        className="mt-2"
                                                    >
                                                        <InputsErrMsg msg={errors["images"]?.message} />
                                                    </motion.div>
                                                )}
                </motion.div>



                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <input
                        type="text"
                        placeholder="Product Name"
                        {...register("title")}
                        className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
                    />
                     {errors["title"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["title"]?.message} />
                                </motion.div>
                            )}
                </motion.div>


                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <textarea
                        placeholder="Product Description"
                        rows={3}
                        {...register("description")}
                        className="w-full px-3 py-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] resize-none"
                    />
                     {errors["description"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["description"]?.message} />
                                </motion.div>
                            )}
                </motion.div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <input
                            type="number"
                            placeholder="Price After Discount"
                            step="0.01"
                            {...register("priceAfterDiscount")}
                            className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
                        />
                          {errors["priceAfterDiscount"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["priceAfterDiscount"]?.message} />
                                </motion.div>
                            )}
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <input
                            type="number"
                            placeholder="Product Price"
                            step="0.01"
                            {...register("price")}
                            className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
                        />
                         {errors["price"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["price"]?.message} />
                                </motion.div>
                            )}
                    </motion.div>

                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <input
                            type="number"
                            min={0}
                            placeholder="Quantity"
                            {...register("quantity")}
                            className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
                        />
                        {errors["quantity"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["quantity"]?.message} />
                                </motion.div>
                            )}
                    </motion.div>
                </div>

                <motion.div
                ref={categoryDropdownRef}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                >
                                        <input type="hidden" {...register("category")} />
                    <button
                        onClick={() => setMainCategoryOpen(!mainCategoryOpen)}
                        className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] text-left flex justify-between items-center"
                        type="button"
                    >
                        {selectedMainCategory}
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 3 3 3-3"
                            />
                        </svg>
                    </button>

                    {mainCategoryOpen && (
                        <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200">
                            <ul className="py-2 text-sm text-gray-700">

                                {categoriesData?.map((category) => (
                                    <li key={category._id}>
                                        <button
                                            onClick={() => handleMainCategorySelect(category._id, category.name)}
                                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                        >
                                            {category.name}
                                        </button>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    )}

                    {errors["category"] && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-2"
    >
      <InputsErrMsg msg={errors["category"]?.message} />
    </motion.div>
  )}
                </motion.div>


                <motion.div
                ref={subCategoryDropdownRef}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
            
                    {selectedSubCategoriesArray.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            {selectedSubCategoriesArray.map((category) => (
                                <div
                                    key={category._id}
                                    className="flex items-center gap-1 bg-[#3B8D90] text-white px-3 py-1 rounded-full text-sm"
                                >
                                    <span>{category.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => removeSubCategory(category._id)}
                                        className="text-white hover:text-red-200 ml-1"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                   
                      <button
    onClick={() => setSubCategoryOpen(!subCategoryOpen)}
    type="button"
    disabled={!subOnCategoriesData || subOnCategoriesData.length === 0}
    className={`w-full h-12 px-3 rounded-xl border border-[#3B8D90] bg-white text-gray-800 text-left flex justify-between items-center transition ${
      (!subOnCategoriesData || subOnCategoriesData.length === 0)
        ? "opacity-60 cursor-not-allowed"
        : "hover:bg-gray-50 focus:ring-1 focus:ring-[#3B8D90]"
    }`}
  >
    {selectedSubCategories.length === 0
      ? "Select Sub Categories"
      : "Add More Sub Categories"}
    <svg
      className="w-2.5 h-2.5"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m1 1 3 3 3-3"
      />
    </svg>
  </button>


  {subCategoryOpen &&
    subOnCategoriesData &&
    subOnCategoriesData.length > 0 && (
      <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200">
        <ul className="py-2 text-sm text-gray-700">
          {subOnCategoriesData.map((subCategory) => (
            <li key={subCategory._id}>
              <button
                onClick={() => handleSubCategorySelect(subCategory)}
                className="block w-full text-left px-3 py-2 hover:bg-gray-100"
              >
                {subCategory.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )}


  {(!subOnCategoriesData || subOnCategoriesData.length === 0) && (
    <p className="text-sm text-gray-500 mt-2 italic">
      No subcategories available for this category
    </p>
  )}
                </motion.div>

                
                <motion.div
                ref={brandDropdownRef}
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                >
                    <button
                        onClick={() => setBrandOpen(!brandOpen)}
                        className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] text-left flex justify-between items-center"
                        type="button"
                    >
                        {selectedBrand}
                        <svg
                            className="w-2.5 h-2.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 10 6"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 3 3 3-3"
                            />
                        </svg>
                    </button>

                    {brandOpen && (
                        <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200">
                            <ul className="py-2 text-sm text-gray-700">

                                {brandsData?.map((brand) => (
                                    <li key={brand._id}>
                                        <button
                                            onClick={() => handleBrandSelect(brand._id, brand.name)}
                                            className="block w-full text-left px-3 py-2 hover:bg-gray-100"
                                        >
                                            {brand.name}
                                        </button>
                                    </li>
                                ))

                                }

                            </ul>
                        </div>
                    )}
                </motion.div>


                <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                >
                    <span className="text-sm text-gray-400 mb-3 block">Available Colors for the Product</span>


                    <div className="flex gap-3 items-center">

                        <button
                            type="button"
                            onClick={() => setShowColorPicker(!showColorPicker)}
                            className="w-12 h-12 rounded-full border-1 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition"
                        >
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 23 23"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v16m8-8H3" />
                            </svg>
                        </button>




                        {selectedColors.map((color, index) => (
                            <div
                                key={index}
                                className="relative group"
                            >
                                <div
                                    className="w-12 h-12 rounded-full border-1 border-gray-300 cursor-pointer hover:scale-110 transition-transform"
                                    style={{ backgroundColor: getColorValue(color) }}
                                    title={color}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeColor(color)}
                                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>

                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-2 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                            <div className="grid grid-cols-6 gap-2">
                                {PRODUCT_COLORS.map((color) => (
                                    <button
                                        key={color.name}
                                        type="button"
                                        onClick={() => {
                                            addColor(color.name);
                                            setShowColorPicker(false);
                                        }}
                                        className="w-8 h-8 rounded-full border border-gray-300 hover:scale-110 transition-transform"
                                        style={{ backgroundColor: color.value }}
                                        title={color.name}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </motion.div>


                <motion.div
                    className="relative w-38"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                >
                    <Button className="whitespace-nowrap" variant="addBtn" size="md" type="submit" isLoading={isLoading}>
                        Save Changes
                    </Button>
                </motion.div>
            </form>
        </div>
    );
};

export default EditProductSection;






