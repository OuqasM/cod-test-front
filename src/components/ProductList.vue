<template>
    <div>
        <!-- Sort dropdown -->
        <label>Sort by:</label>
        <select v-model="sortField" @change="fetchProducts">
            <option value="name">Name</option>
            <option value="price">Price</option>
        </select>

        <!-- caategory dropdown -->
        <label>filter by category:</label>
        <select v-model="filterCategory" @change="fetchProducts">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.name }}
            </option>
        </select>
    </div>

  <div>
    <h1>Product List</h1>
    <ul>
      <li v-for="product in products" :key="product.id">
        {{ product.name }} - {{ product.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import ProductService from '@/services/ProductService';

export default {
  data() {
    return {
      products: [],
      sortField: null,
      filterCategory: null,
      categories: [], // list of categories fetched from backend
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {

        this.categories = await ProductService.getAllCategories();
        this.products = await ProductService.getProducts(this.sortField, this.filterCategory);

      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
};
</script>

<style scoped>
</style>
