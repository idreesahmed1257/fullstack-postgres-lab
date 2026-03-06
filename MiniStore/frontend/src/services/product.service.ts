import apiInterceptor from './ApiInterceptor';

export interface FetchProductsParams {
	searchTerm?: string;
}

export const fetchProducts = async (params: FetchProductsParams = {}) => {
	const response = await apiInterceptor.get('/products', { params });
	return response.data?.data ?? [];
};
