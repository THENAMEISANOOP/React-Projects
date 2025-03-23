import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/product/${product.id}`); 
    };

    return (
        <div
            className="max-w-sm bg-white shadow-md rounded-lg overflow-hidden relative p-4 cursor-pointer"
            onClick={handleClick}
        >
            {/* Product Image */}
            <div className="flex justify-center">
                <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-40 object-cover rounded-lg"
                />
            </div>

            {/* Product Details */}
            <div className="mt-3">
                <div className="text-lg font-bold text-gray-800">{product.title}</div>
                <div className="text-m font-semibold text-gray-600">₹{product.price}</div>

                <div className="flex justify-between items-center mt-2">
                    <div className="text-s text-gray-500">{product.category}</div>
                </div>
            </div>

            {/* Date at Bottom-Right */}
            <div className="absolute bottom-2 right-2 text-sm text-gray-500">
                {new Date(product.createdAt?.seconds * 1000).toLocaleDateString()}
            </div>
        </div>
    );
};

export default ProductCard;
