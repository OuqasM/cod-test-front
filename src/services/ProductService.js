import axios from '../axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const DatabaseService = {
  // Get all products
  async getProducts(sortField, filterCategory) {
    const params = {};

    if (sortField) {
      params.sort = sortField;
    }

    if (filterCategory) {
      params.category = filterCategory;
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`, {
        params: params,
      });
      return response.data.data.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },
  
  // create a product
  createProduct(data) {
    return axios.post(`${API_BASE_URL}/api/products`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

  },

  // fetch all categories
  async getAllCategories() {
    let data =  (await axios.get(`${API_BASE_URL}/api/categories`)).data.data;
    // console.log(dd.data.data);
    return data;
  },

};

export default DatabaseService;
