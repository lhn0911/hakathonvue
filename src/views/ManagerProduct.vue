<template>
  <div class="container">
    <!-- Sidebar component -->
    <Sidebar />

    <!-- Main content area with header and product management content -->
    <div class="main-content">
      <Header />
      <div class="product-management">
        <h2>Manager Product</h2>
        <!-- Add your product management content here -->
      </div>
    </div>
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  components: {
    Header,
    Sidebar,
  },
};
</script>
  
  <style scoped>
.container {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

.main-content {
  margin-left: 200px; /* Sidebar width */
  width: calc(100% - 200px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
}

.product-management {
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 60px; /* Adjust for header */
}

h2 {
  margin-bottom: 20px;
}
</style>
  