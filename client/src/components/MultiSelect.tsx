import { useState } from 'react';

interface MultiSelectProps {
  options: string[];
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
}

export function MultiSelect({ options, values, onChange, placeholder = "Select items..." }: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleOption = (option: string) => {
    if (values.includes(option)) {
      onChange(values.filter(item => item !== option));
    } else {
      onChange([...values, option]);
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    onChange(values.filter(value => value !== valueToRemove));
  };

  return (
    <div className="relative">
      <div 
        className="min-h-[38px] w-full border rounded-md p-1.5 cursor-pointer bg-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {values.length > 0 ? (
            values.map((value) => (
              <span 
                key={value}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm flex items-center gap-1"
              >
                {value}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveValue(value);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className="text-gray-500 text-sm">{placeholder}</span>
          )}
        </div>
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option}
              className={`px-3 py-2 cursor-pointer ${
                values.includes(option)
                  ? 'bg-gray-100'
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => handleToggleOption(option)}
            >
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.includes(option)}
                  onChange={() => {}}
                  className="h-4 w-4"
                />
                <span>{option}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}