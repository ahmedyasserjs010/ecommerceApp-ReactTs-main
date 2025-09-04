import { useEffect, useState } from "react";
import { ThemeProvider } from "../../contexts/themeContext";
import { Outlet } from "react-router-dom";
import { ThemeContextType } from "../../Types/ThemeContextType";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { UserContextProvider } from "../../contexts/userContext";
import ScrollToTop from "../ScrollToTop";
import AdminSidebar from "../AdminSidebare/AdminSidebare";

const queryClient = new QueryClient();

export default function AdminLayout() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const isDark = localStorage.getItem("darkMode");
    return isDark === "true";
  });

  const [scrolled, setScrolled] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // حالة السايدبار

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // handle scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
    const bodyElement = document.body;
    if (bodyElement) {
      if (darkMode) {
        bodyElement.classList.add("dark");
      } else {
        bodyElement.classList.remove("dark");
      }
    }
  }, [darkMode]);

  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <ThemeProvider value={{ darkMode, toggleDarkMode } as ThemeContextType}>
          <div className="flex min-h-screen">
            {/* تمرير حالة السايدبار ودالة التحديث */}
            <AdminSidebar 
              isOpen={sidebarOpen} 
              setIsOpen={setSidebarOpen} 
            />
            
            {/* المحتوى الرئيسي مع هامش متغير بناءً على حالة السايدبار */}
            <div 
              className={`flex-1 flex flex-col transition-all duration-300 ${
                sidebarOpen ? 'lg:ml-70' : 'lg:ml-30'
              }`}
            >
              <main className="flex-1 p-6 dark:bg-gray-800 transition-all duration-300 pl-12">
                <ScrollToTop />
                <Outlet />
              </main>
            </div>

            <ReactQueryDevtools />
            <Toaster />
          </div>
        </ThemeProvider>
      </UserContextProvider>
    </QueryClientProvider>
  );
}