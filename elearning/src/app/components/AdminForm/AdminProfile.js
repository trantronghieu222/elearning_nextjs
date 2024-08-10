"use client"
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { getUserInfo, getUserTypeApi, updateUserApi } from '@/app/server/action/users';
import btn from '../../assets/css/Components/button.module.css'
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

const AdminProfile = (props) => {
    const { thongTin } = props;
    const [form] = Form.useForm();
    const [thongTinAdmin, setThongTinAdmin] = useState(thongTin);
    const [userTypes, setUserTypes] = useState([]);

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
            await updateUserApi(users);
        } catch {
            console.log('Cập nhật thông tin thất bại')
        }
    };

    

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await getUserInfo();
                setThongTinAdmin(res);
                form.setFieldsValue({
                    taiKhoan: res?.taiKhoan,
                    matKhau: res?.matKhau,
                    hoTen: res?.hoTen,
                    email: res?.email,
                    soDT: res?.soDT,
                    maLoaiNguoiDung: res?.maLoaiNguoiDung,
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
            {/* Form thêm người dùng */}
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
                    taiKhoan: thongTinAdmin?.taiKhoan,
                    matKhau: thongTinAdmin?.matKhau,
                    hoTen: thongTinAdmin?.hoTen,
                    email: thongTinAdmin?.email,
                    soDT: thongTinAdmin?.soDT,
                    maLoaiNguoiDung: thongTinAdmin?.maLoaiNguoiDung,
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
                    <Button className={btn.buttonSearch} htmlType="submit">
                        Cập nhật thông tin
                    </Button>
                </Form.Item>
            </Form>
            <Link href="/admin/quanlynguoidung" className='text-decoration-none'>
                <i className="fa fa-arrow-left"></i> Quay lại trang trước
            </Link>
        </div>
    )
}

export default AdminProfile