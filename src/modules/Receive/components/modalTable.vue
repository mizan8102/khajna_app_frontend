<template>
    <div class="relative overflow-x-auto !m-0">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs">
                <tr class="pb-2">
                    <th scope="col" class="px-2 py-2 bg-transparent">Item Accessable Value:</th>
                    <th scope="col" class="px-2 py-2 bg-transparent">
                        <a-input-number class="border border-gray-300 w-40" placeholder="" :min="1" />
                    </th>
                    <th scope="col" class="px-2 py-1">Item Rate:</th>
                    <th scope="col" class="px-2 py-1">
                        <h1>34,324.00</h1>
                    </th>
                </tr>
                <tr class="text-gray-700 uppercase bg-gray-50">
                    <th scope="col" class="px-2 py-1 text-right">Tax Based Amount</th>
                    <th scope="col" class="px-2 py-1 text-center">Name</th>
                    <th scope="col" class="px-2 py-1 text-right">Rate(%)</th>
                    <th scope="col" class="px-2 py-1 text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 py-1 font-medium text-gray-900 text-right">0.00</th>
                    <td class="px-2 py-1 text-center">CD</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 py-1 font-medium text-right text-gray-900 whitespace-nowrap dark:text-white">0.00</th>
                    <td class="px-2 py-1 text-center">RD</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 text-right py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.00</th>
                    <td class="px-2 py-1 text-center">SD</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 py-1 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white">0.00</th>
                    <td class="px-2 py-1 text-center">VAT</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 text-right py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.00</th>
                    <td class="px-2 py-1 text-center">AIT</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
                <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" class="px-2 text-right py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">0.00</th>
                    <td class="px-2 py-1 text-center">AT</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                    <td class="px-2 py-1 text-right">0.00</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<style scoped>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
