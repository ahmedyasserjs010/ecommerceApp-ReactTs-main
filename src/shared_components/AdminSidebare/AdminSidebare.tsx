import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaTachometerAlt,
  FaBox,
  FaHome,
  FaUtensils,
  FaStore,
  FaSignOutAlt,
  FaFileUpload,
  FaGift,
} from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { TfiLayoutSlider } from "react-icons/tfi";

import {
  GiKitchenScale,
  GiPressureCooker,
  GiWoodenChair,
  GiPorcelainVase
} from "react-icons/gi";
import {
  MdOutlineMicrowave,
  MdOutlineCoffeeMaker,
  MdBlender,
  MdOutlineFoodBank
} from "react-icons/md";
import {
  IoIosArrowForward,
  IoMdHome,
  IoIosRestaurant
} from "react-icons/io";
import DarkModeBtn from "../DarkModeBtn";
import logo from "../../../public/logo8.png";
import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";
import { Percent } from "lucide-react";

// تحديث الـ Props لتقبل حالة السايدبار ودالة التحديث
interface AdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function AdminSidebar({ isOpen, setIsOpen }: AdminSidebarProps) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const { setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (!event.target.closest('.dropdown-toggle')) {
          setActiveDropdown(null);
          setActiveMegaMenu(null);
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function LogOut() {
    Swal.fire({
      title: 'هل أنت متأكد أنك تريد تسجيل الخروج؟ 🤔',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: '🚪 خروج',
      cancelButtonText: '🏠 سأبقى في الموقع',
      reverseButtons: true,
      customClass: {
        confirmButton: 'bg-orange-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-orange-700 transition-all duration-200 focus:outline-none border-none',
        cancelButton: 'bg-gray-100 text-gray-700 font-medium px-5 py-2 rounded-md hover:bg-gray-200 transition-all duration-200 border border-gray-300',
        actions: 'space-x-4'
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        setUserLogin(null);
        navigate('/login');
      }
    });
  }

  const handleDropdownToggle = (menuId, menuType) => {
    if (menuType === "mega") {
      setActiveMegaMenu(activeMegaMenu === menuId ? null : menuId);
      setActiveDropdown(null);
    } else if (menuType === "dropdown") {
      setActiveDropdown(activeDropdown === menuId ? null : menuId);
      setActiveMegaMenu(null);
    }
  };

