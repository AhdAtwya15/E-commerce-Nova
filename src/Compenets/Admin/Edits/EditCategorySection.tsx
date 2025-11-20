import EditSection from "./EditSection";
import type { ICategory } from "../../../Interfaces";

interface EditCategorySectionProps {
  categoryToEdit: ICategory;
  onCancelEdit: () => void;
}

const EditCategorySection = ({ categoryToEdit, onCancelEdit }: EditCategorySectionProps) => {
  return (
    <EditSection
      heading="Edit Category"
      imageLabel="Update Category Image"
      inputPlaceholder="Enter category name"
      submitText="Update Category"
      editData={categoryToEdit}
      onCancelEdit={onCancelEdit}
    />
  );
};

export default EditCategorySection;