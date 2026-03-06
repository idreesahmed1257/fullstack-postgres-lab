import { AddShoppingCart } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";
import { Product } from "../../../utils/interfaces";

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: number;
  description: string;
  isSelected?: boolean;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, description, isSelected = false, onAddToCart }) => {
  const theme = useTheme();
  return (
    <div className="bg-bg-paper rounded-xl overflow-hidden flex flex-col gap-2 transition-transform duration-200 ease-in-out w-[250px] h-full shadow-sm hover:shadow-lg hover:scale-[1.02]">
      <div className="w-full h-[200px] overflow-hidden bg-bg-main border border-primary border-b-0 rounded-t-xl">
        <img src={image} alt={title} className="object-cover w-full h-full" />
      </div>

      <div className="flex flex-col justify-between flex-1 gap-2 p-4">
        <div>
          <p className="text-[16px] font-semibold text-text-dark mb-2">{title}</p>
          <p className="text-[16px] font-medium text-text-dark">{description}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-[18px] font-medium text-primary">${price.toFixed(2)}</div>

          <IconButton
            onClick={() => onAddToCart({ id, thumbnail: image, title, price, description })}
            className={`rounded-[5px] h-10 border border-primary`}
            style={{
              backgroundColor: isSelected ? theme.palette.primary.main : theme.palette.background.default,
            }}
          >
            <AddShoppingCart
              style={{
                color: isSelected ? theme.palette.background.default : theme.palette.primary.main,
              }}
            />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
