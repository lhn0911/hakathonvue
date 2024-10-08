<template>
  <div class="container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="content-placeholder">
        <h2>Welcome to the Dashboard</h2>
        <p>Manage your users and products from here.</p>
      </div>
    </div>
  </div>
</template>
  
  <script>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "Dashboard",
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
  margin-left: 200px;
  width: calc(100% - 200px);
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content-placeholder {
  padding: 20px;
  margin-top: 60px;
  height: calc(100vh - 70px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  margin-bottom: 20px;
}

p {
  font-size: 16px;
  color: #666;
}
</style>
  