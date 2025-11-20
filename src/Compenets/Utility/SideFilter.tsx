import { useMemo, useState, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiX } from "react-icons/fi";
import Slider from "@mui/material/Slider";
import type { IBrand, ICategory, IFilterSection } from "../../Interfaces";

interface IProps {
  categoriesData: ICategory[];
  brandsData: IBrand[];
  onFilterChange: (section: string, value: string, checked: boolean) => void;
  onPriceChange: (min: number, max: number) => void;
  onClearFilters?: () => void;
  isVisible?: boolean;
  onClose: () => void;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
  priceRange: number[];
}

const SideFilter = ({
  categoriesData,
  brandsData,
  onFilterChange,
  onPriceChange,
  onClearFilters,
  isVisible = true,
  onClose,
  selectedCategories,
  selectedBrands,
  selectedRating,
  priceRange,
}: IProps) => {
 
  const [localPriceRange, setLocalPriceRange] = useState<number[]>(priceRange);


  const filters = useMemo(
    () => [
      {
        title: "Category",
        type: "checkbox" as const,
        options: categoriesData.map((cat) => ({
          label: cat.name,
          value: cat._id,
        })),
      },
      {
        title: "Brand",
        type: "checkbox" as const,
        options: brandsData.map((brand) => ({
          label: brand.name,
          value: brand._id,
        })),
      },
      {
        title: "Rating",
        type: "checkbox" as const,
        options: [
          { label: "4+ Stars", value: "4" },
          { label: "3+ Stars", value: "3" },
          { label: "2+ Stars", value: "2" },
          { label: "1+ Stars", value: "1" },
        ],
      },
    ],
    [categoriesData, brandsData]
  );

  const [filterStates, setFilterStates] = useState<IFilterSection[]>(
    filters.map((filter) => ({ ...filter, isOpen: true }))
  );

  const toggleSection = (index: number) => {
    setFilterStates((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, isOpen: !filter.isOpen } : filter
      )
    );
  };

  const handlePriceChange = (_event: Event, newValue: number | number[]) => {
    setLocalPriceRange(newValue as number[]);
  };

  const handlePriceCommit = (_event: React.SyntheticEvent | Event, value: number | number[]) => {
    const range = value as number[];
    onPriceChange(range[0], range[1]);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      className="bg-white shadow-sm w-80 h-full overflow-y-auto z-50"
      initial={{ x: -320, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -320, opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">Filters</h3>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClearFilters?.();
                setLocalPriceRange([0, 500]);
              }}
              className="text-sm text-teal-600 hover:text-teal-700"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-md"
            >
              <FiX className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        <div className="mb-6 border-b border-gray-100 pb-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Price Range</h4>
          <Slider
            value={localPriceRange}
            onChange={handlePriceChange}
            onChangeCommitted={handlePriceCommit}
            valueLabelDisplay="auto"
            min={0}
            max={500}
            step={10}
            sx={{ color: "#0d9488" }}
          />
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>${localPriceRange[0]}</span>
            <span>${localPriceRange[1]}</span>
          </div>
        </div>
        <div className="space-y-6">
          {filterStates.map((filter, index) => (
            <FilterSection
              key={filter.title}
              filter={filter}
              index={index}
              toggleSection={toggleSection}
              onFilterChange={onFilterChange}
              selectedCategories={selectedCategories}
              selectedBrands={selectedBrands}
              selectedRating={selectedRating}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

interface FilterSectionProps {
  filter: IFilterSection;
  index: number;
  toggleSection: (index: number) => void;
  onFilterChange: (section: string, value: string, checked: boolean) => void;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedRating: number | null;
}

const FilterSection = memo(({
  filter,
  index,
  toggleSection,
  onFilterChange,
  selectedCategories,
  selectedBrands,
  selectedRating,
}: FilterSectionProps) => {
  return (
    <div className="border-b border-gray-100 last:border-b-0 pb-4">
      <button
        onClick={() => toggleSection(index)}
        className="flex items-center justify-between w-full mb-4"
      >
        <h4 className="text-lg font-semibold text-gray-800">{filter.title}</h4>
        <motion.div
          animate={{ rotate: filter.isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {filter.isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="space-y-3">
              {filter.options.map((option) => (
                <label
                  key={option.value}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type={filter.type}
                    name={filter.title}
                    value={option.value}
                    checked={
                      filter.title === "Category"
                        ? selectedCategories.includes(option.value)
                        : filter.title === "Brand"
                        ? selectedBrands.includes(option.value)
                        : filter.title === "Rating"
                        ? selectedRating === Number(option.value)
                        : false
                    }
                    onChange={(e) =>
                      onFilterChange(filter.title, option.value, e.target.checked)
                    }
                    className="w-4 h-4 text-teal-600 focus:ring-1 focus:ring-teal-600 border-gray-300 rounded"
                  />
                  <span className="text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

FilterSection.displayName = 'FilterSection';

export default memo(SideFilter);