import React, { Children, useEffect, useRef, useState } from 'react';
import propTypes from 'prop-types';

function Select({ labelName, id, name, value, className, children, onclick, fallbackText }) {
    const [toggle, setToggle] = useState(false);

    const selectWrapper = useRef(null)

    const items = Children.toArray(children)

    const toggleSelect = () => {
        setToggle(() => !toggle)
    }

    const clickOutside = (e) => {
        if (selectWrapper && !selectWrapper.current.contains(e.target)) setToggle(false)
    }

    useEffect(() => {
        window.addEventListener("mousedown", clickOutside)

        return () => {
            window.removeEventListener("mousedown", clickOutside)
        }
    }, [])

    const selected = items.find(item => item.props.value === value)

    return (
        <div className='flex flex-col mb-4'>
            {
                labelName &&
                <label htmlFor="" className='show text-lg mb-2 text-gray-900'>{labelName}</label>
            }
            <div className="relative" ref={selectWrapper} onClick={toggleSelect}>
                <div className={["flex justify-between cursor-pointer bg-white focus:outline-offset-0 transition-all duration-200 border px-4 py-3 w-full", toggle ? "border-teal-500" : "border-gray-600", className].join(" ")}>
                    <span className={value === "" ? "text-gray-500" : ""}>{selected?.props.children ?? fallbackText}</span>
                    <div className="transition-all duration-200 border-gray-400 border-b-2 border-r-2 transform rotate-45 translate-y-1 w-2 h-2"></div>
                    <div className={["absolute left-0 top-12 bg-white border border-gray-600 py-3 w-full", toggle ? "" : "hidden"].join(" ")}>
                        {
                            items.map((item, index) => {
                                return <div key={index} className="cursor-pointer px-4 py-1 bg-white hover:bg-gray-400 transition-all duration-200" onClick={() => onclick({target: {name: name, value: item.props.value}})}>
                                    {item.props.children}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

Select.propTypes = {
    name: propTypes.string.isRequired,
    onclick: propTypes.func.isRequired,
    value: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired,
    fallbackText: propTypes.string,
    labelName: propTypes.string,
    id: propTypes.string,
    className: propTypes.string,
}

export default Select;