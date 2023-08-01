<script setup>
import { reactive, ref } from 'vue';
import LoadingText from '../../../components/loading/LoadingText.vue';
import ModalTable from '../components/modalTable.vue';
const hideField = ref(true);
const isLoading = ref(true);
const visible = ref(false);

const state = reactive({
    selectedRowKeys: [],
    // Check here to configure the default column
    loading: false,
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
    receive_amnt_trans_currency: '',
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
            recv_amnt_trans_curr: 100,
            total_amnt: 4000,
            dutyDetails: '',
        },
    ],
});

const addRow = () => {
    const length_ar = model.value.item_row.length;
    model.value.item_row.push({
        key: 0 + length_ar,
        item_info: '',
        uom: '',
        vat_structure_rate: '',
        recv_qty: '',
        recv_rate: '',
        recv_amnt_trans_curr: 100,
        total_amnt: 4000,
        dutyDetails: '',
    });
};
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
const columns = ref([
    {
        title: 'Item Name',
        dataIndex: 'item_info',
    },
    {
        title: 'UOM',
        dataIndex: 'uom',
    },
    {
        title: 'Vat Structure Rate',
        dataIndex: 'vat_structure_rate',
    },
    {
        title: 'Recv QTY',
        dataIndex: 'recv_qty',
    },
    {
        title: 'Recv Rate',
        dataIndex: 'recv_rate',
    },
    {
        title: 'Recv. Amnt. Trans. Curr.',
        dataIndex: 'recv_amnt_trans_curr',
    },
    {
        title: 'Total Amount',
        dataIndex: 'total_amnt',
    },
    {
        title: 'Duty Details',
        dataIndex: 'dutyDetails',
    },
]);

// selection table rows
const onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    state.selectedRowKeys = selectedRowKeys;
};

// delete selected table rows
function deleteRow() {
    const indicesToDelete = model.value.item_row.reduce((acc, item, index) => {
        if (state.selectedRowKeys.includes(item.key)) {
            acc.push(index);
        }
        return acc;
    }, []);

    indicesToDelete.reverse().forEach((index) => model.value.item_row.splice(index, 1));

    console.log(model.value.item_row);
}

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
</script>

