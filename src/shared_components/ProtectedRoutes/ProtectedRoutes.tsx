import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userGroup: string;
  exp: number;
  iat?: number;
  userId?: string;
}

export default function ProtectedRoutes({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  
  // التحقق الفوري من التوكن - بدون loading states
  const token = localStorage.getItem("token");

  // إذا لم يوجد توكن، الانتقال فوراً للوجين
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  let decoded: TokenPayload | null = null;

  try {
    decoded = jwtDecode<TokenPayload>(token);
  } catch (error) {
    console.error("Invalid token:", error);
    localStorage.removeItem("token");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // التحقق من انتهاء صلاحية التوكن مع buffer time
  const bufferTime = 5 * 60 * 1000; // 5 minutes buffer
  const isExpired = decoded.exp * 1000 < Date.now() + bufferTime;
  
  if (isExpired) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  const userRole = decoded.userGroup;

  // التحكم في الوصول بناءً على الدور والمسار
  if (userRole === "SuperAdmin") {
    // الأدمن يمكنه الوصول للصفحات الإدارية فقط
    if (location.pathname.startsWith("/admin")) {
      return <>{children}</>;
    } else {
      // إذا حاول الأدمن الوصول لصفحات المستخدمين، توجيه للوحة الإدارة
      return <Navigate to="/admin" replace />;
    }
  }

  if (userRole === "SystemUser") {
    // المستخدم العادي لا يمكنه الوصول للصفحات الإدارية
    if (location.pathname.startsWith("/admin")) {
      return <Navigate to="/" replace />;
    } else {
      return <>{children}</>;
    }
  }

  // دور غير معروف - توجيه للوجين
  localStorage.removeItem("token");
  return <Navigate to="/login" replace />;
}

// Hook مساعد للحصول على معلومات المستخدم
export const useAuth = () => {
  const token = localStorage.getItem("token");
  
  if (!token) {
    return { isAuthenticated: false, userRole: null, user: null };
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const isExpired = decoded.exp * 1000 < Date.now();
    
    if (isExpired) {
      localStorage.removeItem("token");
      return { isAuthenticated: false, userRole: null, user: null };
    }

    return {
      isAuthenticated: true,
      userRole: decoded.userGroup,
      user: decoded
    };
  } catch {
    localStorage.removeItem("token");
    return { isAuthenticated: false, userRole: null, user: null };
  }
};

// دالة مساعدة للخروج
export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};