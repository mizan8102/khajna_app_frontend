<template>
    <div class="card flex justify-content-center">
        <Breadcrumb :home="home" :model="items" />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import Breadcrumb from 'primevue/breadcrumb';
const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const items = ref([{ label: 'Computer' }, { label: 'Notebook' }, { label: 'Accessories' }, { label: 'Backpacks' }, { label: 'Item' }]);
</script>
