import React, { useState } from 'react';
import { Upload, Edit3 } from 'lucide-react';
import { AiFillProduct } from "react-icons/ai";
import { FaCloudUploadAlt } from 'react-icons/fa';

const EditProduct = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryPrice: '',
    itemDescription: '',
    sectionDisplay: '',
    discountDuration: '',
    availableQuantity: '',
    displayNumber: '',
    sectionName: '',
    categoryBelonging: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    console.log('حفظ التعديل:', formData);
    // Add your save edit logic here
  };

  const handleAddProduct = () => {
    console.log('إضافة المنتج:', formData);
    // Add your add product logic here
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-700 p-6 rounded-3xl">
      {/* Header */}
      <div className="mb-8" dir="rtl">
        <h1 className="text-3xl font-bold flex gap-3 text-gray-800 dark:text-white text-right p-3">
          <AiFillProduct className="text-4xl text-orange-500" />
          إضافة منتج جديد
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Upload Section */}
        <div className="mb-8">
          <div className="border-2 border-dashed border-orange-300 dark:border-slate-500 rounded-lg p-8 text-center bg-white dark:bg-slate-800">
            <div className="flex flex-col items-center">
              <Upload className="w-12 h-12 text-orange-500 dark:text-slate-400 mb-4" />
              <p className="text-slate-700 dark:text-slate-300 text-lg font-medium">الصوره المراد تحميلها</p>
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="flex flex-wrap flex-row-reverse justify-evenly mb-8">
          {/* Category Name */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              اسم الصنف
            </label>
            <input
              type="text"
              value={formData.categoryName}
              onChange={(e) => handleInputChange('categoryName', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل اسم الصنف"
              dir="rtl"
            />
          </div>

          {/* Category Price */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              سعر الصنف
            </label>
            <input
              type="text"
              value={formData.categoryPrice}
              onChange={(e) => handleInputChange('categoryPrice', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل السعر"
              dir="rtl"
            />
          </div>

          {/* Discount Amount */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              مقدار الخصم على هذا الصنف
            </label>
            <input
              type="text"
              value={formData.itemDescription}
              onChange={(e) => handleInputChange('itemDescription', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="مقدار الخصم"
              dir="rtl"
            />
          </div>

          {/* Discount Duration */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              مقدار الوقت الذي سيستمر فيه الخصم
            </label>
            <input
              type="text"
              value={formData.discountDuration}
              onChange={(e) => handleInputChange('discountDuration', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="مقدار الوقت"
              dir="rtl"
            />
          </div>

          {/* Available Quantity */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              العدد الاصلي المتوفر من هذا الصنف
            </label>
            <input
              type="text"
              value={formData.availableQuantity}
              onChange={(e) => handleInputChange('availableQuantity', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل العدد"
              dir="rtl"
            />
          </div>

          {/* Display Number */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              الرقم الذي سيتم عرضه للعميل
            </label>
            <input
              type="text"
              value={formData.displayNumber}
              onChange={(e) => handleInputChange('displayNumber', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل العدد"
              dir="rtl"
            />
          </div>

          {/* Section Name */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              اسم القسم الذي ينتمي اليه المنتج
            </label>
            <input
              type="text"
              value={formData.sectionName}
              onChange={(e) => handleInputChange('sectionName', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل اسم القسم"
              dir="rtl"
            />
          </div>

          {/* Category Belonging */}
          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              اسم الفئه التي ينتمي اليها المنتج
            </label>
            <input
              type="text"
              value={formData.categoryBelonging}
              onChange={(e) => handleInputChange('categoryBelonging', e.target.value)}
              className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="ادخل اسم الفئه"
              dir="rtl"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-evenly">
          <button 
            onClick={handleSaveEdit}
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg whitespace-nowrap hover:bg-blue-700 transition-colors duration-200"
          >
            <Edit3 className="w-5 h-5 shrink-0 inline-flex mr-1" />
            <span className="leading-none">حفظ التعديل</span>
          </button>

          <button 
            onClick={handleAddProduct}
            className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors duration-200"
          >
            <FaCloudUploadAlt className="w-5 h-5 shrink-0 inline-flex mr-1" />
            <span className="leading-none">إضافة المنتج</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;