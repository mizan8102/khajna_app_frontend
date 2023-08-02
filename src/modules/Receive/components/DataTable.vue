<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import LoadingText from '../../../components/loading/LoadingText.vue';
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
]);
const isLoading = ref(true);
const router = useRouter();
const switchToCreate = () => {
    router.push({ name: 'receive.create' });
};

setTimeout(() => {
    isLoading.value = false;
}, 2000);
</script>
<template>
    <div class="card !rounded-md shadow-3">
        <div class="flex justify-content-between flex-wrap card-container purple-container">
            <div class="flex align-items-center justify-content-center">
                <Button label="Add New" @click="switchToCreate" class="p-2 pr-4 bg-blue-500 text-white" icon="pi pi-plus-circle" />
            </div>
            <div class="flex align-items-center justify-content-center m-2">
                <div class="flex">
                    <Dropdown v-model="selectedCity" filter :options="cities" optionLabel="name" placeholder="Select Supplier" class="w-full md:w-14rem" />

                    <!-- <Dropdown v-model="selectedCity" editable :options="cities" optionLabel="name"  /> -->
                    <div class="relative ml-4">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            class="block p-2 pl-5 pl-10 text-sm text-gray-900 border border-blue-500 rounded-md w-full bg-white !focus:ring-blue-500 !focus:border-blue-500 !dark:bg-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search by Challan Number"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead class="text-xs bg-blue-500 text-white text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-2 py-2.5">SL</th>

                        <th scope="col" class="px-2 py-2">GRN No</th>
                        <th scope="col" class="px-2 py-2">GRN Date</th>
                        <th scope="col" class="px-2 py-2.5">Product Type</th>
                        <th scope="col" class="px-2 py-2">Supplier Name</th>
                        <th scope="col" class="px-2 py-2">Challan Type</th>
                        <th scope="col" class="px-2 py-2">Challan No</th>
                        <th scope="col" class="px-2 py-2">Challan Date</th>
                        <th scope="col" class="px-2 py-2">Action</th>
                    </tr>
                </thead>
                <tbody v-if="!isLoading">
                    <tr v-for="i in 10" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <td class="px-2 py-2">{{ i }}</td>
                        <td class="px-2 py-2">GRN-23-00002</td>
                        <td class="px-2 py-2">23-03-2023</td>
                        <td class="px-2 py-2">Raw Materials</td>
                        <td class="px-2 py-2">Rahim Verities Store</td>
                        <td class="px-2 py-2">Vat Challan</td>
                        <td class="px-2 py-2">CLN-23-0001</td>
                        <td class="px-2 py-2">23-04-2023</td>
                        <td class="px-2 py-2">
                            <Button icon="pi pi-eye" class="bg-blue-500 mr-2 text-white shadow-lg" rounded aria-label="Filter" />
                            <!-- <Button icon="pi pi-print" class="bg-gray-500 text-white shadow-xl" severity="secondary" rounded aria-label="Bookmark" /> -->
                        </td>
                    </tr>
                </tbody>
                <tbody class="fadein animation-duration-1000 animation-iteration" v-else>
                    <tr>
                        <th colspan="9" class="text-center"><loading-text></loading-text></th>
                    </tr>
                </tbody>
            </table>
            <div class="flex justify-between mt-5">
                <div class="flex items-center">
                    <select
                        id="countries"
                        class="bg-white border mr-2 border-gray-300 text-gray-900 text-sm rounded-md shadow-3xl focus:ring-blue-500 focus:border-blue-500 block p-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option selected value="US">10</option>
                        <option value="CA">25</option>
                        <option value="FR">50</option>
                        <option value="DE">100</option>
                    </select>
                    Showing 1 to 10 of 97 results
                </div>
                <div>
                    <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <a href="#" class="relative inline-flex items-center rounded-l-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Previous</span>
                            <svg class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                        <!-- Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" -->
                        <a
                            href="#"
                            aria-current="page"
                            class="relative z-10 inline-flex items-center bg-blue-500 px-2 py-1 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >1</a
                        >
                        <a href="#" class="relative inline-flex items-center px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">2</a>
                        <a href="#" class="relative hidden items-center px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">3</a>
                        <span class="relative inline-flex items-center px-2 py-1 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span>
                        <a href="#" class="relative hidden items-center px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex">8</a>
                        <a href="#" class="relative inline-flex items-center px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">9</a>
                        <a href="#" class="relative inline-flex items-center px-2 py-1 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">10</a>
                        <a href="#" class="relative inline-flex items-center rounded-r-md px-2 py-1 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span class="sr-only">Next</span>
                            <svg class="h-7 w-7" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                            </svg>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
