import React, { useState, useRef } from 'react';
import { Upload, Image, Edit3, Save, X, Eye, Plus, Trash2, AlertCircle } from 'lucide-react';

const EditMainSlider = () => {
  const [sliderImages, setSliderImages] = useState([
    { id: 1, url: 'https://via.placeholder.com/800x400/ff7300/ffffff?text=صورة+1', name: 'صورة 1' },
    { id: 2, url: 'https://via.placeholder.com/800x400/f54900/ffffff?text=صورة+2', name: 'صورة 2' },
    { id: 3, url: 'https://via.placeholder.com/800x400/ffb566/ffffff?text=صورة+3', name: 'صورة 3' },
    { id: 4, url: 'https://via.placeholder.com/800x400/272f3d/ffffff?text=صورة+4', name: 'صورة 4' },
    { id: 5, url: 'https://via.placeholder.com/800x400/1e2938/ffffff?text=صورة+5', name: 'صورة 5' }
  ]);
  
  const [selectedImageId, setSelectedImageId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [nextId, setNextId] = useState(6);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSaveImage = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsUploading(true);
    
    // محاكاة عملية الرفع
    setTimeout(() => {
      setSliderImages(prev => 
        prev.map(img => 
          img.id === selectedImageId 
            ? { ...img, url: previewUrl, name: selectedFile.name }
            : img
        )
      );
      
      setSelectedFile(null);
      setPreviewUrl(null);
      setIsUploading(false);
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const handleCancelUpload = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // إضافة سلايد جديد
  const handleAddSlide = () => {
    const newSlide = {
      id: nextId,
      url: `https://via.placeholder.com/800x400/cccccc/000000?text=صورة+جديدة+${nextId}`,
      name: `صورة جديدة ${nextId}`
    };
    
    setSliderImages(prev => [...prev, newSlide]);
    setNextId(prev => prev + 1);
    setSelectedImageId(newSlide.id);
  };

  // حذف سلايد
  const handleDeleteSlide = (slideId) => {
    if (sliderImages.length <= 1) {
      alert('لا يمكن حذف جميع الصور. يجب الاحتفاظ بصورة واحدة على الأقل.');
      return;
    }

    setSliderImages(prev => prev.filter(img => img.id !== slideId));
    
    // إذا كانت الصورة المحذوفة هي المحددة، اختر أول صورة متاحة
    if (selectedImageId === slideId) {
      const remainingImages = sliderImages.filter(img => img.id !== slideId);
      if (remainingImages.length > 0) {
        setSelectedImageId(remainingImages[0].id);
      }
    }
    
    setShowDeleteConfirm(null);
  };

  // إعادة ترتيب الصور
  const handleMoveSlide = (slideId, direction) => {
    const currentIndex = sliderImages.findIndex(img => img.id === slideId);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === sliderImages.length - 1)
    ) {
      return;
    }

    const newImages = [...sliderImages];
    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    
    // تبديل المواضع
    [newImages[currentIndex], newImages[targetIndex]] = [newImages[targetIndex], newImages[currentIndex]];
    
    setSliderImages(newImages);
  };

  const currentImage = sliderImages.find(img => img.id === selectedImageId);

  return (
    <div className="min-h-screen p-8 bg-orange-50 dark:bg-gray-800" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <Edit3 size={32} className="text-orange-500" />
            إدارة صور السلايدر
          </h1>
          
          {/* زر إضافة سلايد جديد */}
          <button
            onClick={handleAddSlide}
            className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            إضافة سلايد جديد
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* قسم التحكم */}
          <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                تعديل الصور
              </h2>
              <span className="text-sm text-gray-500 bg-orange-100 px-3 py-1 rounded-full dark:bg-gray-600 dark:text-gray-300">
                إجمالي الصور: {sliderImages.length}
              </span>
            </div>

            {/* اختيار رقم الصورة */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                اختر الصورة المراد تعديلها
              </label>
              <select
                value={selectedImageId}
                onChange={(e) => setSelectedImageId(Number(e.target.value))}
                className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-orange-50 border-orange-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
              >
                {sliderImages.map((img, index) => (
                  <option key={img.id} value={img.id}>
                    صورة رقم {index + 1} - {img.name}
                  </option>
                ))}
              </select>
            </div>

            {/* أزرار التحكم في الصورة المحددة */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg dark:bg-gray-600">
              <h3 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
                إدارة الصورة المحددة
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleMoveSlide(selectedImageId, 'up')}
                  disabled={sliderImages.findIndex(img => img.id === selectedImageId) === 0}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↑ تحريك لأعلى
                </button>
                <button
                  onClick={() => handleMoveSlide(selectedImageId, 'down')}
                  disabled={sliderImages.findIndex(img => img.id === selectedImageId) === sliderImages.length - 1}
                  className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ↓ تحريك لأسفل
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(selectedImageId)}
                  disabled={sliderImages.length <= 1}
                  className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <Trash2 size={14} />
                  حذف
                </button>
              </div>
            </div>

            {/* رفع الصورة الجديدة */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                رفع صورة جديدة
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <button
                onClick={handleUploadClick}
                className="w-full p-4 border-2 border-dashed rounded-lg transition-all hover:scale-105 flex items-center justify-center gap-3 border-orange-300 text-gray-600 dark:border-gray-600 dark:text-gray-300 bg-orange-500/10"
              >
                <Upload size={24} />
                {selectedFile ? `تم اختيار: ${selectedFile.name}` : 'اضغط لاختيار صورة'}
              </button>
            </div>

            {/* معاينة الصورة الجديدة */}
            {previewUrl && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                  معاينة الصورة الجديدة
                </label>
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="معاينة"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={handleCancelUpload}
                    className="absolute top-2 left-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* أزرار الحفظ */}
            {selectedFile && (
              <div className="flex gap-3">
                <button
                  onClick={handleSaveImage}
                  disabled={isUploading}
                  className="flex-1 px-4 py-3 rounded-lg text-white font-medium transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600"
                >
                  {isUploading ? (
                    <>
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                      جاري الحفظ...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      حفظ التغييرات
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancelUpload}
                  className="px-4 py-3 rounded-lg border-2 transition-all hover:scale-105 border-orange-300 text-gray-600 hover:bg-orange-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  إلغاء
                </button>
              </div>
            )}
          </div>

          {/* قسم المعاينة */}
          <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
              <Eye size={24} />
              معاينة الصورة الحالية
            </h2>

            {currentImage && (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={currentImage.url}
                    alt={currentImage.name}
                    className="w-full h-64 object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <p className="text-white font-medium">
                      {currentImage.name}
                    </p>
                    <p className="text-gray-300 text-sm">
                      الترتيب: {sliderImages.findIndex(img => img.id === selectedImageId) + 1} من {sliderImages.length}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* شريط الصور السفلي */}
        <div className="mt-8 p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              جميع صور السلايدر ({sliderImages.length})
            </h3>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              اضغط على أي صورة لتحديدها
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {sliderImages.map((img, index) => (
              <div
                key={img.id}
                onClick={() => setSelectedImageId(img.id)}
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ${
                  selectedImageId === img.id 
                    ? 'ring-4 ring-orange-500' 
                    : 'ring-2 ring-transparent'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  className="w-full h-24 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                  <p className="text-white text-xs font-medium truncate">
                    #{index + 1} - {img.name.length > 10 ? img.name.substring(0, 10) + '...' : img.name}
                  </p>
                </div>
                {selectedImageId === img.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    ✓
                  </div>
                )}
                
                {/* مؤشر الترتيب */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* نافذة تأكيد الحذف */}
        {showDeleteConfirm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-6 max-w-md mx-4 shadow-2xl">
              <div className="flex items-center gap-3 mb-4 text-red-600">
                <AlertCircle size={24} />
                <h3 className="text-lg font-semibold">تأكيد الحذف</h3>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                هل أنت متأكد من حذف هذه الصورة؟ لن يمكن استرداد هذا الإجراء.
              </p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-600 transition-colors"
                >
                  إلغاء
                </button>
                <button
                  onClick={() => handleDeleteSlide(showDeleteConfirm)}
                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  حذف
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditMainSlider;