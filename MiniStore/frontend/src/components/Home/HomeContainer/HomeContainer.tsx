import { Search } from "@mui/icons-material";
import { Box, CircularProgress, Grid, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ProductWrapper from "../ProductWrapper/ProductWrapper";
import styles from "./homeContainer.module.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../../../services/product.service";
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

	const { data: products = [], isLoading, isError } = useQuery({
		queryKey: productsKeys.all(debouncedSearchTerm),
		queryFn: () => fetchProducts({ searchTerm: debouncedSearchTerm }),
		staleTime: 1000 * 60, 
		enabled: true,
	});

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
				) : isError ? (
					<Stack sx={{ display: "flex", height: "50vh", justifyContent: "center", alignItems: "center" }}>
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
