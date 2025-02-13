import { useState } from "react";

interface MultiSelectProps {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, values, onChange, placeholder = "Select items..." }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (option: string) => {
    onChange(values.includes(option) ? values.filter((item) => item !== option) : [...values, option]);
  };

  const handleRemoveValue = (valueToRemove: string) => {
    onChange(values.filter((value) => value !== valueToRemove));
  };

  return (
    <div className="relative">
      <div
        className="min-h-[42px] w-full border border-gray-300 rounded-lg p-2 cursor-pointer bg-white flex items-center flex-wrap gap-2 shadow-sm hover:shadow-md transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {values.length > 0 ? (
          values.map((value) => (
            <span
              key={value}
              className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
            >
              {value}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveValue(value);
                }}
                className="text-blue-500 hover:text-blue-700"
              >
                ×
              </button>
            </span>
          ))
        ) : (
          <span className="text-gray-500 text-sm">{placeholder}</span>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto py-1">
          {options.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 flex items-center gap-2 cursor-pointer transition hover:bg-gray-100 ${values.includes(option) ? "bg-gray-200" : ""}`}
              onClick={() => handleToggleOption(option)}
            >
              <input type="checkbox" checked={values.includes(option)} readOnly className="h-4 w-4" />
              <span className="text-gray-700">{option}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
