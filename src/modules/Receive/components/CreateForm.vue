<script setup>
import { useDraggable } from '@vueuse/core';
import { computed, reactive, ref, watch, watchEffect } from 'vue';
import LoadingText from '../../../components/loading/LoadingText.vue';
import AppBreadcrumb from '../../../layout/AppBreadcrumb.vue';
import { amount } from '../../../service/AmountServices';
import ModalTable from '../components/modalTable.vue';
import columns from '../utils/Colums';
import FormService from '../utils/FormServices';
const hideField = ref(true);
const isLoading = ref(true);
const visible = ref(false);

const state = reactive({
    selectedRowKeys: [],
    loading: false,
});
// dragable
const modalTitleRef = ref(null);
const { x, y, isDragging } = useDraggable(modalTitleRef);

const startX = ref(0);
const startY = ref(0);
const startedDrag = ref(false);
const transformX = ref(0);
const transformY = ref(0);
const preTransformX = ref(0);
const preTransformY = ref(0);
const dragRect = ref({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
});
watch([x, y], () => {
    if (!startedDrag.value) {
        startX.value = x.value;
        startY.value = y.value;
        const bodyRect = document.body.getBoundingClientRect();
        const titleRect = modalTitleRef.value.getBoundingClientRect();
        dragRect.value.right = bodyRect.width - titleRect.width;
        dragRect.value.bottom = bodyRect.height - titleRect.height;
        preTransformX.value = transformX.value;
        preTransformY.value = transformY.value;
    }
    startedDrag.value = true;
});
watch(isDragging, () => {
    if (!isDragging) {
        startedDrag.value = false;
    }
});
watchEffect(() => {
    if (startedDrag.value) {
        transformX.value = preTransformX.value + Math.min(Math.max(dragRect.value.left, x.value), dragRect.value.right) - startX.value;
        transformY.value = preTransformY.value + Math.min(Math.max(dragRect.value.top, y.value), dragRect.value.bottom) - startY.value;
    }
});
const transformStyle = computed(() => {
    return {
        transform: `translate(${transformX.value}px, ${transformY.value}px)`,
    };
});

const model = ref({
    grn_no: '',
    grn_date: new Date(),
    transaction_source_type: '',
    trans_type: '',
    trans_sub_type: '',
    product_type: '',
    reabate_type: '',
    financial_year_id: '',
    financial_year: '',
    vat_month: '',
    vat_month_id: '',
    supplier_id: '',
    supplier_bin_no: '',
    challan_type: '',
    challan_no: '',
    challan_date: new Date(),
    currency_id: '',
    receive_amnt_trans_currency: '100.00',
    isBond: false,
    lc_number: '',
    remarks: '',
    item_row: [
        {
            key: 0,
            item_info: '',
            uom: '',
            vat_structure_rate: '',
            recv_qty: '',
            recv_rate: '',
            recv_amnt_trans_curr: 100.34,
            total_amnt: 40000430.3223234,
            dutyDetails: '',
        },
    ],
});

setTimeout(() => {
    isLoading.value = false;
}, 2000);

const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
]);

// selection table rows
const onSelectChange = (selectedRowKeys) => {
    state.selectedRowKeys = selectedRowKeys;
};

function uomset(e, record) {
    // record.item_info = 45;
    console.log(e.value);
}

