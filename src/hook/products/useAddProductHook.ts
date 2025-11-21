import { useRef, useState, useEffect } from "react";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import imageCompression from "browser-image-compression";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../../Validation";
import { PRODUCT_COLORS } from "../../Constants/colors";
import { useWatch } from "react-hook-form";
import useNotification from "../useNotification";
import type { ISubCategory } from "../../Interfaces";
import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
import { useGetBrandsQuery } from "../../app/Features/brandsApi";
import { useGetAllSubOnByIdQuery } from "../../app/Features/subOnCategoryApi";
import { useCreateProductMutation } from "../../app/Features/productApi";
import type { IProductForm } from "./useAddProductHook.types";

export type { IProductForm };

const useAddProductHook = () => {
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
  const notify = useNotification;

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
    formState: { errors, isSubmitted }
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
    } catch {
      notify("Failed to compress images", "error");
    } finally {
      setIsCompressing(false);
      setCompressionProgress(0);
    }
  };

  const setAsCover = (index: number) => {
    const current = watchedImages || [];
    if (index === 0) return;
    const newOrder = [current[index], ...current.filter((_: File, i: number) => i !== index)];
    setValue("images", newOrder);
  };

  const removeImage = (indexToRemove: number) => {
    const currentImages = watchedImages || [];
    const updated = currentImages.filter((_: File, idx: number) => idx !== indexToRemove);
    setValue("images", updated);
  };

  const handleMainCategorySelect = (id: string, name: string) => {
    setSelectedMainCategory(name);
    setValue("category", id);
    setMainCategoryOpen(false);
  };

  const categoryId = getValues("category");

  const { data: getSubOnCategoriesData, isLoading: isLoadingSubCategories } = useGetAllSubOnByIdQuery(categoryId, {
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
        values.subcategory.forEach((id: string) => formData.append("subcategory", id));
      }

      if (values.brand) formData.append("brand", values.brand);

      if (values.availableColors && values.availableColors.length > 0) {
        values.availableColors.forEach((color: string) => formData.append("availableColors", color));
      }

      if (values.images && values.images.length > 0) {
        formData.append("imageCover", values.images[0]);
        values.images.slice(1).forEach((file: File) => {
          formData.append("images", file);
        });
      }

      formData.append("slug", values.title.toLowerCase().replace(/\s+/g, "-"));

      await createProduct(formData).unwrap();
      notify("Product added successfully", "success");
      navigate('/admin');
    } catch {
      notify("Failed to create product", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    document.body.style.overflow = isCompressing ? "hidden" : "auto";
  }, [isCompressing]);

  return {
    // States
    isLoading,
    isCompressing,
    compressionProgress,
    mainCategoryOpen,
    subCategoryOpen,
    brandOpen,
    selectedMainCategory,
    selectedSubCategories,
    selectedSubCategoriesArray,
    selectedBrand,
    selectedColors,
    showColorPicker,
    imagePreviewUrls,
    categoriesData,
    brandsData,
    subOnCategoriesData,
    isLoadingSubCategories,
    isSubmitted,
    errors,

    // Refs
    categoryDropdownRef,
    brandDropdownRef,
    subCategoryDropdownRef,
    fileInputRef,

    // Form methods
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    onSubmit,

    // Functions
    handleBrowse,
    handleFileChange,
    setAsCover,
    removeImage,
    handleMainCategorySelect,
    handleSubCategorySelect,
    removeSubCategory,
    handleBrandSelect,
    addColor,
    removeColor,
    getColorValue,
    setMainCategoryOpen,
    setSubCategoryOpen,
    setBrandOpen,
    setShowColorPicker,
  };
};

export default useAddProductHook;