<script setup>
import { ref } from 'vue';
import AppBreadcrumb from '../../../layout/AppBreadcrumb.vue';
import DataTable from '../components/DataTable.vue';
const items = ref([{ label: 'Import Purchase Item', to: '/receive/import-home' }, { label: 'Home Index',to: '/receive/import-home' }]);
</script>
<template><AppBreadcrumb :items="items" /><DataTable /></template>
