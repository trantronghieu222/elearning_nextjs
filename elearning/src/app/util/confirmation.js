import { Modal } from 'antd';

export const showConfirm = async (title, content, onOk) => {
    Modal.confirm({
        title,
        content,
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk,
    });
};