import { AddShoppingCart } from "@mui/icons-material";
import { IconButton, useTheme } from "@mui/material";
import React from "react";
import styles from "./productCard.module.scss";
import { Product } from "../../../utils/interfaces";

interface ProductCardProps {
  id: string | number;
  image: string;
  title: string;
  price: number;
  description: string;
  isSelected?: Boolean;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, image, title, price, description, isSelected = false, onAddToCart }) => {
  const theme = useTheme();
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} />
      </div>

      <div className={styles.details}>
        <div>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.pricingContainer}>
          <div className={styles.price}>${price.toFixed(2)}</div>

          <IconButton
            className={styles.addToCart}
            onClick={() => onAddToCart({ id, thumbnail: image, title, price, description })}
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
