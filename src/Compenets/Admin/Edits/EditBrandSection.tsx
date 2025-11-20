
import EditSection from "./EditSection";
import type { IBrand } from "../../../Interfaces";

interface EditBrandSectionProps {
  brandToEdit: IBrand;
  onCancelEdit: () => void;
}

const EditBrandSection = ({ brandToEdit, onCancelEdit }: EditBrandSectionProps) => {
  return (
    <EditSection
      heading="Edit Brand"
      imageLabel="Update Brand Logo"
      inputPlaceholder="Enter brand name"
      submitText="Update Brand"
      editData={brandToEdit}
      onCancelEdit={onCancelEdit}
    />
  );
};

export default EditBrandSection;