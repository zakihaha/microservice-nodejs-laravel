import React from 'react';
import propTypes from 'prop-types'

function Input({ type, value, error, name, onChange, placeholder, labelName, inputClassName }) {
    return (
        <div className="flex flex-col mb-4">
            <label htmlFor={name}
                className={['text-lg mb-2', error ? 'text-red-500' : 'text-gray-900'].join(" ")}>
                {labelName}
            </label>

            <input 
                type={type} 
                name={name} 
                className={['bg-white focus:outline-none px-6 py-3 w-full border ', error ? 'text-red-500 border-red-500' : 'focus:border-teal-500 border-gray-600 text-gray-600', inputClassName].join(" ")}
                value={value}
                onChange={onChange}
                placeholder={placeholder ?? "Placeholder"} />

            <span className="text-red-500 pt-2">{error}</span>
        </div>
    );
}

Input.propTypes = {
    error: propTypes.string,
    name: propTypes.string.isRequired,
    onChange: propTypes.func.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    type: propTypes.oneOf(['text', 'email', 'password']),
    placeholder: propTypes.string,
    labelName: propTypes.string,
    inputClassName: propTypes.string
}

export default Input;