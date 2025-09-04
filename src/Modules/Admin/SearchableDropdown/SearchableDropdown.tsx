import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const SearchableDropdown = ({ 
    label, 
    placeholder, 
    options, 
    value, 
    setValue,
    disabled = false,
    className = "",
    searchPlaceholder = "ابحث...",
    noResultsText = "لا يوجد نتائج",
    maxHeight = "max-h-60"
}) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);

    // فلترة الخيارات بناءً على البحث
    const filteredOptions = options.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    // إغلاق القائمة عند النقر خارجها
    const handleClickOutside = (e) => {
        if (!e.target.closest('.dropdown-container')) {
            setOpen(false);
        }
    };

    React.useEffect(() => {
        if (open) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [open]);

    return (
        <div className={`relative w-full dropdown-container ${className}`}>
            {label && (
                <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
                    {label}
                </label>
            )}
            
            <div
                className={`w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg 
                bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right 
                focus-within:ring-2 focus-within:ring-orange-500 dark:focus-within:ring-slate-500
                cursor-pointer flex justify-between items-center transition-all duration-200
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-orange-300 dark:hover:border-slate-500'}
                ${open ? 'border-orange-500 dark:border-slate-500 ring-2 ring-orange-500 dark:ring-slate-500' : ''}`}
                onClick={() => !disabled && setOpen(!open)}
            >
                <span className={value ? '' : 'text-gray-400 dark:text-slate-500'}>
                    {value || placeholder}
                </span>
                <ChevronDown 
                    size={18} 
                    className={`ml-2 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} 
                />
            </div>

            {open && !disabled && (
                <div className={`absolute z-50 mt-1 w-full bg-white dark:bg-slate-800 border 
                border-orange-200 dark:border-slate-600 rounded-lg shadow-lg ${maxHeight} overflow-auto
                animate-in fade-in-0 zoom-in-95 duration-200`}>
                    
                    {/* حقل البحث */}
                    <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-orange-200 dark:border-slate-600">
                        <input
                            type="text"
                            className="w-full p-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 
                            text-right focus:outline-none placeholder-gray-400 dark:placeholder-slate-500"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            dir="rtl"
                            autoFocus
                        />
                    </div>
                    
                    {/* قائمة الخيارات */}
                    <ul className="py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((opt, idx) => (
                                <li
                                    key={idx}
                                    className="px-3 py-2 hover:bg-orange-100 dark:hover:bg-slate-700 
                                    cursor-pointer text-right transition-colors duration-150
                                    text-gray-800 dark:text-slate-200"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setValue(opt);
                                        setOpen(false);
                                        setSearch("");
                                    }}
                                >
                                    {opt}
                                </li>
                            ))
                        ) : (
                            <li className="px-3 py-2 text-gray-400 dark:text-slate-500 text-right">
                                {noResultsText}
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;