import { useForm, type Resolver, type SubmitHandler, } from "react-hook-form"
import { useEffect, useRef, useState } from "react";
import type { ISubCategoryRequest} from "../../Interfaces";
import { useCreateSubCategoryMutation } from "../../app/Features/subCategoriesApi";
import { useGetCategoriesQuery } from "../../app/Features/categoriesApi";
import { addSubCategorySchema } from "../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "../useNotification";
const useAddSubCategoriesHook = () => {
    const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Select Category");
  const [createSubCategory,{isLoading}] =useCreateSubCategoryMutation();
  const {data}=useGetCategoriesQuery();
  const categories=data?.data || [];
   const subCategoryDropdownRef = useRef<HTMLDivElement>(null);
   const notify = useNotification

   useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
  
     if (
      subCategoryDropdownRef.current &&
      !subCategoryDropdownRef.current.contains(event.target as Node)
    ) {
      setOpen(false);
    }

  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);


  const {
    register,
    handleSubmit,
    setValue,
     formState: { errors },

  } = useForm<ISubCategoryRequest>({
     resolver: yupResolver(addSubCategorySchema) as Resolver<ISubCategoryRequest>,
});

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
    setValue("category", value);
    setOpen(false);
  };




    const onSubmit: SubmitHandler<ISubCategoryRequest> = async (values) => {
   
     try
      {
       await createSubCategory(values).unwrap();
   
      notify("Subcategory created successfully","success")
      }
      catch
      {
        notify("Failed to create subcategory","error")  
      }
      
  };
    
    return [open,setOpen,subCategoryDropdownRef,selectedCategory,categories,register,handleSubmit,handleSelect,onSubmit,errors,isLoading] as const
}
export default useAddSubCategoriesHook;