// // apiClient.ts
// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: "https://ecommerce.routemisr.com/api/v1", // Base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// // ✅ Interceptor لإضافة التوكن تلقائيًا
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.token = `${token}`;
//   }
//   return config;
// });

// export default apiClient;

// apiClient.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://upskilling-egypt.com:3006/api/v1", // نفس اللي كان في Angular
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor لإضافة التوكن تلقائيًا + تعديل الـ headers
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // نفس اسم المفتاح اللي في Angular

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // زي Angular
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiClient;
