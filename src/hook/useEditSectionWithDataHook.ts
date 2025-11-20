import { useUpdateBrandMutation } from "../app/Features/brandsApi";
import { useUpdateCategoryMutation } from "../app/Features/categoriesApi";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { useRef, useState, useEffect } from "react";
import type { IEditRequest, ICategory, IBrand } from "../Interfaces";
import { editSectionSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "./useNotification";

interface EditableEntity {
  _id: string;
  name: string;
  image: string;
}

const useEditSectionWithDataHook = (heading: string, editData: ICategory | IBrand | null,onCancelEdit: () => void) => {
  const [updateCategory, { isLoading: isCategoryLoading }] = useUpdateCategoryMutation();
  const [updateBrand, { isLoading: isBrandLoading }] = useUpdateBrandMutation();
  
  const notify = useNotification;

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditRequest>({
    resolver: yupResolver(editSectionSchema) as Resolver<IEditRequest>,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (editData) {
      setValue("name", editData.name);
      setPreviewUrl(editData.image);
    }
  }, [editData, setValue]);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedImage(file);
    setValue("image", file);
    
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit: SubmitHandler<IEditRequest> = async (values) => {
    if (!editData) {
      return;
    }


    const entity = editData as EditableEntity;

    if (heading === "Edit Category") {
      try {
        const formData = new FormData();
        if (values.name) formData.append("name", values.name);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

   await updateCategory({ id: entity._id, data: formData }).unwrap();
    
        notify("Category updated successfully", "success");
        onCancelEdit()
       
      } catch  {
   
        notify("Failed to update category", "error");
         
      }
    } else if (heading === "Edit Brand") {
      try {
        const formData = new FormData();
        if (values.name) formData.append("name", values.name);
        if (selectedImage) {
          formData.append("image", selectedImage);
        }

       await updateBrand({ id: entity._id, data: formData }).unwrap();
    
        notify("Brand updated successfully", "success");
         onCancelEdit()
      } catch  {
        
        notify("Failed to update brand", "error");

      }
    }
  };

  return [
    register,
    handleSubmit,
    fileInputRef,
    selectedImage,
    previewUrl,
    handleBrowse,
    handleFileChange,
    onSubmit,
    errors,
    isCategoryLoading,
    isBrandLoading,
  ] as const;
};

export default useEditSectionWithDataHook;