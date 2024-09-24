<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <router-link to="/register">Don't have an account? Register here</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    
    if (!response.ok) {
      throw new Error('Login failed')
    }

    const data = await response.json()
    localStorage.setItem('token', data.accessToken)
    router.push('/home')
  } catch (error) {
    errorMessage.value = error.message
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}
div {
  margin-bottom: 1rem;
}
button {
  background-color: #007BFF;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
</style>