  // عناصر القائمة الخاصة بالأدمن مع أيقونات
  const adminNavItems = [
    // {
    //   label: "لوحة التحكم",
    //   path: "/admin/dashboard",
    //   type: "link",
    //   id: "dashboard",
    //   icon: <FaTachometerAlt className="text-xl" />
    // },
    {
      label: "تغيير صور السلايدر",
      path: "/admin/editSlider",
      type: "link",
      id: "editSlider",
      icon: <TfiLayoutSlider className="text-xl" />
    },
    {
      label: "إضافة العروض",
      path: "/admin/addOffers",
      type: "link",
      id: "addOffers",
      icon: <FaGift className="text-xl" />

    },
    {
      label: "إدارة المنتجات",
      path: "/admin/products",
      type: "link",
      id: "products",
      icon: <AiFillProduct className="text-xl" />,
      columns: [
        {
          title: "الأدوات البلاستيكية",
          items: [
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
          ]
        }
      ]
    },
    {
      label: "إدارة الخصومات",
      path: "/admin/discount",
      type: "link",
      id: "discount",
      icon: <Percent className="text-xl" />,
    },
    // {
    //   label: "إدارة الأدوات المنزلية",
    //   path: "/admin/housewares",
    //   type: "mega",
    //   id: "housewares",
    //   icon: <FaHome className="text-xl" />,
    //   columns: [
    //     {
    //       title: "الادوات المنزلية الثقيلة",
    //       items: [
    //         "أطقم صينى",
    //         "الزركونايل",
    //         "الألواني والحلل",
    //         "بوستلنس",
    //         "أطقم الشاى",
    //         "شنط الملوك",
    //         "أطقم استانلس",
    //         "برطمانات حفظ",
    //         "صواني تقديم"
    //       ]
    //     },
    //     {
    //       title: "الادوات المنزلية الخفيفة",
    //       items: [
    //         "مقاليين تيفال",
    //         "جريل كهربائي",
    //         "حلل ضغط",
    //         "مقالي سيراميك",
    //         "التوزيع والتنظيم",
    //         "ليانت تقديم",
    //         "أكواب وأطباق",
    //         "زجاجات مياه",
    //         "التوائل والبهارات"
    //       ]
    //     }
    //   ]
    // },
    // {
    //   label: "إدارة أجهزة الطبخ",
    //   path: "/admin/cookware",
    //   type: "mega",
    //   id: "cookware",
    //   icon: <FaUtensils className="text-xl" />,
    //   columns: [
    //     {
    //       title: "أجهزة الفطار",
    //       items: [
    //         "غلايات",
    //         "ماكينة الاسبريسو",
    //         "توستر",
    //         "كنكة قهوة",
    //         "وافل ميكر",
    //         "مايكروويف",
    //         "مسطح كهربائية"
    //       ]
    //     },
    //     {
    //       title: "عجانات ومحضرات الطعام",
    //       items: [
    //         "عجانات",
    //         "محضرات طعام",
    //         "خلاطات",
    //         "قلايات",
    //         "هاند بلندر",
    //         "كبات",
    //         "مضارب بيض",
    //         "مفرمة لحوم",
    //         "أفران كهربائية",
    //         "شوايات كهربائية"
    //       ]
    //     }
    //   ]
    // },
    // {
    //   label: "العودة للمتجر",
    //   path: "/",
    //   type: "link",
    //   id: "back-to-store",
    //   icon: <FaStore className="text-xl" />
    // }
  ];

  // وظيفة للحصول على الأيقونة المناسبة للعنصر
  const getItemIcon = (itemName) => {
    const iconMap = {
      "غلايات": <MdOutlineCoffeeMaker />,
      "ماكينة الاسبريسو": <MdOutlineCoffeeMaker />,
      "توستر": <IoIosRestaurant />,
      "كنكة قهوة": <MdOutlineCoffeeMaker />,
      "وافل ميكر": <IoIosRestaurant />,
      "مايكروويف": <MdOutlineMicrowave />,
      "مسطح كهربائية": <MdOutlineMicrowave />,
      "عجانات": <MdBlender />,
      "محضرات طعام": <MdBlender />,
      "خلاطات": <MdBlender />,
      "قلايات": <GiPressureCooker />,
      "هاند بلندر": <MdBlender />,
      "كبات": <MdOutlineFoodBank />,
      "مضارب بيض": <MdBlender />,
      "مفرمة لحوم": <MdBlender />,
      "أفران كهربائية": <MdOutlineMicrowave />,
      "شوايات كهربائية": <IoIosRestaurant />,
      "جردل": <GiPorcelainVase />,
      "طقم العروسة": <GiPorcelainVase />,
      "كراسي بلاستيك": <GiWoodenChair />,
      "زبالات": <GiPorcelainVase />,
      "دواليب بلاستيك": <GiPorcelainVase />,
      "ستاندات مطبخ": <GiPorcelainVase />,
      "لانش بوكس": <GiPorcelainVase />,
      "بستلات": <GiPorcelainVase />,
      "طشت": <GiPorcelainVase />,
      "سبت": <GiPorcelainVase />,
      "علب ثلاجة": <GiPorcelainVase />,
      "شانون بلاستيك": <GiPorcelainVase />,
    };

    return iconMap[itemName] || <FaBox />;
  };

