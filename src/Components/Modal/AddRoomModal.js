import React, { useContext } from 'react';
import { Form, Modal, Input } from 'antd';
import AppContext from 'antd/es/app/context';
import { addDocument } from '~/Firebase/Service';
import { AuthContext } from '~/Context/AuthProvider';

function AddRoomModal() {
    const { isAddRoomVesible, setisAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);

    const [form] = Form.useForm();

    const handleOk = () => {
        addDocument('rooms', { ...form.getFieldsValue(), members: [uid] });

        form.resetFields();
        setisAddRoomVisible(false);
    };

    const handleCancel = () => {
        form.resetFields();

        setisAddRoomVisible(false);
    };
    return (
        <div>
            <Modal title="Tao phong" open={isAddRoomVesible} onOk={handleOk} onCancel={handleCancel}>
                <Form form={form} layout="vertical">
                    <Form.Item label="Ten phong" name="name">
                        <Input placeholder="Nhap Ten Phong" />
                    </Form.Item>

                    <Form.Item label="Mo ta" name="description">
                        <Input placeholder="Nhap Mo Ta" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default AddRoomModal;
