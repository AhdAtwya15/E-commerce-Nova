import { useCreateBrandMutation } from "../app/Features/brandsApi";
import { useCreateCategoryMutation } from "../app/Features/categoriesApi";
import { useForm, type Resolver, type SubmitHandler } from "react-hook-form"
import { useRef, useState } from "react";
import type { IRequest } from "../Interfaces";
import { addSectionSchema } from "../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "./useNotification";

const useAddSectionHook = (heading:string) => {


    const [createCategory,{isLoading:isCategoryLoading}] = useCreateCategoryMutation();
      const [createBrand,{isLoading:isBrandLoading}] =useCreateBrandMutation();

      const notify = useNotification
      
    
      const fileInputRef = useRef<HTMLInputElement | null>(null);
    
      const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    
    
      } = useForm<IRequest>({
          resolver: yupResolver(addSectionSchema) as Resolver<IRequest>,
        });
    
      const [selectedImage, setSelectedImage] = useState<File | null>(null);
    
    
      const handleBrowse = () => {
        fileInputRef.current?.click();
      };
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedImage(file);
        setValue("image", file);
      };
    
      const onSubmit: SubmitHandler<IRequest> = async (values) => {
       
        if(heading==="Add New Category")
          {
            try
            {
               const formData = new FormData();
          if (values.name) formData.append("name", values.name);
          if (values.image) formData.append("image", values.image as File);
    
          await createCategory(formData).unwrap();
         
          notify("Category created successfully","success")
    
    
            }
            catch
            {
            notify("Failed to create category","error")  
                    }
    
        }
        else if(heading==="Add New Brand")
        {
          try
          {
             const formData = new FormData();
          if (values.name) formData.append("name", values.name);
          if (values.image) formData.append("image", values.image as File);
    
          await createBrand(formData).unwrap();
        
          notify("Brand created successfully","success")
          }
          catch
          {
            notify("Failed to create brand","error")  
          }
        }
        
    
       
      };
    
  return [register,handleSubmit,fileInputRef,selectedImage,handleBrowse,handleFileChange,onSubmit,errors,isCategoryLoading, isBrandLoading] as const


  
};
export default useAddSectionHook;