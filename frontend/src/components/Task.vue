<script setup>
    import { ref } from 'vue'
    let tasks = ref([])
    fetch('http://localhost:3000/task').then(response => response.json())
    .then(backendTasks => {
    tasks.value = tasks.value.concat(backendTasks)
    })

    const deleteAllTasks = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.delete("Content-Type");

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
    <ul>
        <li v-for="(task, iTask) in tasks" :key="iTask" >
            {{ iTask }} - 
            {{ task.name }} - 
            {{ task.description }} - 
            {{ task.creator }} 
        </li>
    </ul>
            <form @submit.prevent="deleteAllTasks">
                <input type="submit" value="Delete all tasks" />
            </form>
</template>

