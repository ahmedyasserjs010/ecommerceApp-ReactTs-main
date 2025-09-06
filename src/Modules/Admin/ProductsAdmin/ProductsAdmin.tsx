import React, { useState, useMemo } from 'react';
import { Edit, Trash2, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { AiFillProduct } from "react-icons/ai";
import { CiCirclePlus } from "react-icons/ci";
import { Link } from 'react-router-dom';
import SearchableDropdown from '../SearchableDropdown/SearchableDropdown';

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

const ProductsAdmin = () => {
  const [selectedSection, setSelectedSection] = useState("");

  const [searchTerm, setSearchTerm] = useState('');
  const [sectionSearch, setSectionSearch] = useState('');
  const [categorySearch, setCategorySearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Filter items based on search terms
  const filteredItems = useMemo(() => {
    let filtered = dishesAndTools;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Add section and category filtering logic here when needed

    return filtered;
  }, [searchTerm, sectionSearch, categorySearch]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sectionSearch, categorySearch]);

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
    <div className="min-h-screen bg-orange-50 dark:bg-slate-700 p-6 rounded-3xl">
      {/* Header */}
      <div className="mb-8" dir="rtl">
        <h1 className="text-3xl font-bold flex gap-3 text-gray-800 dark:text-white text-right p-3">
          <AiFillProduct className="text-4xl text-orange-500" />
          إدارة المنتجات
        </h1>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Search and Filter Section */}
        <div className="text-center mb-8 border-1 border-t-2 border-x-0 border-orange-400 border-b-0 mt-8">
          <div className="my-8">
            <h3 className="text-2xl md:text-3xl font-bold dark:text-white text-gray-800 mb-2 mt-6">
              كل منتجات الأقسام
            </h3>

            <div className="flex justify-center items-end flex-row-reverse gap-3">


              <div className="w-50">
                {/* <label htmlFor="partName" className="text-xl text-gray-700 block">
                  
                </label> */}
                <SearchableDropdown
                  label="اسم القسم المراد عرضه "
                  placeholder="اختر القسم"
                  options={All_Sections}
                  value={selectedSection}
                  setValue={setSelectedSection}
                />
              </div>

                            <div className="w-50">

                <SearchableDropdown
                  label="اسم الفئة المراد عرضه "
                  placeholder="اختر الفئة"
                  options={All_Category}
                  value={selectedSection}
                  setValue={setSelectedSection}
                />
              </div>

                <div className="text-end ">
                <label htmlFor="productName" className="text-lg text-gray-700 block">
                  اسم المنتج المراد عرضه
                </label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-4 w-75 pr-12 py-3 mt-2 border border-orange-200 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 text-right focus:outline-none focus:ring-2 focus:ring-orange-500 dark:focus:ring-slate-500"
                  placeholder="البحث عن المنتج..."
                  dir="rtl"
                  id="productName"
                />
              </div>

              <div className="">

                <Link to="/admin/addProduct">
                  <button className="px-4 py-3 bg-orange-500 text-white rounded-lg cursor-pointer">
                    <span>
                      إضافة منتج جديد<CiCirclePlus className="inline-block ml-2 text-xl font-bold  " />
                    </span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2">
            عدد النتائج: {filteredItems.length} من {dishesAndTools.length}
          </p>
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
              لم يتم العثور على منتجات تطابق بحثك
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

export default ProductsAdmin;