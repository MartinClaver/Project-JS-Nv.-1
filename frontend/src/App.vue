<script setup>
</script>

<template>
  <nav>
    <RouterLink to="/home">Go to Home</RouterLink> | 
    <RouterLink to="/addTask">Go to Add Task</RouterLink> |
    <RouterLink to="/tasks">Go to Tasks</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
a{
  margin-left: 10px;
  margin-right: 10px;
}
</style>
