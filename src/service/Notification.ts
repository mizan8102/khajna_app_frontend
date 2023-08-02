import { message, notification } from 'ant-design-vue';

export function showNotification(type: string, msg: string) {
    notification[type]({
        message: 'Khajna',
        description: msg,
        style: {
            color: 'red',
        },
    });
}

/**
 * @param type error | success
 * @param msg
 */
export function showMessage(type: string, msg: string): void {
    if (type == 'error') {
        message.error({
            content: () => msg,
            style: {
                color: 'red',
            },
        });
    } else {
        message.success(msg);
    }
}
