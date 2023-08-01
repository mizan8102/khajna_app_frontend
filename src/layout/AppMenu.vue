<script setup>
import { ref } from 'vue';
import AppMenuItem from './AppMenuItem.vue';
import axiosClient from '../axios';
import Preloading from '../components/loading/Preloading.vue'
const model = ref([]);
const isLoading=ref(false);
__onInit();
function __onInit() {
    isLoading.value=true;
    axiosClient
        .get('/menu')
        .then((result) => {
            model.value = result.data.data;
            isLoading.value=false;
        })
        .catch((err) => {
            isLoading.value=false;
            console.log('error');
        });
}
</script>

<template>
    <preloading v-if="isLoading"></preloading>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <AppMenuItem :item="item" root :index="i" />

            <li v-if="item.menu_parent_id==null" class="menu-separator"></li>
        </template>
    </ul>
</template>
