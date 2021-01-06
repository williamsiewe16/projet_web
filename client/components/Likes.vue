<template>
    <div style="flex: 1;display: flex; justify-content: center ; align-items: center; background-color: #00b89c">Likes Page</div>
</template>

<script>
    module.exports =  {
        name: "Likes",
        props: {
            likes: { type: Array, default: [] },
        }
    }
</script>

<style scoped>

</style>
