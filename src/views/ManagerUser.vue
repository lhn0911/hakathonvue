<template>
  <div class="container">
    <Sidebar />
    <div class="main-content">
      <Header />
      <div class="user-management">
        <div class="title-row">
          <h2>Manager User</h2>
          <button class="add-user-btn" @click="openAddModal">
            Add New User
          </button>
        </div>
        <input
          type="text"
          class="search-input"
          placeholder="Search by name or email"
          v-model="searchQuery"
        />

        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Option</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.gender }}</td>
              <td>{{ formatDate(user.dateOfBirth) }}</td>
              <td>{{ user.email }}</td>
              <td class="option-buttons">
                <button class="edit-btn" @click="openEditModal(index)">
                  Edit
                </button>
                <button class="delete-btn" @click="confirmDeleteUser(index)">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal for Add/Edit User -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal">
        <h3>{{ isEdit ? "Edit User" : "Add New User" }}</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" v-model="formData.name" required />
          </div>
          <div class="form-group">
            <label for="gender">Gender</label>
            <div class="radio-group">
              <input type="radio" value="Male" v-model="formData.gender" /> Male
              <input type="radio" value="Female" v-model="formData.gender" />
              Female
              <input type="radio" value="Other" v-model="formData.gender" />
              Other
            </div>
          </div>
          <div class="form-group">
            <label for="dateOfBirth">Date Of Birth</label>
            <input type="date" v-model="formData.dateOfBirth" required />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" v-model="formData.email" required />
          </div>
          <div v-if="formErrors" class="form-errors">
            <p v-for="error in formErrors" :key="error">{{ error }}</p>
          </div>
          <div class="modal-buttons">
            <button type="submit" class="save-btn">
              {{ isEdit ? "Save" : "Add" }}
            </button>
            <button type="button" class="close-btn" @click="closeModal">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" class="modal-overlay">
      <div class="modal">
        <h3>Xác nhận</h3>
        <p>Bạn có chắc chắn muốn xóa tài khoản này?</p>
        <div class="modal-buttons">
          <button class="close-btn" @click="closeDeleteModal">Hủy</button>
          <button class="delete-btn" @click="deleteUser">Xóa</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "../components/Header.vue";
import Sidebar from "../components/Sidebar.vue";
import { ref, reactive, onMounted, computed } from "vue";

// State variables
const users = ref([]);
const showModal = ref(false);
const showDeleteModal = ref(false);
const isEdit = ref(false);
const currentUserIndex = ref(null);
const searchQuery = ref("");
const formErrors = ref([]);
const errorMessage = ref("");

// Form data structure
const formData = reactive({
  name: "",
  gender: "Male",
  dateOfBirth: "",
  email: "",
});

// Load users from localStorage
onMounted(() => {
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
  users.value = storedUsers;
});

// Search filter
const filteredUsers = computed(() => {
  if (searchQuery.value === "") {
    return users.value;
  }
  return users.value.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Open Add User Modal
const openAddModal = () => {
  resetForm();
  showModal.value = true;
  isEdit.value = false;
  errorMessage.value = "";
};

// Open Edit User Modal
const openEditModal = (index) => {
  const user = users.value[index];
  formData.name = user.name;
  formData.gender = user.gender;
  formData.dateOfBirth = user.dateOfBirth;
  formData.email = user.email;
  currentUserIndex.value = index;
  showModal.value = true;
  isEdit.value = true;
  errorMessage.value = "";
};

// Close Modal
const closeModal = () => {
  showModal.value = false;
  resetForm();
  errorMessage.value = "";
};

// Validate form data
const validateForm = () => {
  formErrors.value = [];
  const today = new Date();
  const userDOB = new Date(formData.dateOfBirth);

  if (!formData.name) formErrors.value.push("Name không được để trống.");
  if (!formData.email) formErrors.value.push("Email không được để trống.");
  else if (!/\S+@\S+\.\S+/.test(formData.email))
    formErrors.value.push("Email không đúng định dạng.");
  else if (
    users.value.some(
      (user, index) =>
        user.email === formData.email && index !== currentUserIndex.value
    )
  )
    formErrors.value.push("Email đã tồn tại.");
  if (userDOB > today)
    formErrors.value.push("Ngày sinh không được lớn hơn ngày hiện tại.");

  return formErrors.value.length === 0;
};

// Submit form data
const submitForm = () => {
  if (validateForm()) {
    if (isEdit.value) {
      users.value[currentUserIndex.value] = { ...formData };
    } else {
      users.value.push({ ...formData });
    }
    localStorage.setItem("users", JSON.stringify(users.value));
    closeModal();
  }
};

// Confirm delete user
const confirmDeleteUser = (index) => {
  currentUserIndex.value = index;
  showDeleteModal.value = true;
};

// Delete user
const deleteUser = () => {
  users.value.splice(currentUserIndex.value, 1);
  localStorage.setItem("users", JSON.stringify(users.value));
  closeDeleteModal();
};

// Close delete modal
const closeDeleteModal = () => {
  showDeleteModal.value = false;
  currentUserIndex.value = null;
  resetForm();
};

// Reset form data
const resetForm = () => {
  formData.name = "";
  formData.gender = "Male";
  formData.dateOfBirth = "";
  formData.email = "";
  formErrors.value = []; // Reset errors on form reset
};
// Format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
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

.user-management {
  padding: 20px;
  margin-top: 60px;
  height: calc(100vh - 70px);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-user-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.add-user-btn:hover {
  background-color: #0056b3;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  text-align: center;
}

td {
  text-align: center;
}

.option-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.edit-btn,
.delete-btn {
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.edit-btn {
  background-color: #ffc107;
  color: white;
}

.edit-btn:hover {
  background-color: #e0a800;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 250px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.modal h3 {
  margin-bottom: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
}

.form-group input,
.form-group select {
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 90%;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn,
.close-btn {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background-color: #007bff;
  color: white;
}

.close-btn {
  background-color: #6c757d;
  color: white;
}

.save-btn:hover {
  background-color: #0056b3;
}

.close-btn:hover {
  background-color: #5a6268;
}
.radio-group {
  display: flex;
}
.search-input {
  width: 98%;
  padding: 10px;
  margin: 10px 0; /* Khoảng cách giữa input và nút */
  border: 1px solid #ddd;
  border-radius: 5px;
}
.error-message {
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
}
</style>
