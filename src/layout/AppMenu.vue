<script setup>
import { computed } from 'vue';
import { useTaskStore } from '../store';
import AppMenuItem from './AppMenuItem.vue';
const userStore = useTaskStore();
userStore.app_menu_retrive();
const appMenu = computed(() => userStore.appMenuItem.data);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in appMenu" :key="item">
            <AppMenuItem :item="item" root :index="i" />

            <li v-if="item.menu_parent_id == null" class="menu-separator"></li>
        </template>
    </ul>
</template>