  return (
    <div className="flex">
      {/* Desktop Sidebar */}
      <div
        ref={dropdownRef}
        className={`bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md h-screen transition-all duration-300 fixed top-0 left-0 z-30 ${isOpen ? 'w-70' : 'w-30'}`}
      >
        <div className="p-4 h-full flex flex-col">
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-200 dark:border-gray-700">
            {isOpen && (
              <Link to="/admin" className="flex items-center">
                <span className="font-bold dark:text-white flex items-center gap-2">
                  <img src={logo} alt="RIOMax" className="w-32" />
                </span>
              </Link>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer text-orange-600 dark:text-orange-400 p-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
            >
              {isOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
            </button>
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Navigation Items */}
            <div className="space-y-1 mb-6">
              <h3 className={` text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2 ${!isOpen && 'sr-only'}`}>
                إدارة المتجر
              </h3>
              {adminNavItems.map((item) => (
                <div key={item.id || item.path} className="w-full">
                  {item.type === "link" ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `
                      ${isOpen ? 'border-b-2 ' : ' flex justify-center '} 
                      border-2 border-orange-600 flex items-center w-full px-4 py-3 text-right rounded-lg transition-all duration-200 font-medium ${isActive
                          ? "bg-orange-600 text-white shadow-md"
                          : "hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400"
                        }`
                      }
                    >
                      <span className={` ${isOpen ? ' mr-2 ' : ' flex justify-center '} `}>{item.icon}</span>
                      {isOpen && <span className="flex-1">{item.label}</span>}
                    </NavLink>
                  ) : (
                    <div>
                      <NavLink to={item.path}
                        onClick={() => handleDropdownToggle(item.id, item.type)}
                        className={({ isActive }) =>
                          `
                      ${isOpen ? 'border-b-2 ' : ' flex justify-center '} 
                      border-2 border-orange-600 flex items-center justify-between w-full px-4 py-3 text-right rounded-lg transition-all duration-200 font-medium ${isActive
                            ? "bg-orange-600 text-white shadow-md"
                            : "hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400"
                          }`
                        }
                      >
                        <div className="flex items-center">
                          <span className={` ${isOpen ? ' mr-2 ' : ' flex justify-center '} `}>{item.icon}</span>
                          {isOpen && <span className="flex-1 text-right">{item.label}</span>}
                        </div>
                        {isOpen && (
                          <FaChevronDown
                            className={`text-sm transition-transform duration-200 ${(activeMegaMenu === item.id) ? 'rotate-180' : ''}`}
                          />
                        )}
                      </NavLink>

                      {/* Mega Menu Content */}
                      {isOpen && item.type === "mega" && activeMegaMenu === item.id && (
                        <div className="mt-2 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border-r-4 border-orange-600 shadow-inner">
                          <div className="space-y-4">
                            {item.columns.map((column, columnIndex) => (
                              <div key={columnIndex} className="mb-4 last:mb-0">
                                <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-right text-sm border-b border-orange-200 dark:border-gray-700 pb-2">
                                  {column.title}
                                </h4>
                                <div className="space-y-2">
                                  {column.items.map((subItem, itemIndex) => (
                                    <Link
                                      key={itemIndex}
                                      to={`${item.path}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                      className="flex items-center text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-2 px-3 text-right text-sm rounded hover:bg-white dark:hover:bg-gray-700"
                                      onClick={() => setActiveMegaMenu(null)}
                                    >
                                      <span className="ml-2 text-xs">{getItemIcon(subItem)}</span>
                                      <span className="flex-1">{subItem}</span>
                                      <IoIosArrowForward className="text-xs opacity-60" />
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-auto pt-6 border-t border-orange-200 dark:border-gray-700 ">
            {/* Dark Mode Toggle */}
            <div className={` flex items-center justify-center mb-4 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg transition-all duration-200 ${!isOpen ? 'justify-center ' : ''}`}>
              <DarkModeBtn setIsOpen={setIsOpen} />
            </div>

            {/* Logout Button */}
            <button
              onClick={LogOut}
              className={`flex  items-center justify-between w-full px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium ${!isOpen ? 'justify-center' : ''}`}
            >
              <FaSignOutAlt />
              {isOpen && <span>تسجيل الخروج</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black opacity-40 z-20 lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        onClick={() => setIsOpen(false)}
      />
    </div>
  );
}

/*

light :
#fff7ed
#ff7300
#f54900
#ffb566

dark :
#272f3d
#1e2938
#414d5c
*/