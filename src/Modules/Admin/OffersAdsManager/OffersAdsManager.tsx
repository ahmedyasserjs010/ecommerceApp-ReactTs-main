import React, { useState, useRef } from 'react';
import { Upload, Image, Edit3, Save, X, Eye, Type, FileText, EyeOff, ToggleLeft, ToggleRight, Plus, Trash2, ChevronDown } from 'lucide-react';

const OffersAdsManager = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      title: 'عرض رقم 1',
      content: 'نص العرض الأول - خصم 50% على جميع المنتجات',
      image: 'https://via.placeholder.com/800x400/ff7300/ffffff?text=عرض+1',
      type: 'text',
      isVisible: true
    },
    {
      id: 2,
      title: 'عرض رقم 2',
      content: 'نص العرض الثاني - توصيل مجاني لفترة محدودة',
      image: 'https://via.placeholder.com/800x400/f54900/ffffff?text=عرض+2',
      type: 'image',
      isVisible: true
    },
    {
      id: 3,
      title: 'عرض رقم 3',
      content: 'نص العرض الثالث - اشترك الآن واحصل على خصم إضافي',
      image: 'https://via.placeholder.com/800x400/ffb566/ffffff?text=عرض+3',
      type: 'text',
      isVisible: false
    },
    {
      id: 4,
      title: 'عرض رقم 4',
      content: 'نص العرض الرابع - عروض حصرية للعملاء الجدد',
      image: 'https://via.placeholder.com/800x400/272f3d/ffffff?text=عرض+4',
      type: 'image',
      isVisible: true
    }
  ]);

  const [selectedOfferId, setSelectedOfferId] = useState(1);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [offerText, setOfferText] = useState('');
  const [offerType, setOfferType] = useState('text');
  const [isUploading, setIsUploading] = useState(false);
  const [viewFilter, setViewFilter] = useState('all'); // all, visible, hidden
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

  const handleSaveOffer = () => {
    if (offerType === 'image' && (!selectedFile || !previewUrl)) return;
    if (offerType === 'text' && !offerText.trim()) return;

    setIsUploading(true);

    setTimeout(() => {
      setOffers(prev =>
        prev.map(offer =>
          offer.id === selectedOfferId
            ? {
              ...offer,
              content: offerType === 'text' ? offerText : offer.content,
              image: offerType === 'image' && previewUrl ? previewUrl : offer.image,
              type: offerType
            }
            : offer
        )
      );

      setSelectedFile(null);
      setPreviewUrl(null);
      setOfferText('');
      setIsUploading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 1500);
  };

  const handleCancelEdit = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setOfferText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleOfferSelect = (offerId) => {
    setSelectedOfferId(offerId);
    const selectedOffer = offers.find(offer => offer.id === offerId);
    if (selectedOffer) {
      setOfferType(selectedOffer.type);
      if (selectedOffer.type === 'text') {
        setOfferText(selectedOffer.content);
      }
    }
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const toggleOfferVisibility = (offerId) => {
    setOffers(prev =>
      prev.map(offer =>
        offer.id === offerId
          ? { ...offer, isVisible: !offer.isVisible }
          : offer
      )
    );
  };

  // إضافة عرض جديد
  const addNewOffer = () => {
    const newId = Math.max(...offers.map(offer => offer.id)) + 1;
    const newOffer = {
      id: newId,
      title: `عرض رقم ${newId}`,
      content: '',
      image: `https://via.placeholder.com/800x400/ff7300/ffffff?text=عرض+${newId}`,
      type: 'text',
      isVisible: true
    };
    
    setOffers(prev => [...prev, newOffer]);
    setSelectedOfferId(newId);
    setOfferType('text');
    setOfferText('');
  };

  // حذف عرض
  const deleteOffer = (offerId) => {
    if (offers.length <= 1) {
      alert('يجب أن يبقى عرض واحد على الأقل');
      return;
    }
    
    setOffers(prev => prev.filter(offer => offer.id !== offerId));
    
    // إذا كان العرض المحذوف هو المحدد حاليا، اختر عرض آخر
    if (selectedOfferId === offerId) {
      const remainingOffers = offers.filter(offer => offer.id !== offerId);
      if (remainingOffers.length > 0) {
        setSelectedOfferId(remainingOffers[0].id);
        setOfferType(remainingOffers[0].type);
        if (remainingOffers[0].type === 'text') {
          setOfferText(remainingOffers[0].content);
        }
      }
    }
  };

  const getFilteredOffers = () => {
    switch (viewFilter) {
      case 'visible':
        return offers.filter(offer => offer.isVisible);
      case 'hidden':
        return offers.filter(offer => !offer.isVisible);
      default:
        return offers;
    }
  };

  const getVisibilityStats = () => {
    const visible = offers.filter(offer => offer.isVisible).length;
    const hidden = offers.filter(offer => !offer.isVisible).length;
    return { visible, hidden, total: offers.length };
  };

  const currentOffer = offers.find(offer => offer.id === selectedOfferId);
  const filteredOffers = getFilteredOffers();
  const stats = getVisibilityStats();

  return (
    <div className="min-h-screen p-8 bg-orange-50 dark:bg-gray-800 rounded-3xl" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-gray-800 dark:text-white">
            <FileText size={32} className="text-orange-500" />
            إدارة الإعلانات والعروض
          </h1>

          {/* إحصائيات سريعة */}
          <div className="flex items-center gap-4 text-sm">
            <div className="px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
              مرئية: {stats.visible}
            </div>
            <div className="px-3 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
              مخفية: {stats.hidden}
            </div>
            <div className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
              المجموع: {stats.total}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* قسم التحكم */}
          <div className="xl:col-span-1 space-y-6">
            {/* قسم تعديل العرض */}
            <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  تعديل العرض
                </h2>
                <button
                  onClick={addNewOffer}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition-colors"
                >
                  <Plus size={16} />
                  إضافة عرض
                </button>
              </div>

              {/* اختيار العرض */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                  اختر العرض المراد تعديله
                </label>
                <select
                  value={selectedOfferId}
                  onChange={(e) => handleOfferSelect(Number(e.target.value))}
                  className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-orange-50 border-orange-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                >
                  {offers.map(offer => (
                    <option key={offer.id} value={offer.id}>
                      {offer.title} {!offer.isVisible && '(مخفي)'}
                    </option>
                  ))}
                </select>
              </div>

              {/* إظهار/إخفاء العرض المحدد */}
              {currentOffer && (
                <div className="mb-6 p-4 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {currentOffer.isVisible ? (
                        <Eye size={20} className="text-green-500" />
                      ) : (
                        <EyeOff size={20} className="text-red-500" />
                      )}
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {currentOffer.isVisible ? 'العرض مرئي' : 'العرض مخفي'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleOfferVisibility(selectedOfferId)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all hover:scale-105"
                      >
                        {currentOffer.isVisible ? (
                          <>
                            <ToggleRight size={24} className="text-green-500" />
                            <span className="text-sm text-green-600 dark:text-green-400">مرئي</span>
                          </>
                        ) : (
                          <>
                            <ToggleLeft size={24} className="text-red-500" />
                            <span className="text-sm text-red-600 dark:text-red-400">مخفي</span>
                          </>
                        )}
                      </button>
                      {offers.length > 1 && (
                        <button
                          onClick={() => deleteOffer(selectedOfferId)}
                          className="px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* اختيار نوع العرض */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                  نوع العرض
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOfferType('text')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${offerType === 'text'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'border-orange-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
                      }`}
                  >
                    <Type size={18} />
                    نص
                  </button>
                  <button
                    onClick={() => setOfferType('image')}
                    className={`flex-1 p-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${offerType === 'image'
                      ? 'bg-orange-500 text-white border-orange-500'
                      : 'border-orange-300 text-gray-600 dark:border-gray-600 dark:text-gray-300'
                      }`}
                  >
                    <Image size={18} />
                    صورة
                  </button>
                </div>
              </div>

              {/* تعديل النص */}
              {offerType === 'text' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    نص العرض
                  </label>
                  <textarea
                    value={offerText}
                    onChange={(e) => setOfferText(e.target.value)}
                    placeholder="اكتب نص العرض هنا..."
                    rows={6}
                    className="w-full p-3 rounded-lg border-2 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all bg-orange-50 border-orange-300 text-gray-800 dark:bg-gray-800 dark:border-gray-600 dark:text-white resize-none"
                  />
                </div>
              )}

              {/* رفع صورة العرض */}
              {offerType === 'image' && (
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
                    صورة العرض
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
              )}

              {/* معاينة الصورة الجديدة */}
              {offerType === 'image' && previewUrl && (
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
                      onClick={handleCancelEdit}
                      className="absolute top-2 left-2 p-1 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
              )}

              {/* أزرار الحفظ */}
              {((offerType === 'text' && offerText.trim()) || (offerType === 'image' && selectedFile)) && (
                <div className="flex gap-3">
                  <button
                    onClick={handleSaveOffer}
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
                    onClick={handleCancelEdit}
                    className="px-4 py-3 rounded-lg border-2 transition-all hover:scale-105 border-orange-300 text-gray-600 hover:bg-orange-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    إلغاء
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* قسم المعاينة */}
          <div className="xl:col-span-2 space-y-6">
            {/* معاينة العرض الحالي */}
            <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-800 dark:text-white">
                <Eye size={24} />
                معاينة العرض الحالي
                {currentOffer && !currentOffer.isVisible && (
                  <span className="text-sm px-2 py-1 rounded-full bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                    مخفي
                  </span>
                )}
              </h2>

              {currentOffer && (
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-orange-500 mb-4 border-b-2 border-orange-500 pb-2 inline-block">
                      {currentOffer.title}
                    </h3>
                  </div>

                  {currentOffer.type === 'text' ? (
                    <div className="min-h-64 p-6 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
                      <div className="text-center">
                        <Type size={48} className="mx-auto mb-4 text-gray-400" />
                        <p className="text-lg text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                          {offerText || currentOffer.content}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        src={previewUrl || currentOffer.image}
                        alt={currentOffer.title}
                        className="w-full h-80 object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* جميع العروض */}
            <div className="p-6 rounded-xl shadow-lg border bg-white border-orange-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  جميع العروض والإعلانات
                </h3>

                {/* فلتر العروض */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${viewFilter === 'all'
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                  >
                    الكل ({stats.total})
                  </button>
                  <button
                    onClick={() => setViewFilter('visible')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${viewFilter === 'visible'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                  >
                    مرئية ({stats.visible})
                  </button>
                  <button
                    onClick={() => setViewFilter('hidden')}
                    className={`px-3 py-1 rounded-lg text-sm transition-all ${viewFilter === 'hidden'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-600 dark:bg-gray-600 dark:text-gray-300'
                      }`}
                  >
                    مخفية ({stats.hidden})
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {filteredOffers.map((offer, index) => (
                  <div
                    key={offer.id}
                    className={`relative cursor-pointer rounded-lg overflow-hidden transition-all hover:scale-105 ${selectedOfferId === offer.id
                      ? 'ring-4 ring-orange-500'
                      : 'ring-2 ring-transparent'
                      } ${!offer.isVisible
                        ? 'opacity-60 grayscale'
                        : ''
                      }`}
                  >
                    <div onClick={() => handleOfferSelect(offer.id)}>
                      {offer.type === 'text' ? (
                        <div className="h-24 bg-gradient-to-br from-orange-100 to-orange-200 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center p-2">
                          <Type size={24} className="text-orange-500" />
                        </div>
                      ) : (
                        <img
                          src={offer.image}
                          alt={offer.title}
                          className="w-full h-24 object-cover"
                        />
                      )}
                    </div>

                    {/* رقم العرض */}
                    <div className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {index + 1}
                    </div>

                    {/* شريط المعلومات */}
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                      <div className="flex items-center justify-between">
                        <p className="text-white text-xs font-medium truncate flex-1">
                          {offer.title}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleOfferVisibility(offer.id);
                          }}
                          className="ml-2"
                        >
                          {offer.isVisible ? (
                            <Eye size={14} className="text-green-400" />
                          ) : (
                            <EyeOff size={14} className="text-red-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* علامة التحديد */}
                    {selectedOfferId === offer.id && (
                      <div className="absolute top-2 left-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        ✓
                      </div>
                    )}

                    {/* علامة الحالة */}
                    <div className="absolute bottom-2 left-2">
                      {offer.isVisible ? (
                        <div className="w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      ) : (
                        <div className="w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersAdsManager;