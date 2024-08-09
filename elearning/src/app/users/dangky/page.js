"use client"
import React, { useState } from 'react'
import styles from '../../assets/css/Pages/dangnhap.module.css'
import Link from 'next/link';
import { signupActionApi } from '@/app/server/action/users';
import { LockOutlined, UserOutlined, MailOutlined, IdcardOutlined, PhoneOutlined } from '@ant-design/icons';
import {
  Button,
  Form,
  Input,
} from 'antd';

const dangky = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
      const userRegis = {
        taiKhoan: values.taiKhoan,
        matKhau: values.matKhau,
        hoTen: values.hoTen,
        soDT: values.soDT,
        maNhom: 'GP01',
        email: values.email
      }
      signupActionApi(userRegis);
      form.resetFields();
  };
  return (
    <Form
      className={styles.loginForm}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
    >
      <p className={`${styles.formTitle}`}>ĐĂNG KÝ</p>

      <Form.Item
        name="taiKhoan"
        rules={[{ required: true, message: 'Không được để trống tài khoản!' }]}
      >
        <Input prefix={<UserOutlined />} placeholder="Tài khoản" className={styles.antInput} />
      </Form.Item>

      <Form.Item
        name="matKhau"
        rules={[{ required: true, message: 'Không được để trống mật khẩu!' }]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined />} placeholder='Mật khẩu' className={styles.antInput} />
      </Form.Item>

      <Form.Item
        name="xacNhanMatKhau"
        dependencies={['matKhau']}
        hasFeedback
        rules={[
          { required: true, message: 'Không được để trống mật khẩu!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('matKhau') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Mật khẩu không trùng khớp!'));
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined />} placeholder='Nhập lại mật khẩu' className={styles.antInput} />
      </Form.Item>

      <Form.Item
        name="hoTen"
        rules={[{ required: true, message: 'Không được để trống họ tên!', whitespace: true }]}
      >
        <Input placeholder='Họ tên' prefix={<IdcardOutlined />} className={styles.antInput} />
      </Form.Item>

      <Form.Item
        name="email"
        rules={[
          { type: 'email', message: 'Email không chính xác!' },
          { required: true, message: 'Email không được để trống!' },
        ]}
      >
        <Input placeholder='Email' prefix={<MailOutlined />} className={styles.antInput} />
      </Form.Item>

      <Form.Item
        name="soDT"
        rules={[
          { required: true, message: 'Số điện thoại không được để trống!' },
          { pattern: /^[0-9]+$/, message: 'Số điện thoại không hợp lệ!' },
        ]}
      >
        <Input placeholder='Số điện thoại' prefix={<PhoneOutlined />} className={styles.antInput} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={`${styles.loginFormButton} ${styles.antBtn}`}>
          ĐĂNG KÝ
        </Button>
      </Form.Item>
      Đã có tài khoản? <Link href="/users/dangnhap" className={styles.loginRegis}>Đăng nhập</Link>
    </Form>
  )
}

export default dangky