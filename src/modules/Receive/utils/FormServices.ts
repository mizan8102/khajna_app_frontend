import { showNotification } from '../../../service/Notification';
class FormServices {
    static items = [
        { label: 'Local Purchase Home', to: '/receive/home' },
        { label: 'Create', to: '/receive/create' },
    ];
    static addRow(model: Array) {
        const length_ar = model.length;
        model.push({
            key: 0 + length_ar + Math.random(),
            item_info: '',
            uom: '',
            vat_structure_rate: '',
            recv_qty: '',
            recv_rate: '',
            recv_amnt_trans_curr: 100,
            total_amnt: 4000,
            dutyDetails: '',
        });
    }
    // delete selected table rows
    static deleteRow(state, item_row) {
        if (state.selectedRowKeys.length < 1) {
            showNotification('error', 'Firstly select row then delete');
            return;
        } else {
            const indicesToDelete = item_row.reduce((acc, item, index) => {
                if (state.selectedRowKeys.includes(item.key)) {
                    acc.push(index);
                }
                return acc;
            }, []);

            indicesToDelete.reverse().forEach((index) => item_row.splice(index, 1));
            state.selectedRowKeys = [];
            console.log(item_row);
        }
    }
}

export default FormServices;
