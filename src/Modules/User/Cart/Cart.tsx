import toast from "react-hot-toast";
import { useDisplayCartItems, useUpdateCartItem } from "../../../services/Cart/Hooks/useCart";
import { ICartProduct } from "../../../services/types";
import SpinnersCart from "../../../shared_components/SpinnersCart/SpinnersCart";
import { useQueryClient } from "@tanstack/react-query";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function Cart() {
  const { data, isLoading, error } = useDisplayCartItems();
  const { mutate: updateCartItem, isPending } = useUpdateCartItem();
  const queryClient = useQueryClient();

  const products: ICartProduct[] = data?.data?.data?.products || [];

  // Calculate totals
  const subtotal = products.reduce((total, item) => total + (item.price * item.count), 0);
  const shipping = subtotal > 0 ? 0 : 0; // Free shipping or calculate as needed
  const total = subtotal + shipping;

  // Handle quantity update - use CART ITEM ID (_id), not product ID
  const handleQuantityUpdate = (cartItemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }

    updateCartItem(
      { id: cartItemId, quantity: newQuantity }, // Use cart item _id
      {
        onSuccess: () => {
          // Invalidate and refetch cart data
          queryClient.invalidateQueries({ queryKey: ["cart"] });
          toast.success("Cart updated successfully");
        },
        onError: (error) => {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart");
        },
      }
    );
  };

  // Handle increment - use CART ITEM _id
  const handleIncrement = (item: ICartProduct) => {
    handleQuantityUpdate(item._id, item.count + 1);
  };

  // Handle decrement - use CART ITEM _id
  const handleDecrement = (item: ICartProduct) => {
    if (item.count > 1) {
      handleQuantityUpdate(item._id, item.count - 1);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  if (isLoading) return <SpinnersCart />;
  if (error) return <p className="text-red-600">Failed to load cart</p>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="text-orange-500 text-2xl">🛒</div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            سلة التسوق
          </h1>
        </div>

        {products.length > 0 ? (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            
            {/* Products List */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {products.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center gap-6">
                      
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.product.imageCover}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                          {item.product.title}
                        </h3>
                        <p className="text-orange-500 font-bold text-lg">
                          {item.price} رس
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center lg:gap-3">
                        <button
                          onClick={() => handleDecrement(item)}
                          disabled={isPending || item.count <= 1}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                            item.count <= 1 || isPending
                              ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-600 dark:text-gray-600'
                              : 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 dark:border-gray-500 dark:text-gray-300'
                          }`}
                        >
                          −
                        </button>
                        
                        <span className="min-w-[3rem] text-center text-lg font-semibold text-gray-900 dark:text-white">
                          {isPending ? "..." : item.count}
                        </span>
                        
                        <button
                          onClick={() => handleIncrement(item)}
                          disabled={isPending}
                          className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-lg font-medium transition-all duration-200 ${
                            isPending
                              ? 'border-gray-200 text-gray-300 cursor-not-allowed dark:border-gray-600 dark:text-gray-600'
                              : 'border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 dark:border-gray-500 dark:text-gray-300'
                          }`}
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 sticky top-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                  ملخص الطلب
                </h2>
                
                <div className="space-y-4">
                  
                  {/* Subtotal */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">المجموع الفرعي:</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {subtotal} رس
                    </span>
                  </div>

                  {/* Shipping */}
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300">الشحن:</span>
                    <span className="font-semibold text-green-600">
                      {shipping === 0 ? 'مجاني' : `${shipping} رس`}
                    </span>
                  </div>

                  <hr className="border-gray-200 dark:border-gray-600" />

                  {/* Total */}
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900 dark:text-white">الإجمالي:</span>
                    <span className="text-orange-500">
                      {total} رس
                    </span>
                  </div>

                </div>

                {/* Checkout Button */}
                <button 
                  className="w-full mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors duration-200 text-lg"
                  disabled={isPending}
                >
                  {isPending ? 'جاري المعالجة...' : 'إتمام الطلب'}
                </button>

              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-gray-100">
              سلة التسوق فارغة
            </h3>
            <div className="max-w-md mx-auto">
              <DotLottieReact
                src="https://lottie.host/7117a7fa-c253-4c2b-806e-54bca5a167ab/0fADBnEuyV.lottie"
                loop
                autoplay
              />
            </div>
          </div>
        )}

      </div>
    </div>
  );
}