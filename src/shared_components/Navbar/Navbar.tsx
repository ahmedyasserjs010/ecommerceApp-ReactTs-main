import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaCartPlus, FaHeart, FaChevronDown } from "react-icons/fa";
import DarkModeBtn from "../DarkModeBtn";
import logo from "../../../public/logo8.png";

import { UserContext } from "../../contexts/userContext";
import Swal from "sweetalert2";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const { userLogin, setUserLogin } = useContext(UserContext);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);
  const dropdownRef = useRef(null);

  // إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    function handleClickOutside(event) {
      // إغلاق السيدبار عند النقر خارجها
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (!event.target.closest('.menu-button')) {
          setIsOpen(false);
        }
      }

      // إغلاق القوائم المنسدلة عند النقر خارجها
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

  // حفظ موضع التمرير واستعادته
  useEffect(() => {
    if (isOpen) {
      // حفظ موضع التمرير الحالي قبل فتح السيدبار
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);

      // منع التمرير على الصفحة الخلفية
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${currentScrollPosition}px`;
      document.body.style.width = '100%';
    } else {
      // استعادة التمرير عند إغلاق السيدبار
      const bodyScrollTop = scrollPosition;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');

      // استعادة موضع التمرير الأصلي بدون انيميشن
      window.scrollTo(0, bodyScrollTop);
    }

    return () => {
      // تنظيف الستايلات عند إلغاء الكومبوننت
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
    };
  }, [isOpen]);

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

  const toggleMenu = () => {
    if (!isOpen) {
      // عند فتح السيدبار، احفظ موضع التمرير الحالي أولاً
      setScrollPosition(window.pageYOffset);
    }
    setIsOpen(!isOpen);
  };

  // وظائف للتحكم بالنقر في الدسكتوب
  const handleDropdownToggle = (menuId, menuType) => {
    if (menuType === "mega") {
      if (activeMegaMenu === menuId) {
        setActiveMegaMenu(null);
      } else {
        setActiveMegaMenu(menuId);
        setActiveDropdown(null);
      }
    } else if (menuType === "dropdown") {
      if (activeDropdown === menuId) {
        setActiveDropdown(null);
      } else {
        setActiveDropdown(menuId);
        setActiveMegaMenu(null);
      }
    }
  };

  const navItems = [
    {
      label: "الصفحة الرئيسية",
      path: "/",
      type: "link",
      id: "home",
    },
    {
      label: "الادوات المنزلية",
      path: "/housewares",
      type: "mega",
      id: "housewares",
      columns: [
        {
          title: "الادوات المنزلية الثقيلة",
          items: [
            "أطقم صينى",
            "الزركونايل",
            "الألواني والحلل",
            "بوستلنس",
            "أطقم الشاى",
            "شنط الملوك",
            "أطقم استانلس",
            "برطمانات حفظ",
            "صواني تقديم"
          ]
        },
        {
          title: "الادوات المنزلية الخفيفة",
          items: [
            "مقاليين تيفال",
            "جريل كهربائي",
            "حلل ضغط",
            "مقالي سيراميك",
            "التوزيع والتنظيم",
            "ليانت تقديم",
            "أكواب وأطباق",
            "زجاجات مياه",
            "التوائل والبهارات"
          ]
        }
      ]
    },
    {
      label: "أجهزة الطبخ",
      path: "/Cookware",
      type: "mega",
      id: "cookware",
      columns: [
        {
          title: "أجهزة الفطار",
          items: [
            "غلايات",
            "ماكينة الاسبريسو",
            "توستر",
            "كنكة قهوة",
            "وافل ميكر",
            "مايكروويف",
            "مسطح كهربائية"
          ]
        },
        {
          title: "عجانات ومحضرات الطعام",
          items: [
            "عجانات",
            "محضرات طعام",
            "خلاطات",
            "قلايات",
            "هاند بلندر",
            "كبات",
            "مضارب بيض",
            "مفرمة لحوم",
            "أفران كهربائية",
            "شوايات كهربائية"
          ]
        }
      ]

    },
    {
      label: "البلاستيك",
      path: "/Plastic",
      type: "mega",
      id: "plastic",
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
    }
  ];

  return (
    <nav
      ref={dropdownRef}
      className="py-3 bg-orange-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-md w-full transition-colors duration-300 relative flex-row-reverse"
    >
      <div className="container mx-auto flex justify-between gap-2 items-center px-4 pt-2 flex-row-reverse pb-2">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="font-bold dark:text-white flex items-center gap-2">
            <img src={logo} alt="RIOMax" className="w-45" />
          </span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input type="text" className="border border-gray-300 rounded-md p-2 w-full focus:outline-orange-400  " placeholder="Search..." />
        </div>

        {/* Desktop Right Section */}
        <div className="hidden lg:flex items-center flex-row-reverse gap-2 ">
          {userLogin === null ? (
            <div className="flex gap-1">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300  ${isActive
                    ? "bg-orange-600 text-white shadow-md"
                    : "hover:bg-orange-100 hover:dark:bg-orange-800 hover:text-orange-600 dark:hover:text-orange-300"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                    ? "bg-orange-600 text-white shadow-md"
                    : "hover:bg-orange-100 hover:dark:bg-orange-800 hover:text-orange-600 dark:hover:text-orange-300"
                  }`
                }
              >
                Signup
              </NavLink>
            </div>
          ) : (
            <div className="flex space-x-4 text-xl ">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative transition-all duration-300 ${isActive ? "scale-125 text-orange-600 dark:text-orange-300" : ""
                  }`
                }
              >
                <FaCartPlus className="cursor-pointer text-3xl hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </NavLink>

              <NavLink
                to="/wishlist"
                className={({ isActive }) =>
                  `relative transition-all duration-300 ${isActive ? "scale-125 text-orange-600 dark:text-orange-300" : ""
                  }`
                }
              >
                <FaHeart className="cursor-pointer text-3xl hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  5
                </span>
              </NavLink>
            </div>
          )}

          {/* Dark Mode Button */}
          <DarkModeBtn setIsOpen={setIsOpen} />

          {userLogin !== null && (
            <button
              onClick={LogOut}
              className="cursor-pointer text-gray-600 dark:text-gray-200 text-lg font-medium hover:text-orange-600 dark:hover:text-orange-300 transition-colors duration-300"
            >
              تسجيل الخروج
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className={`menu-button cursor-pointer lg:hidden text-2xl transition-all duration-300 relative  ${isOpen
            ? "text-white bg-orange-600 p-2 rounded-full shadow-lg"
            : "text-orange-600 dark:text-orange-400"
            }`}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Desktop Menu */}
      {userLogin !== null ? (
        <div className="hidden lg:flex items-center justify-center relative pb-2 flex-row-reverse">
          {navItems.map((item) => (
            <div
              key={item.id || item.path}
              className="relative group"
            >
              {item.type === "link" ? (
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3  py-3 rounded-md text-lg font-medium transition-all duration-300 ${isActive
                      ? "bg-orange-600 text-white shadow-md"
                      : "hover:bg-orange-100 hover:dark:bg-orange-800 hover:text-orange-600 dark:hover:text-orange-300"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ) : (
                <div className="relative flex items-center">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      ` flex items-center gap-1 px-3 py-2 rounded-md text-lg font-medium transition-all duration-300
                          ${isActive ||
                        activeMegaMenu === item.id ||
                        activeDropdown === item.id
                        ? "bg-orange-600 text-white shadow-md"
                        : "hover:bg-orange-100 hover:dark:bg-orange-800 hover:text-orange-600 dark:hover:text-orange-300"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>

                  {/* زرار منفصل لفتح الدروب داون */}
                  <button
                    type="button"
                    onClick={() => handleDropdownToggle(item.id, item.type)}
                    className="ml-1 p-2 rounded-md transition-all duration-200 hover:bg-orange-100 dark:hover:bg-orange-800"
                  >
                    <FaChevronDown
                      className={`text-xl transition-transform duration-200 ${activeMegaMenu === item.id || activeDropdown === item.id
                        ? "rotate-180 text-orange-600"
                        : ""
                        }`}
                    />
                  </button>

                  {/* Mega Menu */}
                  {item.type === "mega" && activeMegaMenu === item.id && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[600px] p-6 transition-all duration-200 ease-in-out"
                    >
                      <div className="grid grid-cols-2 gap-8">
                        {item.columns.map((column, columnIndex) => (
                          <div key={columnIndex}>
                            <h3 className="font-semibold text-orange-600 dark:text-orange-400 mb-3 text-lg">
                              {column.title}
                            </h3>
                            <ul className="space-y-2">
                              {column.items.map((subItem, itemIndex) => (
                                <li key={itemIndex}>
                                  <Link
                                    to={`${item.path}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                    className="block text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-1"
                                    onClick={() => setActiveMegaMenu(null)}
                                  >
                                    {subItem}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dropdown Menu */}
                  {item.type === "dropdown" && activeDropdown === item.id && (
                    <div
                      className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 shadow-xl rounded-lg border border-gray-200 dark:border-gray-700 z-50 min-w-[250px] p-4 transition-all duration-200 ease-in-out"
                    >
                      <ul className="space-y-2">
                        {item.items.map((subItem, itemIndex) => (
                          <li key={itemIndex}>
                            <Link
                              to={`${item.path}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                              className="block text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-gray-700 transition-all duration-200 py-2 px-3 rounded"
                              onClick={() => {
                                setActiveDropdown(null);
                                setActiveMegaMenu(null);
                              }}
                            >
                              {subItem}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : null}

      {/* Mobile Sidebar مع الأوفرلاي بداخله */}
      <div
        ref={sidebarRef}
        className={`fixed inset-0 lg:hidden z-40 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Overlay - يتحرك مع السيدبار من اليمين */}
        <div
          className="fixed inset-0 bg-black opacity-40"
          onClick={() => setIsOpen(false)}
        />

        {/* Sidebar Content */}
        <div
          className={`fixed inset-y-0 right-0 w-80 bg-orange-50 dark:bg-gray-900 shadow-2xl overflow-y-auto h-screen z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="p-6 h-full">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-orange-200 dark:border-gray-700">
              <h2 className="text-xl font-bold text-orange-600 dark:text-orange-400">
                القائمة الرئيسية
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className=" cursor-pointer text-white bg-orange-600 hover:text-orange-600 dark:hover:text-orange-400 p-2 hover:bg-orange-100 dark:hover:bg-gray-700 rounded-full transition-all duration-200"
              >
                <FaTimes className="text-lg " />
              </button>
            </div>

            {/* User Section or Login Section */}
            {userLogin !== null ? (
              <div className="mb-6 p-4 bg-orange-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4 font-medium">
                  مرحباً بك في RIOMax
                </p>

                {/* Cart & Wishlist Icons */}
                <div className="flex justify-between mb-4">
                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to="/cart"
                    className="relative flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-orange-50 dark:hover:bg-gray-600 flex-1 mr-2"
                  >
                    <FaCartPlus className="text-2xl text-orange-600 dark:text-orange-400 mb-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">السلة</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      3
                    </span>
                  </NavLink>

                  <NavLink
                    onClick={() => setIsOpen(false)}
                    to="/wishlist"
                    className="relative flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:bg-orange-50 dark:hover:bg-gray-600 flex-1"
                  >
                    <FaHeart className="text-2xl text-orange-600 dark:text-orange-400 mb-1" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">المفضلة</span>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      5
                    </span>
                  </NavLink>
                </div>

                <button
                  onClick={LogOut}
                  className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
                >
                  تسجيل الخروج
                </button>
              </div>
            ) : (
              <div className="mb-6 p-4 bg-orange-100 dark:bg-gray-800 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300 mb-4 text-center">
                  مرحباً بك في RIOMax
                </p>
                <div className="space-y-3">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-3 text-center bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors duration-200 font-medium"
                  >
                    تسجيل الدخول
                  </NavLink>

                  <NavLink
                    to="/signup"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-4 py-3 text-center border-2 border-orange-600 text-orange-600 dark:text-orange-400 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
                  >
                    إنشاء حساب جديد
                  </NavLink>
                </div>
              </div>
            )}

            {/* Navigation Items - Enhanced with proper routing */}
            {userLogin !== null && (
              <div className="space-y-1 mb-6">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 px-2">
                  الأقسام الرئيسية
                </h3>
                {navItems.map((item) => (
                  <div key={item.id || item.path} className="w-full">
                    {item.type === "link" ? (
                      <NavLink
                        to={item.path}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block w-full px-4 py-3 text-right text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-medium ${isActive
                            ? "bg-orange-600 text-white shadow-md"
                            : "hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400"
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ) : (
                      <div>
                        {/* Main Category Link with Active State */}
                        <div className="flex items-center">
                          <NavLink
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={({ isActive }) =>
                              `flex-1 px-4 py-3 text-right text-gray-700 dark:text-gray-300 rounded-lg transition-all duration-200 font-medium ${isActive
                                ? "bg-orange-600 text-white shadow-md"
                                : "hover:bg-orange-100 dark:hover:bg-gray-800 hover:text-orange-600 dark:hover:text-orange-400"
                              }`
                            }
                          >
                            {item.label}
                          </NavLink>
                          
                          {/* Dropdown Toggle Button */}
                          <button
                            onClick={() =>
                              item.type === "mega"
                                ? handleDropdownToggle(item.id, item.type)
                                : handleDropdownToggle(item.id, item.type)
                            }
                            className="px-3 py-3 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200"
                          >
                            <FaChevronDown
                              className={`text-sm transition-transform duration-200 ${(activeMegaMenu === item.id || activeDropdown === item.id) ? 'rotate-180' : ''
                                }`}
                            />
                          </button>
                        </div>

                        {/* Sidebar Dropdown/Mega Menu Content */}
                        {(item.type === "mega" && activeMegaMenu === item.id) ||
                          (item.type === "dropdown" && activeDropdown === item.id) ? (
                          <div className="mt-2 mr-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-3 border-r-4 border-orange-600">
                            {item.type === "mega" ? (
                              item.columns.map((column, columnIndex) => (
                                <div key={columnIndex} className="mb-4 last:mb-0">
                                  <h4 className="font-semibold text-orange-600 dark:text-orange-400 mb-2 text-right text-sm">
                                    {column.title}
                                  </h4>
                                  <div className="space-y-1">
                                    {column.items.map((subItem, itemIndex) => (
                                      <Link
                                        key={itemIndex}
                                        to={`${item.path}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                        className="block text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-2 px-3 text-right text-sm rounded hover:bg-white dark:hover:bg-gray-700"
                                        onClick={() => {
                                          setActiveMegaMenu(null);
                                          setIsOpen(false);
                                        }}
                                      >
                                        {subItem}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div className="space-y-1">
                                {item.items.map((subItem, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    to={`${item.path}/${subItem.replace(/\s+/g, '-').toLowerCase()}`}
                                    className="block text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors duration-200 py-2 px-3 text-right rounded hover:bg-white dark:hover:bg-gray-700"
                                    onClick={() => {
                                      setActiveDropdown(null);
                                      setIsOpen(false);
                                    }}
                                  >
                                    {subItem}
                                  </Link>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Dark Mode Toggle */}
            <div className="mt-auto pt-6 border-t border-orange-200 dark:border-gray-700">
              <div className="flex items-center justify-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <DarkModeBtn setIsOpen={setIsOpen} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdowns when clicking outside - Desktop */}
      {(activeDropdown || activeMegaMenu) && (
        <div
          className="fixed inset-0 z-40 hidden lg:block"
          onClick={() => {
            setActiveDropdown(null);
            setActiveMegaMenu(null);
          }}
        />
      )}
    </nav>
  );
}