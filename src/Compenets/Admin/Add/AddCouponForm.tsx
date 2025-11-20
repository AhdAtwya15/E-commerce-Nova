import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../UI/Button";
import InputsErrMsg from "../../UI/InputsErrMsg";
import { useCreateCouponMutation, useUpdateCouponMutation } from "../../../app/Features/couponApi";
import useNotification from "../../../hook/useNotification";
import { couponSchema } from "../../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

interface ICouponForm {
  name: string;
  expire: Date;
  discount: number;
}

interface AddCouponFormProps {
  couponToEdit?: {
    _id: string;
    name: string;
    expire: string;
    discount: number;
  } | null;
  onCancelEdit?: () => void;
}

const AddCouponForm = ({ couponToEdit, onCancelEdit }: AddCouponFormProps) => {
  const notify = useNotification;
  const [createCoupon, { isLoading: isCreating }] = useCreateCouponMutation();
  const [updateCoupon, { isLoading: isUpdating }] = useUpdateCouponMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ICouponForm>({
    resolver: yupResolver(couponSchema),
    mode:"onSubmit"
  });

  React.useEffect(() => {
    if (couponToEdit) {
      setValue("name", couponToEdit.name);
      setValue("expire", new Date(couponToEdit.expire));
      setValue("discount", couponToEdit.discount);
    } else {
      reset();
    }
  }, [couponToEdit, setValue, reset]);

  const onSubmit: SubmitHandler<ICouponForm> = async (values) => {
    try {
      const formattedValues = {
        ...values,
        expire: new Date(values.expire).toISOString(),
      };

      if (couponToEdit) {
        await updateCoupon({
          id: couponToEdit._id,
          data: formattedValues,
        }).unwrap();
        notify("Coupon updated successfully", "success");
        onCancelEdit?.();
      } else {
        await createCoupon(formattedValues).unwrap();
        notify("Coupon created successfully", "success");
        reset();
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: { msg: string }[]; message?: string } };

        if (err.data?.errors && Array.isArray(err.data.errors)) {
          const firstError = err.data.errors[0];
          notify(firstError.msg || "Something went wrong!", "error");
        } else if (err.data?.message) {
          const message = err.data.message;

          if (message.includes("Duplicate field value")) {
            notify("This coupon name already exists!", "error");
          } else {
            notify(message, "error");
          }
        } else {
          notify("Something went wrong, please try again.", "error");
        }
      } else {
        notify("An unexpected error occurred.", "error");
      }
    }
  };

  const handleCancel = () => {
    onCancelEdit?.();
    reset();
  };

  return (
    <motion.form
      className="flex flex-col space-y-5 max-w-3xl"
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="relative flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <input
          type="text"
          id="name"
          placeholder="Coupon Name"
          {...register("name")}
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["name"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["name"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="relative flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <input
          type="date"
          id="expire"
          {...register("expire")}
          min={new Date().toISOString().split("T")[0]}
          placeholder="Expire Date"
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["expire"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["expire"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="relative flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <input
          type="number"
          id="discount"
          placeholder="Discount"
          {...register("discount", { valueAsNumber: true })}
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["discount"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["discount"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className={`relative flex gap-4
          ${couponToEdit?"":"w-48"}
          `
          
        }
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <Button
          type="submit"
          variant="addBtn"
          size="md"
          isLoading={isCreating || isUpdating}
        >
          {couponToEdit ? "Update Coupon" : "Add Coupon"}
        </Button>
        
        {couponToEdit && (
          <Button
            type="button"
           
            size="md"
            onClick={handleCancel}
          >
            Cancel
          </Button>
        )}
      </motion.div>
    </motion.form>
  );
};

export default AddCouponForm;