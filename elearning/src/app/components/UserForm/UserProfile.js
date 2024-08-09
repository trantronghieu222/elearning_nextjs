"use client"
import React, { useState, useEffect } from 'react'
import { Button, Form, Input, message } from 'antd';
import { getUserInfo, updateUserApi } from '@/app/server/action/users';

const layout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 18,
    },
};

const validateMessages = {
    required: '${label} không được để trống!',
    types: {
        email: '${label} không hợp lệ!',
    },
};

const UserProfile = (props) => {
    const { thongTin } = props;
    const [form] = Form.useForm();
    const [thongTinAdmin, setThongTinAdmin] = useState(thongTin);

    const onFinish = async (values) => {
        try {
            const users = {
                taiKhoan: values.taiKhoan,
                matKhau: values.matKhau,
                hoTen: values.hoTen,
                soDT: values.soDT,
                maLoaiNguoiDung: thongTin.maLoaiNguoiDung,
                maNhom: thongTin.maNhom,
                email: values.email
            }
            await updateUserApi(users);
        } catch {
            message.error('Cập nhật thông tin thất bại');
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
                    soDT: res?.soDT
                });
            } catch (error) {
                message.error('Không thể tải dữ liệu');
            }
        }
        fetchUser();
    }, [form]);

    return (
        <div>
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
                }}
            >
                <div className="form-container">
                    <div className="form-column">
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
                    </div>
                    <div className="form-column">
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
                        {/* Button submit */}
                        <Form.Item
                            wrapperCol={{
                                ...layout.wrapperCol,
                                offset: 6,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Cập nhật thông tin
                            </Button>
                        </Form.Item>
                    </div>
                </div>
            </Form>
            <style jsx>{`
                .form-container {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                }
                .form-column {
                    flex: 1;
                    min-width: 300px;
                }
                @media (max-width: 768px) {
                    .form-container {
                        flex-direction: column;
                    }
                }
            `}</style>
        </div>
    )
}

export default UserProfile;