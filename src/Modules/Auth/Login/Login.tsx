import { useFormik } from 'formik';
import { LoginSchema } from '../../../services/Auth/validation';
import { useLogin } from '../../../services/Auth/Hooks/useLogin';
import { LoginPayload } from '../../../services/types';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import SpinnersCart from '../../../shared_components/SpinnersCart/SpinnersCart';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
    const { mutate, isPending } = useLogin();
    const [showPassword, setShowPassword] = useState(false);
    const { setUserLogin } = useContext(UserContext);
    const navigate = useNavigate();

    function clearLocalStorage() {
        localStorage.clear();
    }

    useEffect(() => {
        clearLocalStorage();
    }, [])

    function handleSubmit(values: LoginPayload) {
        mutate(values, {
            onSuccess: (response) => {
                toast.success("Login successful! 🎉");
                localStorage.setItem("token", response.token);
                localStorage.setItem("user", JSON.stringify(response.user));
                setUserLogin(response.token);
                navigate("/");
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Login failed! ❌");
            }
        });
    }

    let Formik = useFormik<LoginPayload>({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: handleSubmit,
        validationSchema: LoginSchema
    });

    // Show spinner overlay during login process
    if (isPending) {
        return <SpinnersCart />;
    }

    return (
        <div className="flex flex-col md:flex-row justify-center items-center bg-orange-50 dark:bg-gray-900 rounded-4xl my-10 p-5 max-w-6xl mx-auto shadow-lg shadow-orange-400 dark:shadow-orange-400">
            
            {/* Lottie Section */}
            <div className="w-full md:w-1/2 flex justify-center items-center p-5">
                <DotLottieReact
                    src="https://lottie.host/857450bd-c413-43de-a1f3-cd3c05c0eb4a/VtbiEKlQfJ.lottie"
                    loop
                    autoplay
                    className="max-w-lg md:max-w-2xl w-full"
                />
            </div>

            {/* Form Section */}
            <form
                onSubmit={Formik.handleSubmit}
                className="w-full md:w-1/2 bg-orange-50 dark:bg-gray-900 p-8 md:p-12 rounded-lg"
            >
                <h1 className="text-3xl font-bold mb-6 text-orange-700 dark:text-orange-600 text-center md:text-left">
                    Login
                </h1>

                {/* Email Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.email}
                        onChange={Formik.handleChange}
                        type="email"
                        name="email"
                        id="email"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-orange-500 focus:outline-none focus:ring-0 
                        focus:border-orange-600 peer"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="email"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
                        peer-focus:dark:text-orange-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Email address
                    </label>
                    {Formik.touched.email && Formik.errors.email && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.email}
                        </div>
                    )}
                </div>

                {/* Password Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        onBlur={Formik.handleBlur}
                        value={Formik.values.password}
                        onChange={Formik.handleChange}
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent 
                        border-0 border-b-2 border-gray-300 appearance-none 
                        dark:text-white dark:border-gray-600 
                        dark:focus:border-orange-500 focus:outline-none focus:ring-0 
                        focus:border-orange-600 peer pr-8"
                        placeholder=" "
                        disabled={isPending}
                    />
                    <label
                        htmlFor="password"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 
                        dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 
                        -z-10 origin-[0] peer-focus:start-0 peer-focus:text-orange-600 
                        peer-focus:dark:text-orange-500 
                        peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                        peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        Password
                    </label>
                    
                    {/* Eye Icon Toggle */}
                    <button
                        type="button"
                        className="absolute right-0 top-3 text-gray-500 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isPending}
                    >
                        {showPassword ? <FaEye className="text-lg" /> : <FaEyeSlash className="text-lg" />}
                    </button>
                    
                    {Formik.touched.password && Formik.errors.password && (
                        <div className="mt-2 text-sm px-3 py-2 rounded-md shadow-sm text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900/40">
                            {Formik.errors.password}
                        </div>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-center text-white 
                    bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none 
                    focus:ring-orange-300 font-medium rounded-lg text-sm 
                    dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800 
                    disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isPending}
                >
                    {isPending ? "Signing in..." : "Login"}
                </button>
            </form>
        </div>
    );
}