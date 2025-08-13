import { Search } from "@mui/icons-material";
import { Box, CircularProgress, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import apiInterceptor from "../../../services/ApiInterceptor";
import ProductWrapper from "../ProductWrapper/ProductWrapper";
import styles from "./homeContainer.module.scss";

const HomeContainer = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await apiInterceptor.get(`/products`, { params: { searchTerm: debouncedSearchTerm } });
        setProducts(response.data?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  return (
    <Grid py={3}>
      <Box mb={4} px={10}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Browse our latest collection and add your favorites to the cart.
        </Typography>
      </Box>
      <div className={styles.searchContainer}>
        <TextField
          size="small"
          className={styles.searchBar}
          variant="standard"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search color="primary" />
              </InputAdornment>
            ),
          }}
          sx={{
            ".MuiInputBase-input": {
              p: 0,
            },
          }}
        />
      </div>
      <br />

      <div className={styles.prodContainer}>
        {isLoading ? (
          <Stack sx={{ display: "flex", height: "50vh", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </Stack>
        ) : (
          <ProductWrapper products={products} />
        )}
      </div>
    </Grid>
  );
};

export default HomeContainer;
