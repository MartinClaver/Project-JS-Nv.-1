<script setup>
    import { ref } from 'vue'
    const token = localStorage.getItem('token');
    let tasks = ref([])
    fetch('http://localhost:3000/task', {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }})
    .then(response => response.json())
    .then(backendTasks => {
        tasks.value = tasks.value.concat(backendTasks)
    })
    .catch(error => console.error('Erreur lors de la récupération des tâches:', error));

    const deleteAllTasks = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append('Authorization', `Bearer ${token}`);
            myHeaders.append('Content-Type', 'application/json');

            const request = new Request('http://localhost:3000/delete', {
            method: "DELETE",
            headers: myHeaders
            });

            const response = await fetch(request);

            if (!response.ok) {
            throw new Error('Erreur lors de la suppression des tâches');
            }
            console.log('Tâches supprimées avec succès:', await response.json());
            tasks.value = [];

        } catch (error) {
            console.error('Erreur lors de la suppression des tâches', error);
        }
    };
</script>

<template>
    <ul v-if="tasks.length > 0">
        <li v-for="(task, iTask) in tasks" :key="iTask" >
            {{ iTask }} - 
            {{ task.name }} - 
            {{ task.description }} - 
            {{ task.creator }} 
        </li>
    </ul>
    <p v-else>Aucune tâche à afficher.</p>
            <form @submit.prevent="deleteAllTasks">
                <input type="submit" value="Delete all tasks" />
            </form>
</template>

