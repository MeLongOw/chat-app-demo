import { useContext } from "react";
import { Form, Modal, Input } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { AuthContext } from "../../Context/AuthProvider";
import {
    addDoc,
    collection,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase/config";

export default function AddRoomModal() {
    const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
    const {
        user: { uid },
    } = useContext(AuthContext);
    const [form] = Form.useForm();

    const handleOk = async () => {
        // handle logic
        // add new room to firestore
        await addDoc(collection(db, "rooms"), {
            ...form.getFieldsValue(),
            members: [uid],
            createdAt: serverTimestamp(),
        });
        // reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    const handleCancel = () => {
        // reset form value
        form.resetFields();

        setIsAddRoomVisible(false);
    };

    return (
        <div>
            <Modal
                title="Tạo phòng"
                open={isAddRoomVisible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="Tên phòng" name="name">
                        <Input placeholder="Nhập tên phòng" />
                    </Form.Item>
                    <Form.Item label="Mô tả" name="description">
                        <Input.TextArea placeholder="Nhập mô tả" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}
