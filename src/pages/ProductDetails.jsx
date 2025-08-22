import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// ✅ This component will receive "product" as props (from clicked product)
const AddProduct = ({ product }) => {
  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-xl">
        No product selected
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 p-6 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl"
      >
        <Card className="shadow-xl rounded-2xl overflow-hidden border border-gray-200">
          {/* Product Image */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="h-80 bg-gray-100 flex items-center justify-center"
          >
            <img
              src={product.image || "https://via.placeholder.com/300"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </motion.div>

          {/* Product Info */}
          <CardContent className="p-8 space-y-6 bg-white">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-gray-900"
            >
              {product.name}
            </motion.h1>

            {/* Price */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-semibold text-green-600"
            >
              ₹{product.price}
            </motion.p>

            {/* Features */}
            <div>
              <h2 className="text-lg font-semibold mb-2 text-gray-800">
                Key Features:
              </h2>
              <ul className="list-disc ml-5 space-y-1 text-gray-700">
                {product.features?.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-6">
              <Button className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 shadow-md">
                Add to Cart
              </Button>
              <Button
                variant="outline"
                className="px-6 py-3 rounded-xl border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Buy Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AddProduct;
