import { useForm, type Resolver, type SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import type { IEditSubCategory, ISubCategory } from "../../Interfaces";
import { useUpdateSubCategoryMutation } from "../../app/Features/subCategoriesApi";
import { editSubCategorySchema } from "../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";

import useNotification from "../useNotification";

const useEditSubCategoryWithDataHook = (subCategoryData: ISubCategory | null,onCancelEdit:() => void) => {
  const [updateSubCategory, { isLoading }] = useUpdateSubCategoryMutation();
  const notify = useNotification;


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IEditSubCategory>({
    resolver: yupResolver(editSubCategorySchema) as Resolver<IEditSubCategory>,
  });
  useEffect(() => {
    if (subCategoryData) {
      setValue("name", subCategoryData.name);
    }
  }, [subCategoryData, setValue]);

  const onSubmit: SubmitHandler<IEditSubCategory> = async (values) => {
    if (!subCategoryData) {
      return;
    }

    try {
      await updateSubCategory({ id: subCategoryData._id, data: values }).unwrap();
      notify("Subcategory updated successfully", "success");
      onCancelEdit()
     
    } catch {
      notify("Failed to update subcategory", "error");
    }
  };

  return [
    register,
    handleSubmit,
    onSubmit,
    errors,
    isLoading,
  ] as const;
};

export default useEditSubCategoryWithDataHook;