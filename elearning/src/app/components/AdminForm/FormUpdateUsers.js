"use client"
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select, message } from 'antd';
import { getUserTypeApi, updateUserApi, getUserByName } from '@/app/server/action/users';
import { useRouter } from 'next/navigation';
const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 22,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} không được để trống!',
    types: {
        email: '${label} không hợp lệ!',
    },
};

const FormUpdateUsers = (props) => {
    let { userInf, taiKhoanAdmin } = props;
    userInf = userInf[0] || {};

    const [form] = Form.useForm();
    const [userTypes, setUserTypes] = useState([]);
    const [user, setUser] = useState(userInf)

    const router = useRouter()

    const onFinish = async (values) => {
        try {
            const users = {
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                hoTen: values.hoTen,
                soDT: values.soDT,
                maLoaiNguoiDung: values.maLoaiNguoiDung,
                maNhom: 'GP01',
                email: values.email
            }
            updateUserApi(users);
            router.push('/admin/quanlynguoidung');
        } catch {
            console.log('Cập nhật thất bại')
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserByName(taiKhoanAdmin);
                setUser(res);
                form.setFieldsValue({
                    taiKhoan: res[0]?.taiKhoan,
                    matKhau: res[0]?.matKhau,
                    hoTen: res[0]?.hoTen,
                    email: res[0]?.email,
                    soDT: res[0]?.soDt,
                    maLoaiNguoiDung: res[0]?.maLoaiNguoiDung,
                });
            } catch (error) {
                message.error('Không thể tải dữ liệu');
            }
        }
        fetchUser();
    }, [])

    useEffect(() => {
        const fetchUserTypes = async () => {
            const userTypeData = await getUserTypeApi();
            if (userTypeData) {
                const userTypeOptions = userTypeData.map(userType => ({
                    label: userType.tenLoaiNguoiDung,
                    value: userType.maLoaiNguoiDung
                }));
                setUserTypes(userTypeOptions);
            }
        };
        fetchUserTypes();
    }, []);

    return (
        <div>
            {/* Form thêm, sửa người dùng */}
            <Form
                form={form}
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 1000,
                }}
                validateMessages={validateMessages}
                initialValues={{
                    taiKhoan: user?.taiKhoan,
                    matKhau: user?.matKhau,
                    hoTen: user?.hoTen,
                    email: user?.email,
                    soDT: user?.soDt,
                    maLoaiNguoiDung: user?.maLoaiNguoiDung,
                }}
            >
                {/* Tài khoản */}
                <Form.Item
                    name="taiKhoan"
                    label="Tài khoản"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input disabled />
                </Form.Item>
                {/* Mật khẩu */}
                <Form.Item
                    name="matKhau"
                    label="Mật khẩu"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                {/* Họ tên */}
                <Form.Item
                    name="hoTen"
                    label="Họ tên"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* Email */}
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            type: "email",
                            required: true,
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* Số điện thoại */}
                <Form.Item
                    name="soDT"
                    label="Số điện thoại"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            pattern: new RegExp(/^[0-9]+$/),
                            message: 'Số điện thoại không hợp lệ!',
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                {/* Loại người dùng */}
                <Form.Item
                    name="maLoaiNguoiDung"
                    label="Loại người dùng"
                    rules={[{ required: true, message: 'Hãy chọn loại người dùng!' }]}
                >
                    <Select
                        options={
                            userTypes
                        }
                    />
                </Form.Item>
                {/* Button submit */}
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 4,
                    }}
                >
                    <Button className='me-2' type="primary" htmlType="submit">
                        Lưu
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default FormUpdateUsers