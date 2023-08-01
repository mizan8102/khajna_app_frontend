<script setup>
import { useLayout } from '@/layout/composables/layout';
import { reactive, ref, computed } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import Message from 'primevue/message';
const toast = useToast();
import { useTaskStore } from '../../../store';
const { layoutConfig } = useLayout();
const taskStore = useTaskStore();
const loading = ref(false);
const router = useRouter();
const user = reactive({
    email: '',
    password: '',
});
const rules = computed(() => {
    return {
        email: { required },
        password: { required },
    };
});
let errorMsg = ref('');
const errors = ref([]);

const v$ = useVuelidate(rules, user);
async function handlSave() {
    const result = await v$.value.$validate();
    if (!result) {
        return;
    }
    loading.value = true;
    taskStore
        .login(user)
        .then((e) => {
            router.push({
                name: 'e-commerce',
            });
            loading.value = false;
        })
        .catch((err) => {
            console.log(err);
            loading.value = false;
            errorMsg.value = err.response.data.message;
            if (errorMsg.value == undefined) {
                errors.value = err.response.data.errors;
            }
            toast.add({ severity: 'info', summary: 'Info', detail: 'Message Content', life: 3000 });
        });
}
</script>
<template>
    <div :class="'login-body flex min-h-screen ' + (layoutConfig.colorScheme.value === 'light' ? 'layout-light' : 'layout-dark')">
        <div class="login-image w-6 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/layout/images/pages/login-' + (layoutConfig.colorScheme.value === 'dark' ? 'ondark' : 'onlight') + '.png'" alt="atlantis" class="h-screen w-full" />
        </div>
        <div class="login-panel w-full" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center md:align-items-start justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
                style="padding: 20% 10% 20% 10%; background: var(--exception-pages-image)"
            >
                <form @submit.prevent="handlSave">
                    <div class="flex flex-column">
                        <div class="flex align-items-center mb-6 logo-container">
                            <img :src="'/layout/images/logo/logo-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-logo" style="width: 45px" />
                            <img :src="'/layout/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-appname ml-3" style="width: 100px" />
                        </div>
                        <Message :closable="false" severity="error" v-if="Object.keys(errors).length"
                            ><div v-for="(field, i) of Object.keys(errors)" :key="i">
                                <div v-for="(error, ind) of errors[field] || []" :key="ind">* {{ error }}</div>
                            </div>
                        </Message>
                        <Message :closable="false" v-if="errorMsg" severity="error">{{ errorMsg }}</Message>

                        <div class="form-container">
                            <span class="p-input-icon-left">
                                <i class="pi pi-envelope"></i>
                                <inputText type="text" v-model="user.email" autocomplete="off" placeholder="Email" class="block mb-3" :class="[v$.email.$error ? 'p-invalid' : '']" style="max-width: 320px; min-width: 270px" />
                            </span>

                            <span class="p-input-icon-left">
                                <i class="pi pi-key"></i>
                                <inputText type="password" v-model="user.password" autocomplete="off" placeholder="Password" :class="[v$.email.$error ? 'p-invalid' : '']" class="block mb-3" style="max-width: 320px; min-width: 270px" />
                            </span>
                            <a href="#" class="flex text-color-secondary mb-4 text-sm">Forgot your password?</a>
                        </div>
                        <div class="button-container">
                            <Button type="submit" label="Login" raised :loading="loading" />

                            <span class="flex text-sm text-color-secondary">Don’t have an account?<a class="cursor-pointer ml-1">Sign-up here</a></span>
                        </div>
                    </div>
                </form>

                <div class="login-footer flex align-items-center absolute" style="bottom: 75px">
                    <div class="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
                        <img src="/layout/images/logo/logo-gray.png" class="login-footer-logo" style="width: 22px" />
                        <img src="/layout/images/logo/appname-gray.png" class="login-footer-appname ml-2" style="width: 45px" />
                    </div>
                    <span class="text-sm text-color-secondary mr-3">Copyright 2023</span>
                </div>
            </div>
        </div>
    </div>
</template>
