<script setup>
import { useLayout } from '@/layout/composables/layout';
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import Preloading from '../components/loading/Preloading.vue';
import { useTaskStore } from '../store';
import AppConfig from './AppConfig.vue';
import AppProfileMenu from './AppProfileMenu.vue';
import AppTopbar from './AppTopbar.vue';
const { layoutConfig, layoutState, isSidebarActive } = useLayout();
const store = useTaskStore();
const loading = store.appMenuItem.loading;
const outsideClickListener = ref(null);
const topbarRef = ref(null);

watch(isSidebarActive, (newVal) => {
    if (newVal) {
        bindOutsideClickListener();
    } else {
        unbindOutsideClickListener();
    }
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const containerClass = computed(() => {
    return [
        {
            'layout-light': layoutConfig.colorScheme.value === 'light',
            'layout-dark': layoutConfig.colorScheme.value === 'dark',
            'layout-overlay': layoutConfig.menuMode.value === 'overlay',
            'layout-static': layoutConfig.menuMode.value === 'static',
            'layout-slim': layoutConfig.menuMode.value === 'slim',
            'layout-slim-plus': layoutConfig.menuMode.value === 'slim-plus',
            'layout-horizontal': layoutConfig.menuMode.value === 'horizontal',
            'layout-reveal': layoutConfig.menuMode.value === 'reveal',
            'layout-drawer': layoutConfig.menuMode.value === 'drawer',
            'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
            'layout-overlay-active': layoutState.overlayMenuActive.value,
            'layout-mobile-active': layoutState.staticMenuMobileActive.value,
            'p-ripple-disabled': !layoutConfig.ripple.value,
            'layout-sidebar-active': layoutState.sidebarActive.value,
            'layout-sidebar-anchored': layoutState.anchored.value,
        },
    ];
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                layoutState.overlayMenuActive.value = false;
                layoutState.overlaySubmenuActive.value = false;
                layoutState.staticMenuMobileActive.value = false;
                layoutState.menuHoverActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarRef.value) return;

    const sidebarEl = topbarRef?.value.$el.querySelector('.layout-sidebar');
    const topbarEl = topbarRef?.value.$el.querySelector('.topbar-start > button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>
<template>
    <Preloading v-if="loading" />
    <div v-else class="layout-container" :class="containerClass">
        <div class="layout-content-wrapper">
            <AppTopbar ref="topbarRef" />

            <div class="layout-content">
                <!-- <AppBreadCrumb class="content-breadcrumb" /> -->
                <router-view></router-view>
            </div>

            <div class="layout-mask"></div>
        </div>
        <AppProfileMenu />
        <AppConfig />

        <Toast></Toast>
    </div>
</template>

<style lang="scss"></style>
