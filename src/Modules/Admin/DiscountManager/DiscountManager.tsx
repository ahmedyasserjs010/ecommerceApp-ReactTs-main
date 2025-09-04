import React, { useState } from 'react';
import { ChevronDown, Percent } from 'lucide-react';
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown.tsx';

// البيانات
export const All_Sections = [
    "البلاستيكات",
    "الأدوات المنزلية ",
    "أدوات الطبخ"
];

export const All_Category = [
    "عجانات",
    "محضرات طعام",
    "خلاطات",
    "قلايات",
    "هاند بلندر",
    "كبات",
    "مضارب بيض",
    "مفرمة لحوم",
    "أفران كهربائية",
    "شوايات كهربائية",
    "غلايات",
    "ماكينة الاسبريسو",
    "توستر",
    "كنكة قهوة",
    "وافل ميكر",
    "مايكروويف",
    "مسطح كهربائية",
    "مقاليين تيفال",
    "جريل كهربائي",
    "حلل ضغط",
    "مقالي سيراميك",
    "التوزيع والتنظيم",
    "ليانت تقديم",
    "أكواب وأطباق",
    "زجاجات مياه",
    "التوائل والبهارات",
    "أطقم صينى",
    "الزركونايل",
    "الألواني والحلل",
    "بوستلنس",
    "أطقم الشاى",
    "شنط الملوك",
    "أطقم استانلس",
    "برطمانات حفظ",
    "صواني تقديم",
    "جردل",
    "طقم العروسة",
    "كراسي بلاستيك",
    "زبالات",
    "دواليب بلاستيك",
    "ستاندات مطبخ",
    "لانش بوكس",
    "بستلات",
    "طشت",
    "سبت",
    "علب ثلاجة",
    "شانون بلاستيك"
];

