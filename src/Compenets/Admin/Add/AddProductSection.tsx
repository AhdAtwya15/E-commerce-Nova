import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { IoMdCloseCircle } from "react-icons/io";
import type { ISubCategory } from "../../../Interfaces";
import { useGetCategoriesQuery } from "../../../app/Features/categoriesApi";
import { useGetBrandsQuery } from "../../../app/Features/brandsApi";
import { useGetAllSubOnByIdQuery } from "../../../app/Features/subOnCategoryApi";
import ManageTitle from "../ManageTitle";
import { useCreateProductMutation } from "../../../app/Features/productApi";
import Button from "../../UI/Button";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../../../Validation";
import InputsErrMsg from "../../UI/InputsErrMsg";
import { PRODUCT_COLORS } from "../../../Constants/colors";

import { useWatch } from "react-hook-form"; 
import useNotification from "../../../hook/useNotification";


export interface IProductForm {
  title: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number | null;
  availableColors?: string[];
  category: string;
  subcategory?: string[];
  brand?: string | null;
  images: File[]; 
}

const AddProductSection = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isCompressing, setIsCompressing] = useState<boolean>(false);
    const [compressionProgress, setCompressionProgress] = useState<number>(0);
    const [mainCategoryOpen, setMainCategoryOpen] = useState(false);
    const [subCategoryOpen, setSubCategoryOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [selectedMainCategory, setSelectedMainCategory] = useState("Select Main Category");
    const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
    const [selectedSubCategoriesArray, setSelectedSubCategoriesArray] = useState<ISubCategory[]>([]);
    const [selectedBrand, setSelectedBrand] = useState("Select Brand");
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [imagePreviewUrls, setImagePreviewUrls] = useState<string[]>([]);
    
    const categoryDropdownRef = useRef<HTMLDivElement>(null);
    const brandDropdownRef = useRef<HTMLDivElement>(null);
    const subCategoryDropdownRef = useRef<HTMLDivElement>(null);


    const navigate = useNavigate();

    const { data: getCategoriesData } = useGetCategoriesQuery();
    const categoriesData = getCategoriesData?.data ?? [];

    const { data: getBrandsData } = useGetBrandsQuery();
    const brandsData = getBrandsData?.data ?? [];

    const [createProduct] = useCreateProductMutation();


    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const notify = useNotification
    
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



    const {
        register,
        handleSubmit,
        setValue,
        control,
        getValues,
        

        formState: { errors,isSubmitted }
    } = useForm<IProductForm>({
           resolver: yupResolver(addProductSchema) as Resolver<IProductForm>,
            
        });
   
   const watchedImages = useWatch({
  control,
  name: "images",
  defaultValue: [],
});

   
   useEffect(() => {
  if (!watchedImages?.length) {
    setImagePreviewUrls([]);
    return;
  }
  const urls = watchedImages.map((file: File) => URL.createObjectURL(file));
  setImagePreviewUrls(urls);
  return () => urls.forEach(URL.revokeObjectURL);
}, [watchedImages]);


   
    useEffect(() => {
        return () => {
            imagePreviewUrls.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviewUrls]);

    const handleBrowse = () => {
        fileInputRef.current?.click();
    };

    const compressionOptions = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1280,
        useWebWorker: true,
        initialQuality: 0.75,
    };

    
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        const existingFiles = watchedImages || [];

        if (selectedFiles.length === 0) return;

        setIsCompressing(true);
        setCompressionProgress(0);

        try {
            const compressedFiles = [];

            for (let i = 0; i < selectedFiles.length; i++) {
                const currentFile = selectedFiles[i];

                if (currentFile.size < 300 * 1024) {
                    compressedFiles.push(currentFile);
                    setCompressionProgress(Math.round(((i + 1) / selectedFiles.length) * 100));
                } else {
                    const compressed = await imageCompression(currentFile, {
                        ...compressionOptions,
                        onProgress: (percent) => {
                            const overallProgress = ((i + percent / 100) / selectedFiles.length) * 100;
                            setCompressionProgress(Math.round(overallProgress));
                        }
                    });
                    compressedFiles.push(compressed);
                }
            }

            const mergedFiles = [...existingFiles, ...compressedFiles];

            if (mergedFiles.length > 5) {
                notify("You can upload a maximum of 5 images only.", "warning");
                setValue("images", mergedFiles.slice(0, 5));
            } else {
                setValue("images", mergedFiles);
            }

            if (e.target) e.target.value = "";
        } catch  {
            
            notify("Failed to compress images", "error");
        } finally {
            setIsCompressing(false);
            setCompressionProgress(0);
        }
    };

    const setAsCover = (index: number) => {
        const current = watchedImages || [];
        if (index === 0) return;
        const newOrder = [current[index], ...current.filter((_, i) => i !== index)];
        setValue("images", newOrder);
    };

    const removeImage = (indexToRemove: number) => {
        const currentImages = watchedImages || [];
        const updated = currentImages.filter((_, idx) => idx !== indexToRemove);
        setValue("images", updated);
    };

    const handleMainCategorySelect = (id: string, name: string) => {
        setSelectedMainCategory(name);
        setValue("category", id);
        setMainCategoryOpen(false);
    };

    const categoryId = getValues("category");

    const { data: getSubOnCategoriesData,isLoading: isLoadingSubCategories  } = useGetAllSubOnByIdQuery(categoryId, {
    skip: !categoryId,
    });
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

            if (values.images && values.images.length > 0) {
                formData.append("imageCover", values.images[0]);
                values.images.slice(1).forEach((file) => {
                    formData.append("images", file);
                });
            }

            formData.append("slug", values.title.toLowerCase().replace(/\s+/g, "-"));

          await createProduct(formData).unwrap();
            notify("Product added successfully", "success");
            navigate('/admin');
          
        } catch  {
       
        notify("Failed to create product", "error");
    } finally {
            setIsLoading(false);
        }
    };




    useEffect(() => {
  document.body.style.overflow = isCompressing ? "hidden" : "auto";
}, [isCompressing]);


    return (
        <div className="w-full font-roobert space-y-6 relative min-h-screen ">
            <ManageTitle title="Add New Product" />

            <AnimatePresence>
                


            </AnimatePresence>

            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <motion.div
                    className="relative flex flex-col gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    <span className="text-sm text-gray-400">
                       {watchedImages.length===0?" Upload Product Images":watchedImages.length<5?"Click to add more images":""} 
                        </span>
                    <div
                        className="w-[260px] h-[180px] rounded-xl border border-gray-300 bg-white flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-gray-50 transition"
                        onClick={handleBrowse}
                    >
                        {watchedImages.length > 0 ? (
                            <img
                                src={imagePreviewUrls[0]}
                                alt="preview"
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
                    {watchedImages.length > 0 && (
                        <div className="mt-3 flex gap-5 flex-wrap">
                            {watchedImages.map((_, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="relative"
                                >
                                    <img
                                        src={imagePreviewUrls[idx]}
                                        alt={`image-${idx}`}
                                        className={`w-20 h-20 object-cover rounded-lg border-1 ${
                                            idx === 0 ? "border-green-500" : "border-[#3B8D90]"
                                        }`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(idx)}
                                        className="absolute bottom-1 right-1"
                                        aria-label="Remove image"
                                    >
                                        <IoMdCloseCircle className="text-[#E8765E] hover:text-[#9E3A38] text-lg" />
                                    </button>
                                    {idx === 0 ? (
                                        <span className="absolute top-1 left-1 bg-green-600 text-white text-[10px] px-2 py-[1px] rounded-full">
                                            Cover
                                        </span>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setAsCover(idx)}
                                            className="absolute top-1 left-1 bg-[#3B8D90] text-white text-[10px] px-2 py-[1px] rounded-full hover:bg-[#2a6b6e] transition"
                                        >
                                            Set as Cover
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <div className="flex gap-10">
                        <input
                        ref={fileInputRef}
                        
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        
                        onChange={handleFileChange}
                        onClick={(e) => {
                            if (watchedImages.length >= 5) {
                                e.preventDefault();
                                notify("You already have 5 images uploaded.", "info");
                            }
                        }
                        
                        }
                       


                        
                    />
                     {isCompressing && (
                    <div className="flex flex-col items-center gap-4">
                                
                                <div className="w-50">
                                    <p className="text-[#2a6b6e] text-base font-medium text-center mb-3">
                                        Uploading images...
                                    </p>
                                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[#3B8D90] to-[#2a6b6e]"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${compressionProgress}%` }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    </div>
                                    <p className="text-gray-500 text-sm text-center mt-2">
                                        {compressionProgress}%
                                    </p>
                                </div>
                            </div>
                )}

                 {isSubmitted&&errors["images"] && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-2"
                                >
                                    <InputsErrMsg msg={errors["images"]?.message} />
                                </motion.div>
                            )}



                    </div>

                   
                </motion.div>

              
                <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                    <input type="text" placeholder="Product Name" {...register("title")} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]" />
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

                <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                    <textarea placeholder="Product Description" rows={3} {...register("description")} className="w-full px-3 py-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] resize-none" />
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
                    <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
                        <input type="number" placeholder="Price After Discount" step="0.01" {...register("priceAfterDiscount")} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]" />
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

                    <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
                        <input type="number" placeholder="Product Price" step="0.01" {...register("price")} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]" />
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

                    <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                        <input type="number" min={0} placeholder="Quantity" {...register("quantity")} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]" />
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
                className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
                    <input type="hidden" {...register("category")} />
                    <button onClick={() => setMainCategoryOpen(!mainCategoryOpen)} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] text-left flex justify-between items-center" type="button">
                        {selectedMainCategory}
                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 3 3 3-3"/></svg>
                    </button>
                    {mainCategoryOpen && (
                        <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200">
                            <ul className="py-2 text-sm text-gray-700">
                                {categoriesData?.map((category) => (
                                    <li key={category._id}><button onClick={() => handleMainCategorySelect(category._id, category.name)} className="block w-full text-left px-3 py-2 hover:bg-gray-100">{category.name}</button></li>
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
  {selectedSubCategories.length > 0 && (
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
     {isLoadingSubCategories 
        ? "Loading... " 
        : selectedSubCategories.length === 0
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
                className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.8 }}>
                    <button onClick={() => setBrandOpen(!brandOpen)} className="w-full h-12 px-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] text-left flex justify-between items-center" type="button">
                        {selectedBrand}
                        <svg className="w-2.5 h-2.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 3 3 3-3"/></svg>
                    </button>
                    {brandOpen && (
                        <div className="absolute mt-2 z-10 w-full bg-white rounded-lg shadow-sm border border-gray-200">
                            <ul className="py-2 text-sm text-gray-700">
                                {brandsData?.map((brand) => (
                                    <li key={brand._id}><button onClick={() => handleBrandSelect(brand._id, brand.name)} className="block w-full text-left px-3 py-2 hover:bg-gray-100">{brand.name}</button></li>
                                ))}
                            </ul>
                        </div>
                    )}
                </motion.div>

                <motion.div className="relative" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.9 }}>
                    <span className="text-sm text-gray-400 mb-3 block">Available Colors for the Product</span>
                    <div className="flex gap-3 items-center flex-wrap">
                        <button type="button" onClick={() => setShowColorPicker(!showColorPicker)} className="w-12 h-12 rounded-full border-1 border-gray-300 bg-white flex items-center justify-center hover:bg-gray-50 transition">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 23 23"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v16m8-8H3" /></svg>
                        </button>
                        {selectedColors.map((color, index) => (
                            <div key={index} className="relative group">
                                <div className="w-12 h-12 rounded-full border-1 border-gray-300 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: getColorValue(color) }} title={color} />
                                <button type="button" onClick={() => removeColor(color)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">×</button>
                            </div>
                        ))}
                    </div>
                    {showColorPicker && (
                        <div className="absolute top-full left-0 mt-2 z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                            <div className="grid grid-cols-6 gap-2">
                                {PRODUCT_COLORS.map((color) => (
                                    <button key={color.name} type="button" onClick={() => { addColor(color.name); setShowColorPicker(false); }} className="w-8 h-8 rounded-full border border-gray-300 hover:scale-110 transition-transform"
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
                        Add Product
                    </Button>
                </motion.div>
                
            </form>

           
        </div>
    );
};

export default AddProductSection;



