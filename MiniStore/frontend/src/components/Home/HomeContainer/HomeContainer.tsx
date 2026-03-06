import { Search } from "@mui/icons-material";
import { CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../../services/product.service";
import ProductWrapper from "../ProductWrapper/ProductWrapper";
import { productsKeys } from "./helper";

const HomeContainer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: productsKeys.all(debouncedSearchTerm),
    queryFn: () => fetchProducts({ searchTerm: debouncedSearchTerm }),
    staleTime: 1000 * 60,
    enabled: true,
  });

  return (
    <Grid py={3}>
      <div className="px-10 mb-10">
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Browse our latest collection and add your favorites to the cart.
        </Typography>
      </div>

      <div className="flex justify-center w-full">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 pl-10 pr-3 placeholder-gray-400 rounded-lg bg-bg-paper text-primary focus:outline-none"
          />
          <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-primary" />
        </div>
      </div>

      <br />

      <div className="flex items-center justify-center">
        {isLoading ? (
          <Stack className="flex h-[50vh] justify-center items-center">
            <CircularProgress />
          </Stack>
        ) : isError ? (
          <Stack className="flex h-[50vh] justify-center items-center">
            <Typography color="error">Failed to load products.</Typography>
          </Stack>
        ) : (
          <ProductWrapper products={products} />
        )}
      </div>
    </Grid>
  );
};

export default HomeContainer;
