"use client";

// Lib
import React from "react";
import { getIn, useFormikContext } from "formik";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  require?: boolean;
  as?: "input" | "textarea";
};

const InputSearch: React.FC<Props> = ({
  name,
  disabled = false,
  fullWidth = false,
  label,
  placeholder,
  require = false,
  as = "input",
}) => {
  const { values, touched, errors, setFieldValue } = useFormikContext();
  const value = getIn(values, name) ?? "";

  const styleDiv = {
    width: !fullWidth ? "fit-content" : "100%",
  };

  const baseClassName = `
    bg-white/5 border rounded-lg px-4 py-3 text-white placeholder:text-gray-500 
    focus:outline-none focus:border-white/30 transition-colors
    disabled:opacity-50 disabled:cursor-not-allowed
    ${getIn(touched, name) && getIn(errors, name) ? "border-red-500" : "border-white/10"}
  `;

  return (
    <div className={`flex flex-col gap-2`} style={styleDiv}>
      {/* Label */}
      {label && (
        <label
          htmlFor={name}
          className={`font-normal ${
            getIn(touched, name) && getIn(errors, name) ? "text-red-400" : "text-white"
          }`}
        >
          {label}
          {require && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input or Textarea */}
      {as === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => setFieldValue(name, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`${baseClassName} min-h-32 resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          value={value}
          onChange={(e) => setFieldValue(name, e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClassName}
        />
      )}

      {/* Error Message */}
      {getIn(touched, name) && getIn(errors, name) && (
        <p className="text-red-400 text-sm">{getIn(errors, name)}</p>
      )}
    </div>
  );
};

export default InputSearch;
