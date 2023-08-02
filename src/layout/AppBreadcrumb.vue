<script setup>
import { useLayout } from '@/layout/composables/layout';
import Breadcrumb from 'primevue/breadcrumb';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const breadcrumbRoutes = ref([]);
const { showSidebar } = useLayout();

const home = ref({
    icon: 'pi pi-home',
    to: '/',
});
const props = defineProps({
    items: Array,
});
</script>

<template>
    <div class="layout-breadcrumb m-0 p-0 mb-3 flex align-items-center relative h-3rem mt-8 md:mt-7">
        <Breadcrumb :home="home" class="w-full p-3 bg-white shadow-2" :model="items" />
    </div>
</template>