const columnsModal = ref([
    {
        title: 'Tax Based Amount',
        dataIndex: 'tex_based_amnt',
    },
    {
        title: 'Name',
        dataIndex: 'name',
    },
    {
        title: 'Rate(%)',
        dataIndex: 'rate',
    },
    {
        title: 'Amount',
        dataIndex: 'amnt',
    },
]);
const data = ref([
    {
        key: '1',
        name: 'CD',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
    {
        key: '2',
        name: 'RD',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
    {
        key: '3',
        name: 'SD',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
    {
        key: '4',
        name: 'VAT',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
    {
        key: '4',
        name: 'AIT',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
    {
        key: '4',
        name: 'AT',
        rate: '0.00',
        tex_based_amnt: '0.00',
        amnt: 0.0,
    },
]);
const selectedCountry = ref();
const countries = ref([
    { name: 'Australia', code: 'AU' },
    { name: 'Brazil', code: 'BR' },
    { name: 'China', code: 'CN' },
    { name: 'Egypt', code: 'EG' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'India', code: 'IN' },
    { name: 'Japan', code: 'JP' },
    { name: 'Spain', code: 'ES' },
    { name: 'United States', code: 'US' },
]);
const product_types = ref([
    { name: 'Raw Material', code: 'AU' },
    { name: 'Finished Goods', code: 'BR' },
]);
</script>

<template>
    <AppBreadcrumb :items="FormService.items" />
    <LoadingText v-if="isLoading" />

    <div v-else class="grid fadein animation-duration-1000 animation-iteration">
        <div class="col-12 md:col-12">
            <div class="card shadow-2 p-fluid">
                <div class="flex justify-content-between flex-wrap">
                    <!-- <h5 class="text-gray-500">LOCAL PURCHASE-RM</h5> -->
                    <span></span>
                    <Button @click="hideField = !hideField" :icon="[hideField ? 'pi pi-eye-slash' : 'pi pi-eye']" rounded class="text-sm shadow-3 w-6rem" raised iconPos="right" :label="hideField ? 'HIDE' : 'SHOW'" aria-label="Cancel" />
                </div>

                <div class="flex flex-row flex-wrap">
                    <div class="col-12 md:col-3">
                        <label for="name2">GRN No:<span class="text-red-500">*</span> </label>
                        <InputText v-model="model.grn_no" placeholder="GRN No" id="name2" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">GRN Date: <span class="text-red-500">*</span> </label>
                        <Calendar v-model="model.grn_date" class="bg-transparent border-gray-100 mt-1" :showIcon="true" :showButtonBar="true"></Calendar>
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Source Type <span class="text-red-500">*</span> </label>
                        <InputText id="name2" v-model="model.transaction_source_type" placeholder="Transaction Source Type" readonly class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Type <span class="text-red-500">*</span> </label>
                        <InputText id="name2" placeholder="Transaction Type" v-model="model.trans_type" readonly class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Sub Type<span class="text-red-500">*</span> </label>
                        <InputText v-model="model.trans_sub_type" placeholder="Transaction Sub Type" id="name2" readonly class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Product Type<span class="text-red-500">*</span> </label>
                        <Dropdown v-model="model.product_type" :options="product_types" optionLabel="name" placeholder="--Select Product Type--" class="w-full bg-transparent border-gray-100 mt-1"> </Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Rebate Type<span class="text-red-500">*</span></label>
                        <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="--Select Rebate Type--" class="w-full bg-transparent border-gray-100 mt-1">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <!-- <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" /> -->
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Financial Year <span class="text-red-500">*</span></label>
                        <InputText placeholder="Financial Year" v-model="model.financial_year" id="name2" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Vat Month <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Vat Month" v-model="model.vat_month" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Supplier Name<span class="text-red-500">*</span></label>
                        <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="--Select Supplier --" class="w-full bg-transparent border-gray-100 mt-1">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <!-- <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" /> -->
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Supplier BIN No <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Supplier BIN No" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan Type <span class="text-red-500">*</span></label>
                        <Dropdown v-model="selectedCountry" :options="countries" filter optionLabel="name" placeholder="--Select Challan Type--" class="w-full bg-transparent border-gray-100 mt-1">
                            <template #value="slotProps">
                                <div v-if="slotProps.value" class="flex align-items-center">
                                    <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" />
                                    <div>{{ slotProps.value.name }}</div>
                                </div>
                                <span v-else>
                                    {{ slotProps.placeholder }}
                                </span>
                            </template>
                            <template #option="slotProps">
                                <div class="flex align-items-center">
                                    <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" />
                                    <div>{{ slotProps.option.name }}</div>
                                </div>
                            </template>
                        </Dropdown>
                        <!-- <Dropdown id="dd" field="name" class="bg-transparent border-gray-100 mt-1" placeholder="Select Supplier" :options="cities" v-model="model.challan_type" optionLabel="name"></Dropdown> -->
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan No <span class="text-red-500">*</span></label>
                        <InputText id="name2" v-model="model.challan_no" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan Date <span class="text-red-500">*</span></label>
                        <Calendar v-model="model.challan_date" :showIcon="true" :showButtonBar="true"></Calendar>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Currency <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Currency" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Receive Amt. in Trans. Currency</label>
                        <InputText readonly placeholder="Receive Amt. in Trans. Currency" v-model="model.receive_amnt_trans_currency" id="name2" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="flex align-items-center mt-4">
                            <Checkbox v-model="model.isBond" inputId="ingredient1" name="pizza" value="Cheese" />
                            <label for="ingredient1" class="ml-2"> Is Bond </label>
                        </div>
                    </div>

                    <div class="col-12 md:col-3">
                        <label for="name2">LC Number<span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="LC Number" v-model="model.lc_number" class="bg-transparent border-gray-100 mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Remarks:</label>
                        <Textarea class="bg-transparent border-gray-100 mt-1" v-model="model.remarks" rows="2" cols="30" />
                    </div>
                </div>
            </div>

            <!-- child table -->
            <div class="card shadow-2 p-fluid overflow-auto">
                <a-table class="text-sm" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :pagination="false" :columns="columns" :data-source="model.item_row">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'item_info'">
                            <Dropdown v-model="record.item_info" :options="countries" filter optionLabel="name" placeholder="--Select Item--" class="w-full bg-transparent border-gray-100 mt-1">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <!-- <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </template>
                        <template v-if="column.dataIndex === 'uom'">
                            <Dropdown v-model="record.uom" :options="countries" filter optionLabel="name" placeholder="--Select Uom--" class="w-full bg-transparent border-gray-100 mt-1">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <!-- <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </template>
                        <template v-if="column.dataIndex === 'vat_structure_rate'">
                            <Dropdown v-model="record.vat_structure_rate" :options="countries" filter optionLabel="name" placeholder="--Select Vat Structure--" class="w-full bg-transparent border-gray-100 mt-1">
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <!-- <img :alt="slotProps.value.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.value.name }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <!-- <img :alt="slotProps.option.label" src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png" :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`" style="width: 18px" /> -->
                                        <div>{{ slotProps.option.name }}</div>
                                    </div>
                                </template>
                            </Dropdown></template
                        >
                        <template v-if="column.dataIndex === 'recv_qty'">
                            <a-input-number placeholder="Recv. Qty" v-model:value="record.recv_qty" :min="1" :max="100000" />

                            <!-- <InputNumber  v-model="record.recv_qty" inputId="minmaxfraction" placeholder="Recv. Qty" style="width: 90px !important" class="w-1/2 bg-transparent border-gray-100 " /> -->
                        </template>
                        <template v-if="column.dataIndex === 'recv_rate'">
                            <a-input-number placeholder="Recv. Rate" v-model:value="record.recv_qty" :min="1" :max="100000" />

                            <!-- <InputNumber class="bg-transparent border-gray-100" v-model="record.recv_rate" inputId="minmaxfraction" placeholder="Recv. Rate" style="width: 90px !important" /> -->
                        </template>
                        <template v-if="column.dataIndex === 'recv_amnt_trans_curr'"
                            ><h6 class="text-right">{{ amount(record.recv_amnt_trans_curr) }}</h6>
                        </template>
                        <template v-if="column.dataIndex === 'total_amnt'">
                            <h6 class="text-right">{{ amount(record.total_amnt) }}</h6></template
                        >
                        <template v-if="column.dataIndex === 'dutyDetails'">
                            <Button class="shadow-3 text-sm" label="Details" @click="visible = !visible" rounded />
                        </template>
                    </template>
                </a-table>
                <div class="flex flex-wrap gap-3 mb-2 mt-2">
                    <Button icon="pi pi-plus" v-tooltip="'Add New'" @click="FormService.addRow(model.item_row)" raised rounded />

                    <a-popconfirm title="Are you sure？" @confirm="FormService.deleteRow(state, model.item_row)">
                        <template #icon><question-circle-outlined style="color: red" /></template>
                        <Button v-tooltip="'Firstly select then click '" icon="pi pi-trash" severity="danger" rounded aria-label="Cancel" />
                    </a-popconfirm>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!isLoading" class="flex justify-content-end flex-wrap">
        <Button label="Close" class="mr-2" severity="danger" raised />
        <Button label="Reset" class="mr-2" severity="help" raised />
        <Button label="Draft" class="mr-2" severity="success" raised />
        <Button label="Save" class="mr-2" raised />
    </div>

    <!-- modal  -->
    <a-modal ref="modalRef" v-if="visible" v-model:visible="visible" :footer="null">
        <template #title>
            <div ref="modalTitleRef" style="width: 100%; cursor: move">Item Details</div>
        </template>
        <template #modalRender="{ originVNode }">
            <div :style="transformStyle">
                <component :is="originVNode" />
            </div>
        </template>

        <ModalTable></ModalTable>
    </a-modal>
</template>
<style scoped>
.custom-modal .p-dialog-content {
    background-color: #ffffff !important; /* Replace with your desired background color */
}
</style>
