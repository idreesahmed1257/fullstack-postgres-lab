import React from "react";
import { Grid } from "@mui/material";
import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../../utils/interfaces";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../Redux/store";
import { addItem } from "../../../Redux/slice/product.slice";

interface ProductWrapperProps {
  products: Product[];
}

const ProductWrapper: React.FC<ProductWrapperProps> = ({ products }) => {
  const dispatch = useDispatch<AppDispatch>();

  const prodState = useSelector((state: RootState) => state.product);

  const addToCart = (product: Product) => {
    dispatch(addItem({ product }));
  };

  const checkSelectedItem = (currentProduct: Product): boolean => {
    return prodState.cartItems.some((item) => item.id === currentProduct.id);
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} padding={2}>
      {products.map((product) => (
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
