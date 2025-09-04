import React, { useState, useMemo } from 'react';
import { Upload, Edit, Trash2, Search, ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

// Import dishes images
import Dishes1 from "../../../assets/images/dishes/1.png";
import Dishes2 from "../../../assets/images/dishes/2.png";
import Dishes3 from "../../../assets/images/dishes/3.png";
import Dishes4 from "../../../assets/images/dishes/4.png";
import Dishes5 from "../../../assets/images/dishes/5.png";
import Dishes6 from "../../../assets/images/dishes/6.png";
import Dishes7 from "../../../assets/images/dishes/7.png";
import Dishes8 from "../../../assets/images/dishes/8.png";
import Dishes9 from "../../../assets/images/dishes/9.png";
import Dishes10 from "../../../assets/images/dishes/10.png";
import Dishes11 from "../../../assets/images/dishes/11.png";
import Dishes12 from "../../../assets/images/dishes/12.png";
import Dishes13 from "../../../assets/images/dishes/13.png";
import Dishes14 from "../../../assets/images/dishes/14.png";
import Dishes15 from "../../../assets/images/dishes/15.png";
import Dishes16 from "../../../assets/images/dishes/16.png";
import Dishes17 from "../../../assets/images/dishes/17.png";
import Dishes18 from "../../../assets/images/dishes/18.png";
import Dishes19 from "../../../assets/images/dishes/19.png";
import Dishes20 from "../../../assets/images/dishes/20.png";
import Dishes21 from "../../../assets/images/dishes/21.png";
import Dishes22 from "../../../assets/images/dishes/22.png";
import Dishes23 from "../../../assets/images/dishes/23.png";
import Dishes24 from "../../../assets/images/dishes/24.png";
import Dishes25 from "../../../assets/images/dishes/25.png";
import Dishes26 from "../../../assets/images/dishes/26.png";
import Dishes27 from "../../../assets/images/dishes/27.png";
import Dishes28 from "../../../assets/images/dishes/28.png";
import Dishes29 from "../../../assets/images/dishes/29.png";
import Dishes30 from "../../../assets/images/dishes/30.png";
import Dishes31 from "../../../assets/images/dishes/31.png";
import Dishes32 from "../../../assets/images/dishes/32.png";
import Dishes33 from "../../../assets/images/dishes/33.png";
import Dishes34 from "../../../assets/images/dishes/34.png";
import Dishes35 from "../../../assets/images/dishes/35.png";
import Dishes36 from "../../../assets/images/dishes/36.png";
import Dishes37 from "../../../assets/images/dishes/37.png";
import Dishes38 from "../../../assets/images/dishes/38.png";
import Dishes39 from "../../../assets/images/dishes/39.png";
import Dishes40 from "../../../assets/images/dishes/40.png";
import Dishes41 from "../../../assets/images/dishes/41.png";
import * as Yup from 'yup';
import { GiPorcelainVase } from 'react-icons/gi';
import { FaCloudUploadAlt, FaHome } from 'react-icons/fa';

const dishesAndTools = [
  {
    img: Dishes1,
    title: "طقم أواني طبخ استانلس 12 قطعة مع أغطية زجاجية",
    oldPrice: "LE 2,599.00",
    newPrice: "LE 1,999.00",
    discount: "23%",
  },
  {
    img: Dishes2,
    title: "مقلاة سيراميك مضادة للالتصاق 28 سم مع غطاء",
    oldPrice: "LE 599.00",
    newPrice: "LE 449.00",
    discount: "25%",
  },
  {
    img: Dishes3,
    title: "طقم سكاكين مطبخ ألماني 8 قطع مع حامل خشبي",
    oldPrice: "LE 899.00",
    newPrice: "LE 699.00",
    discount: "22%",
  },
  {
    img: Dishes4,
    title: "طقم أطباق بورسلين فاخر 24 قطعة لـ 6 أشخاص",
    oldPrice: "LE 1,299.00",
    newPrice: "LE 999.00",
    discount: "23%",
  },
  {
    img: Dishes5,
    title: "مجموعة حافظات طعام زجاجية بأغطية محكمة 10 قطع",
    oldPrice: "LE 749.00",
    newPrice: "LE 579.00",
    discount: "23%",
  },
  {
    img: Dishes6,
    title: "خلاط يدوي كهربائي 5 سرعات مع إكسسوارات",
    oldPrice: "LE 399.00",
    newPrice: "LE 299.00",
    discount: "25%",
  },
  {
    img: Dishes7,
    title: "طقم أكواب قهوة وشاي بورسلين 12 قطعة",
    oldPrice: "LE 459.00",
    newPrice: "LE 349.00",
    discount: "24%",
  },
  {
    img: Dishes8,
    title: "لوح تقطيع خشب طبيعي مضاد للبكتيريا مجموعة 3 قطع",
    oldPrice: "LE 299.00",
    newPrice: "LE 229.00",
    discount: "23%",
  },
  {
    img: Dishes9,
    title: "طقم ملاعق وشوك استانلس فاخر 24 قطعة",
    oldPrice: "LE 799.00",
    newPrice: "LE 599.00",
    discount: "25%",
  },
  {
    img: Dishes10,
    title: "حلة ضغط استانلس 8 لتر مع صمام أمان",
    oldPrice: "LE 1,199.00",
    newPrice: "LE 899.00",
    discount: "25%",
  },
  {
    img: Dishes11,
    title: "طقم قدور جرانيت مضادة للالتصاق 7 قطع",
    oldPrice: "LE 1,599.00",
    newPrice: "LE 1,199.00",
    discount: "25%",
  },
  {
    img: Dishes12,
    title: "مبشرة متعددة الاستخدامات مع حاوية تجميع",
    oldPrice: "LE 199.00",
    newPrice: "LE 149.00",
    discount: "25%",
  },
  {
    img: Dishes13,
    title: "طقم صواني تقديم استانلس مقاوم للصدأ 3 قطع",
    oldPrice: "LE 699.00",
    newPrice: "LE 529.00",
    discount: "24%",
  },
  {
    img: Dishes14,
    title: "ميزان مطبخ رقمي دقيق حتى 5 كيلو",
    oldPrice: "LE 349.00",
    newPrice: "LE 269.00",
    discount: "23%",
  },
  {
    img: Dishes15,
    title: "طقم أوعية خلط مضادة للانزلاق 5 أحجام مختلفة",
    oldPrice: "LE 459.00",
    newPrice: "LE 349.00",
    discount: "24%",
  },
  {
    img: Dishes16,
    title: "مصفاة خضروات قابلة للطي سيليكون عملية",
    oldPrice: "LE 179.00",
    newPrice: "LE 129.00",
    discount: "28%",
  },
  {
    img: Dishes17,
    title: "طقم كاسات عصير زجاج ملون 6 قطع مع صينية",
    oldPrice: "LE 399.00",
    newPrice: "LE 299.00",
    discount: "25%",
  },
  {
    img: Dishes18,
    title: "فتاحة علب كهربائية أوتوماتيكية بدون جهد",
    oldPrice: "LE 299.00",
    newPrice: "LE 229.00",
    discount: "23%",
  },
  {
    img: Dishes19,
    title: "طقم حافظات بهارات زجاجية مع ملصقات 12 قطعة",
    oldPrice: "LE 549.00",
    newPrice: "LE 419.00",
    discount: "24%",
  },
  {
    img: Dishes20,
    title: "مقص مطبخ متعدد الاستخدامات استانلس حاد",
    oldPrice: "LE 149.00",
    newPrice: "LE 109.00",
    discount: "27%",
  },
  {
    img: Dishes21,
    title: "طقم أطباق تقديم خزفية بتصميم عربي أصيل 6 قطع",
    oldPrice: "LE 899.00",
    newPrice: "LE 679.00",
    discount: "24%",
  },
  {
    img: Dishes22,
    title: "حافظة خبز فولاذية مضادة للصدأ بغطاء شفاف",
    oldPrice: "LE 459.00",
    newPrice: "LE 349.00",
    discount: "24%",
  },
  {
    img: Dishes23,
    title: "طقم أكواب شاي زجاجية مقاومة للحرارة 6 قطع",
    oldPrice: "LE 349.00",
    newPrice: "LE 259.00",
    discount: "26%",
  },
  {
    img: Dishes24,
    title: "مطحنة فلفل وملح كهربائية LED مجموعة قطعتين",
    oldPrice: "LE 399.00",
    newPrice: "LE 299.00",
    discount: "25%",
  },
  {
    img: Dishes25,
    title: "طقم سلطانيات سيراميك ملونة للسلطات 8 قطع",
    oldPrice: "LE 649.00",
    newPrice: "LE 489.00",
    discount: "25%",
  },
  {
    img: Dishes26,
    title: "مقشرة خضروات متعددة الشفرات مع واقي إصبع",
    oldPrice: "LE 99.00",
    newPrice: "LE 79.00",
    discount: "20%",
  },
  {
    img: Dishes27,
    title: "طقم قوالب كيك سيليكون مختلفة الأشكال 12 قطعة",
    oldPrice: "LE 449.00",
    newPrice: "LE 339.00",
    discount: "24%",
  },
  {
    img: Dishes28,
    title: "منظم أدراج مطبخ بلاستيك شفاف قابل للتعديل",
    oldPrice: "LE 199.00",
    newPrice: "LE 149.00",
    discount: "25%",
  },
  {
    img: Dishes29,
    title: "طقم ترامس حفظ الطعام الحار والبارد 3 أحجام",
    oldPrice: "LE 899.00",
    newPrice: "LE 699.00",
    discount: "22%",
  },
  {
    img: Dishes30,
    title: "مصباح LED تحت الخزائن يعمل بالبطارية",
    oldPrice: "LE 249.00",
    newPrice: "LE 189.00",
    discount: "24%",
  },
  {
    img: Dishes31,
    title: "طقم فرش تنظيف الزجاجات والقوارير 5 قطع",
    oldPrice: "LE 159.00",
    newPrice: "LE 119.00",
    discount: "25%",
  },
  {
    img: Dishes32,
    title: "حامل أكياس القمامة قابل للطي وسهل التركيب",
    oldPrice: "LE 179.00",
    newPrice: "LE 129.00",
    discount: "28%",
  },
  {
    img: Dishes33,
    title: "طقم مناشف مطبخ قطنية ماصة للماء 6 قطع",
    oldPrice: "LE 299.00",
    newPrice: "LE 229.00",
    discount: "23%",
  },
  {
    img: Dishes34,
    title: "منظف فرن طبيعي فعال مع إسفنجة تنظيف",
    oldPrice: "LE 89.00",
    newPrice: "LE 69.00",
    discount: "22%",
  },
  {
    img: Dishes35,
    title: "طقم حصائر طعام مضادة للانزلاق 4 قطع ألوان متدرجة",
    oldPrice: "LE 199.00",
    newPrice: "LE 149.00",
    discount: "25%",
  },
  {
    img: Dishes36,
    title: "جهاز تقطيع البصل دون دموع مع حاوية تجميع",
    oldPrice: "LE 259.00",
    newPrice: "LE 199.00",
    discount: "23%",
  },
  {
    img: Dishes37,
    title: "طقم أدوات طبخ سيليكون مقاومة للحرارة 10 قطع",
    oldPrice: "LE 549.00",
    newPrice: "LE 419.00",
    discount: "24%",
  },
  {
    img: Dishes38,
    title: "منظم توابل دوار 2 طبقة يحمل 16 علبة بهارات",
    oldPrice: "LE 399.00",
    newPrice: "LE 299.00",
    discount: "25%",
  },
  {
    img: Dishes39,
    title: "طقم قفازات فرن سيليكون مقاومة للحرارة مع حصيرة",
    oldPrice: "LE 149.00",
    newPrice: "LE 119.00",
    discount: "20%",
  },
  {
    img: Dishes40,
    title: "آلة صنع الآيس كريم المنزلية سعة 1.5 لتر",
    oldPrice: "LE 1,299.00",
    newPrice: "LE 999.00",
    discount: "23%",
  },
  {
    img: Dishes41,
    title: "طقم فناجين قهوة تركية نحاسية أصلية مع صينية",
    oldPrice: "LE 799.00",
    newPrice: "LE 599.00",
    discount: "25%",
  },
];

const HousewaresAdmin = () => {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryPrice: '',
    itemDescription: '',
    sectionDisplay: '',
    discountDuration: '',
    availableQuantity: ''
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm) return dishesAndTools;
    return dishesAndTools.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEdit = (item) => {
    console.log('تعديل المنتج:', item);
  };

  const handleDelete = (item) => {
    console.log('حذف المنتج:', item);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 dark:bg-slate-700 p-6 rounded-3xl ">

      <div className="mb-8" dir="rtl">
        <h1 className="text-3xl font-bold flex gap-3 text-gray-800 dark:text-white text-right">
        إدارة الأدوات المنزلية
          <FaHome className="text-3xl text-orange-300 " />

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

          <div className="w-100">
            <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
              الرقم الذي سيتم عرضه للعميل
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
        </div>

<div className="flex justify-evenly">

        <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg whitespace-nowrap">
          <Edit3 className="w-5 h-5 shrink-0  inline-flex mr-1" />
          <span className="leading-none">حفظ التعديل</span>
        </button>


        <button className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg">
          <FaCloudUploadAlt className="w-5 h-5 shrink-0 inline-flex mr-1" />
          <span className="leading-none">إضافة المنتج</span>
        </button>

</div>

        {/* Section Display */}
        <div className="border-2 border-x-0 border-orange-400 my-6 py-4">
          <label className="block text-slate-700 dark:text-slate-300 font-medium mb-2 text-right">
            يمكنك ان تدخل هنا نسبه الخصم التي تريد ان تعملها على هذا القسم اذا اردت
          </label>
          <input
            type="text"
            value={formData.sectionDisplay}
            onChange={(e) => handleInputChange('sectionDisplay', e.target.value)}
            className="w-full p-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
            placeholder="ادخل النسبه"
            dir="rtl"
          />
        </div>

        {/* Products Section Header */}
        <div className="text-center mb-8">
          <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-800 mb-2">
            كل المنتجات الخاصه بالقسم
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            عدد النتائج: {filteredItems.length} من {dishesAndTools.length}
          </p>
        </div>


        {/* Search Section */}
        <div className="mb-8">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-12 py-3 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
              placeholder="البحث عن منتج..."
              dir="rtl"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {currentItems.map((item, idx) => (
            <div
              key={startIndex + idx}
              className="rounded-2xl shadow-lg bg-white dark:bg-gray-800 overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 border-2 border-orange-500 group h-full"
            >
              <div className="p-4 flex flex-col items-center text-center h-full">
                <div className="relative overflow-hidden rounded-lg flex-shrink-0 w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-48 object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs px-2 py-1 rounded-full font-semibold animate-pulse">
                    -{item.discount}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between mt-4 w-full">
                  <h3 className="text-sm font-semibold dark:text-white text-gray-800 line-clamp-3 mb-3 min-h-[3.6rem]">
                    {item.title}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm line-through text-gray-400">
                      {item.oldPrice}
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      {item.newPrice}
                    </p>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-1"
                      >
                        <Edit className="h-4 w-4" />
                        تعديل
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-colors duration-200 font-medium shadow-md hover:shadow-lg text-sm flex items-center justify-center gap-1"
                      >
                        <Trash2 className="h-4 w-4" />
                        حذف
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results Message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              لا توجد نتائج
            </h3>
            <p className="text-gray-500 dark:text-gray-500">
              لم يتم العثور على منتجات تطابق بحثك "{searchTerm}"
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 space-x-reverse mt-8">
            {/* Previous Button */}
            <button
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              className={`
                flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${currentPage === 1
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg'
                }
              `}
            >
              <ChevronRight className="h-4 w-4 ml-1" />
              السابق
            </button>

            {/* Page Numbers */}
            <div className="flex space-x-1 space-x-reverse">
              {/* First page */}
              {currentPage > 3 && (
                <>
                  <button
                    onClick={() => goToPage(1)}
                    className="px-3 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    1
                  </button>
                  {currentPage > 4 && (
                    <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                  )}
                </>
              )}

              {/* Page range around current page */}
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(page => {
                  if (totalPages <= 7) return true;
                  if (currentPage <= 3) return page <= 5;
                  if (currentPage >= totalPages - 2) return page >= totalPages - 4;
                  return page >= currentPage - 2 && page <= currentPage + 2;
                })
                .map(page => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`
                      px-3 py-2 rounded-lg font-medium transition-all duration-200
                      ${page === currentPage
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-gray-200 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                      }
                    `}
                  >
                    {page}
                  </button>
                ))}

              {/* Last page */}
              {currentPage < totalPages - 2 && totalPages > 7 && (
                <>
                  {currentPage < totalPages - 3 && (
                    <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                  )}
                  <button
                    onClick={() => goToPage(totalPages)}
                    className="px-3 py-2 rounded-lg font-medium transition-all duration-200 bg-gray-200 dark:bg-gray-700 hover:bg-orange-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                  >
                    {totalPages}
                  </button>
                </>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              className={`
                flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-200
                ${currentPage === totalPages
                  ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700 text-white shadow-md hover:shadow-lg'
                }
              `}
            >
              التالي
              <ChevronLeft className="h-4 w-4 mr-1" />
            </button>
          </div>
        )}

        {/* Pagination Info */}
        {filteredItems.length > 0 && (
          <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-400">
            عرض {startIndex + 1} إلى {Math.min(endIndex, filteredItems.length)} من {filteredItems.length} منتج
          </div>
        )}
      </div>
    </div>
  );
};

export default HousewaresAdmin;