
import React, { useState, useEffect } from 'react';
import { ChevronDown, Plus } from 'lucide-react';

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
    maxHeight = "max-h-60",
    anOther = false,
    otherText = "أخرى..."
}) => {
    const [search, setSearch] = useState("");
    const [open, setOpen] = useState(false);
    const [showOtherInput, setShowOtherInput] = useState(false);
    const [otherValue, setOtherValue] = useState("");
    const [addedItems, setAddedItems] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editingValue, setEditingValue] = useState("");

    // دمج الخيارات الأصلية مع المضافة حديثاً
    const allOptions = [...options, ...addedItems];

    // فلترة الخيارات بناءً على البحث
    const filteredOptions = allOptions.filter(opt =>
        opt.toLowerCase().includes(search.toLowerCase())
    );

    // إغلاق القائمة عند النقر خارجها
    const handleClickOutside = (e) => {
        if (!e.target.closest('.dropdown-container')) {
            setOpen(false);
            setShowOtherInput(false);
            setOtherValue("");
            setIsEditing(false);
            setEditingValue("");
        }
    };

    // التعامل مع اختيار "أخرى"
    const handleOtherSelect = () => {
        setShowOtherInput(true);
        setSearch("");
        setIsEditing(false);
        setOtherValue("");
    };

    // التعامل مع تعديل عنصر مضاف حديثاً
    const handleEditItem = (item) => {
        setShowOtherInput(true);
        setOtherValue(item);
        setIsEditing(true);
        setEditingValue(item);
        setSearch("");
    };

    // إضافة أو تعديل القيمة
    const handleOtherSubmit = () => {
        if (otherValue.trim()) {
            const newValue = otherValue.trim();

            if (isEditing) {
                // في حالة التعديل
                const updatedItems = addedItems.map(item =>
                    item === editingValue ? newValue : item
                );
                setAddedItems(updatedItems);
                setValue(newValue);
            } else {
                // في حالة الإضافة الجديدة
                if (!allOptions.includes(newValue)) {
                    setAddedItems(prev => [...prev, newValue]);
                }
                setValue(newValue);
            }

            // إعادة تعيين كل شيء
            setOpen(false);
            setShowOtherInput(false);
            setOtherValue("");
            setSearch("");
            setIsEditing(false);
            setEditingValue("");
        }
    };

    // التعامل مع الضغط على Enter في حقل "أخرى"
    const handleOtherKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleOtherSubmit();
        } else if (e.key === 'Escape') {
            handleOtherCancel();
        }
    };

    // إلغاء حقل "أخرى"
    const handleOtherCancel = () => {
        setShowOtherInput(false);
        setOtherValue("");
        setIsEditing(false);
        setEditingValue("");
    };

    // معالج اختيار العنصر
    const handleItemSelect = (opt) => {
        const isAddedItem = addedItems.includes(opt);

        if (isAddedItem) {
            // إذا كان عنصر مضاف حديثاً، ادخل في وضع التعديل
            handleEditItem(opt);
        } else {
            // اختيار عادي
            setValue(opt);
            setOpen(false);
            setSearch("");
            setShowOtherInput(false);
            setOtherValue("");
            setIsEditing(false);
            setEditingValue("");
        }
    };

    useEffect(() => {
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
                border-orange-200 dark:border-slate-600 rounded-lg shadow-lg ${maxHeight} overflow-hidden
                animate-in fade-in-0 zoom-in-95 duration-200`}>

                    {/* حقل البحث */}
                    <div className="bg-white dark:bg-slate-800 border-b border-orange-200 dark:border-slate-600">
                        <input
                            type="text"
                            className="w-full p-2 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 
                            text-right focus:outline-none placeholder-gray-400 dark:placeholder-slate-500"
                            placeholder={searchPlaceholder}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                            dir="rtl"
                            autoFocus={!showOtherInput}
                        />
                    </div>

                    {/* المحتوى القابل للتمرير */}
                    <div className="overflow-auto max-h-52">
                        <ul className="py-1">
                            {/* قائمة الخيارات */}
                            {filteredOptions.length > 0 && filteredOptions.map((opt, idx) => {
                                const isAddedItem = addedItems.includes(opt);
                                return (
                                    <li
                                        key={idx}
                                        className={`px-3 py-2 cursor-pointer text-right transition-colors duration-150
                                        ${isAddedItem
                                                ? 'hover:bg-green-100 dark:hover:bg-green-800 text-green-700 dark:text-green-300 bg-green-50 dark:bg-green-900/20'
                                                : 'hover:bg-orange-100 dark:hover:bg-slate-700 text-gray-800 dark:text-slate-200'
                                            }`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleItemSelect(opt);
                                        }}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{opt}</span>
                                            {isAddedItem && (
                                                <span className="text-xs text-green-600 dark:text-green-400">
                                                    (مضاف - اضغط للتعديل)
                                                </span>
                                            )}
                                        </div>
                                    </li>
                                );
                            })}

                            {/* رسالة عدم وجود نتائج */}
                            {filteredOptions.length === 0 && !anOther && (
                                <li className="px-3 py-2 text-gray-400 dark:text-slate-500 text-right">
                                    {noResultsText}
                                </li>
                            )}

                            {/* خيار "أخرى" كزر قابل للنقر بالكامل أو حقل الإدخال */}
                            {anOther && (
                                <div className="border-t border-orange-200 dark:border-slate-600 p-2">
                                    {!showOtherInput ? (
                                        <div
                                            className="w-full px-3 py-3 bg-blue-500 hover:bg-blue-600 
                                            text-white rounded-lg transition-all duration-150
                                            flex items-center justify-center gap-2 text-sm font-medium
                                            cursor-pointer select-none active:bg-blue-700
                                            hover:shadow-md transform hover:scale-[1.02]"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleOtherSelect();
                                            }}
                                        >
                                            <Plus size={16} />
                                            <span>{otherText}</span>
                                        </div>
                                    ) : (
                                        <div className="bg-gray-50 dark:bg-slate-700 p-3 rounded-lg">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOtherSubmit();
                                                    }}
                                                    className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm
                                                    transition-colors duration-200 disabled:opacity-50 whitespace-nowrap"
                                                    disabled={!otherValue.trim()}
                                                >
                                                    {isEditing ? 'تعديل' : 'إضافة'}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleOtherCancel();
                                                    }}
                                                    className="px-3 py-1 bg-gray-400 hover:bg-gray-500 text-white rounded text-sm
                                                    transition-colors duration-200 whitespace-nowrap"
                                                >
                                                    إلغاء
                                                </button>
                                                <input
                                                    type="text"
                                                    className="flex-1 p-2 border border-gray-300 dark:border-slate-500 rounded
                                                    bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right
                                                    focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
                                                    placeholder={isEditing ? "تعديل القيمة" : otherText}
                                                    value={otherValue}
                                                    onChange={(e) => setOtherValue(e.target.value)}
                                                    onKeyDown={handleOtherKeyPress}
                                                    onClick={(e) => e.stopPropagation()}
                                                    dir="rtl"
                                                    autoFocus
                                                />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchableDropdown;