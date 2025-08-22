import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShoppingCart, Star, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import products from "../data/products.json";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeatures, setShowFeatures] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const foundProduct = products.find((p) => p.id.toString() === id);
        if (!foundProduct) throw new Error("Product not found");
        setProduct(foundProduct);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;
  if (!product) return <div className="text-center">No product selected</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-indigo-100 via-white to-purple-100 p-6">
      <Card className="w-full max-w-2xl backdrop-blur-xl bg-white/70 shadow-2xl rounded-2xl border border-gray-200">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-indigo-700 text-center">
            {product.name}
          </h1>

          <div className="flex justify-center space-x-3">
            <Badge>{product.category}</Badge>
            <div className="flex items-center text-yellow-500">
              <Star className="w-5 h-5 mr-1" /> {product.rating}
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-2xl font-semibold text-gray-800">
              ${product.discountPrice || product.price}
            </p>
            {product.discountPrice && (
              <p className="text-sm text-gray-500 line-through">
                ${product.price}
              </p>
            )}
          </div>

          <div className="flex justify-center items-center space-x-2">
            {product.available ? (
              <CheckCircle className="text-green-500 w-5 h-5" />
            ) : (
              <XCircle className="text-red-500 w-5 h-5" />
            )}
            <span
              className={
                product.available ? "text-green-600" : "text-red-600"
              }
            >
              {product.available ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <Button
            onClick={() => setShowFeatures(!showFeatures)}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {showFeatures ? "Hide Features" : "Show Features"}
          </Button>

          {showFeatures && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-indigo-50 rounded-lg p-4 space-y-2 shadow-inner"
            >
              {product.features.map((feature, idx) => (
                <li key={idx} className="text-gray-700">
                  • {feature}
                </li>
              ))}
            </motion.ul>
          )}

          <div className="flex justify-center space-x-4">
            <Button className="flex items-center bg-green-500 hover:bg-green-600 text-white">
              <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              Buy Now
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
