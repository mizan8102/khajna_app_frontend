<script setup>
import { ref } from 'vue';
import AppBreadcrumb from '../../../layout/AppBreadcrumb.vue';
import DataTable from '../components/DataTable.vue';
const items = ref([
    { label: 'Local Purchase-RM', to: '/receive/home' },
    { label: 'Home Index', to: '/receive/home' },
]);
</script>
<template><AppBreadcrumb :items="items" /><DataTable /></template>
