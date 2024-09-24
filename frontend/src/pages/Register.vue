<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="register">
      <div>
        <label for="email">Email:</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <button type="submit">Register</button>
      </div>
    </form>
    <p v-if="errorMessage">{{ errorMessage }}</p>
    <router-link to="/login">Already have an account? Login here</router-link>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const register = async () => {
  try {
    const response = await fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    })
    
    if (!response.ok) {
      throw new Error('Registration failed')
    }

    await response.json()
    router.push('/login')
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