const DiscountManager = () => {
    // State for discount section
    const [selectedSection, setSelectedSection] = useState("");
    const [sectionDiscountDuration, setSectionDiscountDuration] = useState("");
    const [discountType, setDiscountType] = useState("percent");
    const [discountValue, setDiscountValue] = useState("");

    // State for discount category
    const [selectedCategory, setSelectedCategory] = useState("");
    const [categoryDiscountDuration, setCategoryDiscountDuration] = useState("");
    const [discountType2, setDiscountType2] = useState("percent");
    const [discountValue2, setDiscountValue2] = useState("");

    // State for active discounts
    const [activeDiscounts, setActiveDiscounts] = useState([]);

    // Handle section discount
    const handleSectionDiscount = () => {
        if (!selectedSection || !discountValue || !sectionDiscountDuration) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        const newDiscount = {
            id: Date.now(),
            type: 'section',
            name: selectedSection,
            discount: discountValue,
            discountType: discountType,
            duration: sectionDiscountDuration,
            startTime: new Date(),
            isActive: true
        };

        setActiveDiscounts(prev => [...prev, newDiscount]);

        // Clear form
        setSelectedSection('');
        setDiscountValue('');
        setSectionDiscountDuration('');

        alert('تم إضافة الخصم على القسم بنجاح');
    };

    // Handle category discount
    const handleCategoryDiscount = () => {
        if (!selectedCategory || !discountValue2 || !categoryDiscountDuration) {
            alert('الرجاء ملء جميع الحقول المطلوبة');
            return;
        }

        const newDiscount = {
            id: Date.now(),
            type: 'category',
            name: selectedCategory,
            discount: discountValue2,
            discountType: discountType2,
            duration: categoryDiscountDuration,
            startTime: new Date(),
            isActive: true
        };

        setActiveDiscounts(prev => [...prev, newDiscount]);

        // Clear form
        setSelectedCategory('');
        setDiscountValue2('');
        setCategoryDiscountDuration('');

        alert('تم إضافة الخصم على الفئة بنجاح');
    };

    // Remove discount
    const removeDiscount = (discountId) => {
        setActiveDiscounts(prev => prev.filter(discount => discount.id !== discountId));
    };

    // Toggle discount status
    const toggleDiscountStatus = (discountId) => {
        setActiveDiscounts(prev =>
            prev.map(discount =>
                discount.id === discountId
                    ? { ...discount, isActive: !discount.isActive }
                    : discount
            )
        );
    };

    return (
        <div className="min-h-screen p-8 bg-orange-50 dark:bg-gray-800 rounded-3xl" dir="rtl">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
                        <Percent size={32} className="text-orange-500" />
                        إدارة الخصومات
                    </h1>

                    {/* إحصائيات سريعة */}
                    <div className="flex items-center gap-4 text-sm">
                        <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                            نشطة: {activeDiscounts.filter(d => d.isActive).length}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                            متوقفة: {activeDiscounts.filter(d => !d.isActive).length}
                        </div>
                        <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                            المجموع: {activeDiscounts.length}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* قسم إضافة الخصومات */}
                    <div className="space-y-6">
                        {/* خصم القسم */}
                        <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-orange-200 dark:border-gray-600 pb-3">
                                إضافة خصم على قسم
                            </h2>

                            <div className="space-y-4">
                                <SearchableDropdown
                                    label="القسم الذي تريد أن تضع عليه الخصم"
                                    placeholder="اختر القسم"
                                    options={All_Sections}
                                    value={selectedSection}
                                    setValue={setSelectedSection}
                                />

                                <div>
                                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
                                        نسبة الخصم التي تريد أن تضعها على هذا القسم
                                    </label>
                                    <div className="flex gap-3 items-center w-full">
                                        <select
                                            value={discountType}
                                            onChange={(e) => setDiscountType(e.target.value)}
                                            className="p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                        >
                                            <option value="currency">بالجنيه</option>
                                            <option value="percent">بالنسبة المئوية</option>
                                        </select>

                                        <input
                                            type="number"
                                            min="1"
                                            max={discountType === "percent" ? "100" : undefined}
                                            value={discountValue}
                                            onChange={(e) => setDiscountValue(e.target.value)}
                                            className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                            placeholder={discountType === "percent" ? " بالنسبة المئوية %" : "المبلغ بالجنيه"}
                                            dir="rtl"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
                                        مقدار الوقت الذي سيستمر فيه الخصم
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={sectionDiscountDuration}
                                        onChange={(e) => setSectionDiscountDuration(e.target.value)}
                                        className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                        placeholder="أدخل الوقت وسيكون بالساعات"
                                        dir="rtl"
                                    />
                                </div>

                                <button
                                    onClick={handleSectionDiscount}
                                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Percent size={18} />
                                    إضافة الخصم على القسم
                                </button>
                            </div>
                        </div>

                        {/* خصم الفئة */}
                        <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-orange-200 dark:border-gray-600 pb-3">
                                إضافة خصم على فئة
                            </h2>

                            <div className="space-y-4">
                                <SearchableDropdown
                                    label="الفئة التي تريد أن تضع عليها الخصم"
                                    placeholder="اختر الفئة"
                                    options={All_Category}
                                    value={selectedCategory}
                                    setValue={setSelectedCategory}
                                />

                                <div>
                                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
                                        نسبة الخصم التي تريد أن تضعها على هذه الفئة
                                    </label>
                                    <div className="flex gap-3 items-center w-full">
                                        <select
                                            value={discountType2}
                                            onChange={(e) => setDiscountType2(e.target.value)}
                                            className="p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                        >
                                            <option value="currency">بالجنيه</option>
                                            <option value="percent">بالنسبة المئوية</option>
                                        </select>

                                        <input
                                            type="number"
                                            min="1"
                                            max={discountType2 === "percent" ? "100" : undefined}
                                            value={discountValue2}
                                            onChange={(e) => setDiscountValue2(e.target.value)}
                                            className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                            placeholder={discountType2 === "percent" ? " بالنسبة المئوية %" : "المبلغ بالجنيه"}
                                            dir="rtl"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
                                        مقدار الوقت الذي سيستمر فيه الخصم
                                    </label>
                                    <input
                                        type="number"
                                        min="1"
                                        value={categoryDiscountDuration}
                                        onChange={(e) => setCategoryDiscountDuration(e.target.value)}
                                        className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                                        placeholder="أدخل الوقت وسيكون بالساعات"
                                        dir="rtl"
                                    />
                                </div>

                                <button
                                    onClick={handleCategoryDiscount}
                                    className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-600 transition-colors cursor-pointer flex items-center justify-center gap-2"
                                >
                                    <Percent size={18} />
                                    إضافة الخصم على الفئة
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* قسم الخصومات النشطة */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600  ">
                            <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-white border-b border-orange-200 dark:border-gray-600 pb-3">
                                الخصومات النشطة والمتوقفة
                            </h2>

                            {activeDiscounts.length === 0 ? (
                                <div className="text-center py-12">
                                    <Percent size={64} className="mx-auto mb-4 text-gray-400" />
                                    <p className="text-gray-500 dark:text-gray-400 text-lg">
                                        لا توجد خصومات حتى الآن
                                    </p>
                                    <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
                                        ابدأ بإضافة خصم جديد من النماذج على اليسار
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[900px] overflow-y-auto">
                                    {activeDiscounts.map((discount) => (
                                        <div
                                            key={discount.id}
                                            className={`p-4 rounded-lg border-2 transition-all ${discount.isActive
                                                ? 'border-green-200 bg-green-50 dark:border-green-600 dark:bg-green-900/20'
                                                : 'border-red-200 bg-red-50 dark:border-red-600 dark:bg-red-900/20'
                                                }`}
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <Percent size={16} className="text-orange-500" />
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${discount.type === 'section'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                                                        : 'bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100'
                                                        }`}>
                                                        {discount.type === 'section' ? 'قسم' : 'فئة'}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => toggleDiscountStatus(discount.id)}
                                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${discount.isActive
                                                            ? 'bg-red-500 text-white hover:bg-red-600'
                                                            : 'bg-green-500 text-white hover:bg-green-600'
                                                            }`}
                                                    >
                                                        {discount.isActive ? 'إيقاف' : 'تفعيل'}
                                                    </button>

                                                    <button
                                                        onClick={() => removeDiscount(discount.id)}
                                                        className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-500 text-white hover:bg-gray-600 transition-colors"
                                                    >
                                                        حذف
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-4 text-sm">
                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400 font-medium">الاسم:</p>
                                                    <p className="text-gray-800 dark:text-gray-200 font-semibold">{discount.name}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400 font-medium">قيمة الخصم:</p>
                                                    <p className="text-orange-600 dark:text-orange-400 font-bold">
                                                        {discount.discount}{discount.discountType === 'percent' ? '%' : ' جنيه'}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400 font-medium">المدة:</p>
                                                    <p className="text-gray-800 dark:text-gray-200">{discount.duration} ساعة</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-600 dark:text-gray-400 font-medium">الحالة:</p>
                                                    <p className={`font-semibold ${discount.isActive
                                                        ? 'text-green-600 dark:text-green-400'
                                                        : 'text-red-600 dark:text-red-400'
                                                        }`}>
                                                        {discount.isActive ? 'نشط' : 'متوقف'}
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    تم الإنشاء: {discount.startTime.toLocaleString('ar-EG')}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiscountManager;