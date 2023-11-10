<template>
    <div>
      <h2>Add Product</h2>
      <form @submit.prevent="addProduct">
        <label for="name">Name:</label>
        <input type="text" v-model="productName" required />
        <br>
        <label for="description">Description:</label>
        <textarea v-model="productDescription" required></textarea>
        <br>
        <label for="price">Price:</label>
        <input type="number" v-model="productPrice" required />
        <br>
        <label for="image">Image:</label>
        <input type="file" @change="handleImageUpload" accept="image/*" />
        <br>
        <label for="categories">Categories:</label>
        <select v-model="selectedCategories" multiple>
          <!-- Options for categories -->
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
        <br>
        <button type="submit">Add Product</button>
      </form>
    </div>
  </template>
  
  <script>
import ProductService from '@/services/ProductService';

  export default {
    data() {
      return {
        productName: '',
        productDescription: '',
        productPrice: '',
        selectedCategories: [],
        productImage: null, 
        categories: [],
      };
    },
    methods: {
        handleImageUpload(event) {
            this.productImage = event.target.files[0];
            // console.log(this.productImage);
        },
        async addProduct() {
            const productData = new FormData();
            productData.append('name', this.productName);
            productData.append('description', this.productDescription);
            productData.append('price', this.productPrice);
            productData.append('image', this.productImage);
            productData.append('categories', this.selectedCategories);
    
            // call the create method from the service
            let createdProduct = await ProductService.createProduct(productData);

            console.log(createdProduct);

        },

        async fetchCategories() {
            this.categories = await ProductService.getAllCategories();
        },
    },
  async created() {
    await this.fetchCategories();
  },
};
</script>