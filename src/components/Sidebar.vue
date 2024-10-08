<template>
  <div class="sidebar">
    <ul>
      <li
        :class="{ active: isActiveRoute('/admin') }"
        @click="navigate('/admin')"
      >
        Dashboard
      </li>
      <li
        :class="{ active: isActiveRoute('/admin/manager-user') }"
        @click="navigate('/admin/manager-user')"
      >
        Manager User
      </li>
      <li
        :class="{ active: isActiveRoute('/admin/manager-product') }"
        @click="navigate('/admin/manager-product')"
      >
        Manager Product
      </li>
    </ul>
  </div>
</template>
  
  <script>
import { useRoute, useRouter } from "vue-router"; // Import Vue Router hooks

export default {
  name: "Navbar",
  setup() {
    const route = useRoute(); // Lấy thông tin route hiện tại
    const router = useRouter(); // Dùng để điều hướng trang

    // Kiểm tra đường dẫn hiện tại
    const isActiveRoute = (path) => route.path === path;

    // Hàm điều hướng
    const navigate = (path) => {
      router.push(path);
    };

    return {
      isActiveRoute,
      navigate,
    };
  },
};
</script>
  
  <style scoped>
.sidebar {
  width: 200px;
  background-color: #333;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding-top: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar li {
  padding: 10px 20px;
  cursor: pointer;
}

.sidebar li.active {
  background-color: #555;
}
</style>
  