"use client"
import React from 'react'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, message } from 'antd';
import Link from 'next/link';
import styles from '../../assets/css/Pages/dangnhap.module.css'
import { loginActionApi } from '@/app/server/action/users';
import { useRouter } from 'next/navigation';
import 'antd/dist/reset.css';
const dangnhap = () => {
  const router = useRouter();
  // // Xử lý đăng nhập
  const onFinish = async (values) => {
    const result = await loginActionApi(values.taiKhoan, values.matKhau);
    if (result.success) {
      message.success('Đăng nhập thành công');
      router.push('/');
    } else {
      message.error(result.error || 'Đăng nhập thất bại');
    }
  };

  return (
    <Form
      className={styles.loginForm}
      name="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <p className={styles.formTitle}>ĐĂNG NHẬP</p>
      <Form.Item
        name="taiKhoan"
        rules={[{ required: true, message: 'Không được để trống tài khoản!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} className={styles.antInput} placeholder="Tài khoản" />
      </Form.Item>

      <Form.Item
        name="matKhau"
        rules={[{ required: true, message: 'Không được để trống mật khẩu!' }]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} className={styles.antInput} placeholder="Mật khẩu" />
      </Form.Item>

      <Form.Item>
        <div className={styles.rememberForgot}>
          <Checkbox>Ghi nhớ tài khoản</Checkbox>
          <Link className={styles.loginRegis} href="">
            Quên mật khẩu
          </Link>
        </div>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className={`${styles.loginFormButton} ${styles.antBtn}`}>
          ĐĂNG NHẬP
        </Button>
      </Form.Item>
      Bạn không có tài khoản? <Link href="/users/dangky" className={styles.loginRegis}>đăng ký ngay!</Link>
      <div className={`${styles.loginSocial}`}>
        <span className='text-center'>Đăng nhập với </span>
        <a href='#'><i className={`fab fa-facebook ${styles.facebook}`}></i></a>
        <a href='#'><i className={`fab fa-twitter ${styles.twitter}`}></i></a>
        <a href='#'><i className={`fab fa-google-plus-g ${styles.google}`}></i></a>
      </div>
    </Form>
  );
};
export default dangnhap;