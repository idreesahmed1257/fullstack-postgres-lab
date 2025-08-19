import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../../utils/interfaces";
import { useProductStore } from "../../../stores";

interface ProductWrapperProps {
  products: Product[];
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ products }) => {
  const { cartItems, addItem } = useProductStore();

  const addToCart = (product: Product) => {
    addItem(product);
  };

  const checkSelectedItem = (currentProduct: Product): boolean => {
    return cartItems.some((item) => item.id === currentProduct.id);
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} padding={2}>
      {products.map((product: Product) => (
        <Grid key={product.id}>
          <ProductCard
            id={product.id}
            image={product.thumbnail}
            title={product.title}
            price={product.price}
            description={product.description}
            isSelected={checkSelectedItem(product)}
            onAddToCart={addToCart}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductWrapper;
