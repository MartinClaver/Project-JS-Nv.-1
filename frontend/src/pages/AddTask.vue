<script setup>
  import { ref } from 'vue';
  
  const token = localStorage.getItem('token');
  const name = ref('');
  const creator = ref('');
  const description = ref('');

  const resetForm = () => {
    name.value = '';
    creator.value = '';
    description.value = '';
  };

  const submitTask = async () => {
    if (!name.value || !creator.value || !description.value) {
      alert('Tous les champs sont obligatoires');
      return;
    }

    const newTask = {
      name: name.value,
      creator: creator.value,
      description: description.value
    };

    try {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Content-Type', 'application/json');

      const request = new Request('http://localhost:3000/post-task', {
        method: "POST",
        body: JSON.stringify(newTask),
        headers: myHeaders
      });

      const response = await fetch(request);

      if (!response.ok) {
        throw new Error('Erreur lors de l\'ajout de la tâche');
      }

      console.log('Tâche ajoutée avec succès:', await response.json());

      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de la tâche:', error);
    }
  };
</script>

<template>
  <form @submit.prevent="submitTask">
    <div class="form">
      <label for="creator">Enter your name: </label>
      <input type="text" v-model="creator" id="creator" required />
    </div>
    <div class="form">
      <label for="name">Enter the name of the task: </label>
      <input type="text" v-model="name" id="name" required />
    </div>
    <div class="form">
      <label for="description">Enter the description of the task: </label>
      <input type="text" v-model="description" id="description" required />
    </div>
    <div class="form">
      <input type="submit" value="Add Task" />
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
}

div {
  margin-bottom: 1rem;
}

label {
  font-weight: bold;
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