<template>
    <LoadingText v-if="isLoading" />

    <div v-else class="grid fadein animation-duration-1000 animation-iteration">
        <div class="col-12 md:col-12">
            <div class="card shadow-2 p-fluid">
                <div class="flex justify-content-between flex-wrap">
                    <h5>Local Purchase-Raw Materials</h5>

                    <Button @click="hideField = !hideField" :icon="[hideField ? 'pi pi-plus' : 'pi pi-times']" class="text-lg shadow-3" raised rounded aria-label="Cancel" />
                </div>

                <div class="flex flex-row flex-wrap">
                    <div class="col-12 md:col-3">
                        <label for="name2">GRN No:<span class="text-red-500">*</span> </label>
                        <InputText v-model="model.grn_no" placeholder="GRN No" id="name2" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">GRN Date: <span class="text-red-500">*</span> </label>
                        <Calendar v-model="model.grn_date" :showIcon="true" :showButtonBar="true"></Calendar>
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Source Type <span class="text-red-500">*</span> </label>
                        <InputText id="name2" v-model="model.transaction_source_type" placeholder="Transaction Source Type" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Type <span class="text-red-500">*</span> </label>
                        <InputText id="name2" placeholder="Transaction Type" v-model="model.trans_type" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Transaction Sub Type<span class="text-red-500">*</span> </label>
                        <InputText v-model="model.trans_sub_type" placeholder="Transaction Sub Type" id="name2" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3" v-show="hideField">
                        <label for="name2">Product Type<span class="text-red-500">*</span> </label>
                        <InputText id="name2" placeholder="Product Type" v-model="model.product_type" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Rebate Type<span class="text-red-500">*</span></label>
                        <Dropdown id="dropdown" placeholder="Select Rebate Type" :options="cities" v-model="model.reabate_type" optionLabel="name"></Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Financial Year <span class="text-red-500">*</span></label>
                        <InputText placeholder="Financial Year" v-model="model.financial_year" id="name2" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Vat Month <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Vat Month" v-model="model.vat_month" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Supplier Name<span class="text-red-500">*</span></label>
                        <Dropdown id="dropdown" class="mt-1" placeholder="Select Supplier" :options="cities" v-model="model.supplier_id" optionLabel="name"></Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Supplier BIN No <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Supplier BIN No" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan Type <span class="text-red-500">*</span></label>
                        <Dropdown id="dropdown" class="mt-1" placeholder="Select Supplier" :options="cities" v-model="model.challan_type" optionLabel="name"></Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan No <span class="text-red-500">*</span></label>
                        <InputText id="name2" v-model="model.challan_no" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Challan Date <span class="text-red-500">*</span></label>
                        <Calendar v-model="model.challan_date" :showIcon="true" :showButtonBar="true"></Calendar>
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Currency <span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="Currency" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Receive Amt. in Trans. Currency</label>
                        <InputText placeholder="Receive Amt. in Trans. Currency" v-model="model.receive_amnt_trans_currency" id="name2" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <div class="flex align-items-center mt-4">
                            <Checkbox v-model="model.isBond" inputId="ingredient1" name="pizza" value="Cheese" />
                            <label for="ingredient1" class="ml-2"> Is Bond </label>
                        </div>
                    </div>

                    <div class="col-12 md:col-3">
                        <label for="name2">LC Number<span class="text-red-500">*</span></label>
                        <InputText id="name2" placeholder="LC Number" v-model="model.lc_number" class="mt-1" type="text" />
                    </div>
                    <div class="col-12 md:col-3">
                        <label for="name2">Remarks:</label>
                        <Textarea v-model="model.remarks" rows="2" cols="30" />
                    </div>
                </div>
            </div>

            <!-- child table -->
            <div class="card shadow-2 p-fluid overflow-auto">
                <a-table class="text-sm" :row-selection="{ selectedRowKeys: state.selectedRowKeys, onChange: onSelectChange }" :pagination="false" :columns="columns" :data-source="model.item_row">
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'item_info'">
                            <Dropdown v-model="record.item_info" editable :options="cities" optionLabel="name" placeholder="Select  item name" class="w-full" />
                        </template>
                        <template v-if="column.dataIndex === 'uom'">
                            <Dropdown v-model="record.uom" @change="uomset($event, record)" editable :options="cities" optionLabel="name" placeholder="Select uom" class="w-full" />
                        </template>
                        <template v-if="column.dataIndex === 'vat_structure_rate'">
                            <Dropdown v-model="record.vat_structure_rate" editable :options="cities" optionLabel="name" placeholder="Select vat structure rate" class="w-full md:w-14rem" />
                        </template>
                        <template v-if="column.dataIndex === 'recv_qty'">
                            <InputNumber v-model="record.recv_qty" inputId="minmaxfraction" placeholder="Recv. Qty" style="width: 90px !important" class="w-1/2" />
                        </template>
                        <template v-if="column.dataIndex === 'recv_rate'">
                            <InputNumber v-model="record.recv_rate" inputId="minmaxfraction" placeholder="Recv. Rate" style="width: 90px !important" />
                        </template>
                        <template v-if="column.dataIndex === 'recv_amnt_trans_curr'"> {{ record.recv_amnt_trans_curr }} </template>
                        <template v-if="column.dataIndex === 'total_amnt'"> {{ record.total_amnt }} </template>
                        <template v-if="column.dataIndex === 'dutyDetails'">
                            <Button class="shadow-3 text-sm" label="Details" @click="visible = !visible" rounded />
                        </template>
                    </template>
                </a-table>
                <div class="flex flex-wrap gap-3 mb-2 mt-2">
                    <Button icon="pi pi-plus" @click="addRow" raised rounded />

                    <a-popconfirm title="Are you sure？" @confirm="deleteRow">
                        <template #icon><question-circle-outlined style="color: red" /></template>
                        <Button icon="pi pi-trash" severity="danger" rounded aria-label="Cancel" />
                    </a-popconfirm>
                </div>
            </div>
        </div>
    </div>

    <a-modal v-if="visible" v-model:visible="visible" width="500px" title="Item Detail" :footer="null">
        <div class="flex justify-content-around flex-wrap">
            <div class="field grid">
                <label for="name3" class="col-12 mb-2 md:col-6 md:mb-0 font-bold">Item Assessable Value :</label>
                <div class="col-12 md:col-6">
                    <InputText id="name3" value="0" type="text" />
                </div>
            </div>
            <div class="field grid">
                <label for="name3" class="col-12 mb-2 md:col-6 md:mb-0 font-bold">Item Rate :</label>
                <div class="col-12 md:col-6">
                    <InputText id="name3" value="0" type="text" />
                </div>
            </div>
        </div>
        <ModalTable></ModalTable>
    </a-modal>
</template>
<style scoped>
.custom-modal .p-dialog-content {
    background-color: #ffffff !important; /* Replace with your desired background color */
}
</style>
