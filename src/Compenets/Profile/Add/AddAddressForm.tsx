import { motion } from "framer-motion";
import { useForm, type SubmitHandler } from "react-hook-form";
import Button from "../../UI/Button";
import InputsErrMsg from "../../UI/InputsErrMsg";
import { useAddAddressMutation, useUpdateAddressMutation } from "../../../app/Features/addressesApi";
import useNotification from "../../../hook/useNotification";
import { addressSchema } from "../../../Validation";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";

interface IAddressForm {
  alias: string;
  details: string;
  phone: string;
  city: string;
}

interface AddAddressFormProps {
  addressToEdit?: {
    _id: string;
    alias: string;
    details: string;
    phone: string;
    city: string;
  } | null;
  onCancelEdit?: () => void;
}

const AddAddressForm = ({ addressToEdit, onCancelEdit }: AddAddressFormProps) => {
  const notify = useNotification;
  const [addAddress, { isLoading: isAdding }] = useAddAddressMutation();
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<IAddressForm>({
    resolver: yupResolver(addressSchema),
    mode: "onSubmit"
  });

  
  React.useEffect(() => {
    if (addressToEdit) {
      setValue("alias", addressToEdit.alias);
      setValue("details", addressToEdit.details);
      setValue("phone", addressToEdit.phone);
      setValue("city", addressToEdit.city);
    } else {
      reset();
    }
  }, [addressToEdit, setValue, reset]);

  const onSubmit: SubmitHandler<IAddressForm> = async (values) => {
    try {
      if (addressToEdit) {
        await updateAddress({
          id: addressToEdit._id,
          data: values,
        }).unwrap();
        notify("Address updated successfully", "success");
        onCancelEdit?.();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        await addAddress(values).unwrap();
        notify("Address created successfully", "success");
        reset();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (error) {
      if (error && typeof error === "object" && "data" in error) {
        const err = error as { data?: { errors?: { msg: string }[]; message?: string } };

        if (err.data?.errors && Array.isArray(err.data.errors)) {
         
          notify("Failed to add address!", "error");
        } else if (err.data?.message) {
          const message = err.data.message;

          if (message.includes("Duplicate field value")) {
            notify("This address alias already exists!", "error");
          } else {
            notify("Failed to add address, please try again.", "error");
          }
        } else {
          notify("Failed to add address, please try again.", "error");
        }
      } else {
        notify("Failed to add address, please try again.", "error");
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
          id="alias"
          placeholder="Address Alias (e.g., Work, Home)"
          {...register("alias")}
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["alias"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["alias"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="relative flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <textarea
          id="details"
          placeholder="Address Details"
          {...register("details")}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90] resize-none"
        />
        {errors["details"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["details"]?.message} />
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
          type="text"
          id="phone"
          placeholder="Phone Number"
          {...register("phone")}
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["phone"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["phone"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className="relative flex flex-col gap-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        <input
          type="text"
          id="city"
          placeholder="City"
          {...register("city")}
          className="w-full h-12 px-4 rounded-xl border-1 border-[#3B8D90] bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#3B8D90]"
        />
        {errors["city"] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-0"
          >
            <InputsErrMsg msg={errors["city"]?.message} />
          </motion.div>
        )}
      </motion.div>

      <motion.div
        className={`relative flex gap-4
          ${addressToEdit?"":"w-48"}
          `
          
        }
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Button
          type="submit"
          variant="addBtn"
          size="md"
          isLoading={isAdding || isUpdating}
        >
          {addressToEdit ? "Update Address" : "Add Address"}
        </Button>
        
        {addressToEdit && (
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

export default AddAddressForm;