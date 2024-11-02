"use client"
import React from 'react'
import Link from 'next/link'
import styles from '../assets/css/Layout/footer.module.css';
import { Button, Form, Input, InputNumber, message } from 'antd';
import emailjs from 'emailjs-com';

const Footer = () => {
    const DkiTuVan = (values) => {
        emailjs.send('service_43m459r', 'template_yuxquua', {
            from_name: values.name,
            from_email: values.email,
            from_phone: values.phone,
        }, 'E9YiPA9C6ApDU7vSe')
            .then((response) => {
                // console.log('Gửi email thành công!', response.status, response.text);
                message.success('Đăng ký tư vấn thành công')
            })
            .catch((err) => {
                console.error('Gửi email thất bại:', err);
                // alert('Gửi email thất bại, vui lòng thử lại!');
                message.error('Gửi email thất bại, vui lòng thử lại!')
            });
    };

    const DkiKM = (values) => {
        emailjs.send('service_43m459r', 'template_qln1nb7', {
            to_email: values.email,
        }, 'E9YiPA9C6ApDU7vSe')
            .then((response) => {
                console.log('Gửi email thành công!', response.status, response.text);
                message.success('Đăng ký nhận khuyến mãi thành công!');
            })
            .catch((err) => {
                console.error('Gửi email thất bại:', err);
                message.error('Gửi email thất bại, vui lòng thử lại!');
            });
    };

    return (
        <div id='footer' className={`${styles.footer}`}>
            <div className={`container ${styles.footerContent}`}>
                <div className='row'>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <div className={`${styles.Ftlogo}`}>
                            <img src='/image/logo.png' width={200} alt='Logo Cyber'></img>
                            <p>E-learning - Hệ thống đào tạo lập trình chuyên sâu theo dự án thực tế</p>
                        </div>
                        <div className={`${styles.ftNews}`}>
                            <h3>Nhận tin sự kiện & khuyến mãi</h3>
                            <p>E-learning sẽ gởi các khoá học trực tuyến & các chương trình hoàn toàn MIỄN PHÍ và các chương trình KHUYẾN MÃI hấp dẫn đến các bạn</p>
                            <div className={styles.newRegis}>
                                <Form
                                    name="KhuyenMai"
                                    style={{ maxWidth: 600 }}
                                    onFinish={DkiKM}
                                >
                                    <div className={styles.inputContainer} data-mdb-input-init>
                                        <Form.Item
                                            name="email"
                                            rules={[
                                                { required: true, message: "Không được để trống email!" },
                                                { type: 'email', message: "Email không hợp lệ" }
                                            ]}
                                            style={{ margin: 0 }}
                                        >
                                            <Input id="form1" className={styles.input} placeholder='Nhập email' />
                                        </Form.Item>

                                        <Form.Item style={{ margin: 0 }}>
                                            <Button id='btnKhuyenMai' type="btn" htmlType="submit" className={styles.btnRegis}>
                                                Nhận KM
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <h3>Đăng ký tư vấn</h3>
                        <Form
                            name="TuVan"
                            onFinish={DkiTuVan}
                            style={{
                                maxWidth: 600,
                            }}
                        >
                            <Form.Item
                                name="name"
                                rules={[
                                    { required: true, message: "Không được để trống tên!" },
                                ]}
                            >
                                <Input placeholder='Nhập họ và tên' />
                            </Form.Item>
                            <Form.Item
                                name="email"
                                rules={[
                                    { required: true, message: "Không được để trống email!" },
                                    { type: 'email', message: "Email không hợp lệ" }
                                ]}
                            >
                                <Input placeholder='Nhập email' />
                            </Form.Item>
                            <Form.Item
                                name="phone"
                                rules={[
                                    { required: true, message: "Không được để trống số điện thoại!" },
                                    {
                                        validator: (_, value) => {
                                            if (!value) {
                                                return Promise.resolve();
                                            }
                                            if (!/^[0-9]+$/.test(value)) {
                                                return Promise.reject(new Error('Số điện thoại không hợp lệ!'));
                                            }
                                            if (value.length < 7 || value.length > 11) {
                                                return Promise.reject(new Error('Số điện thoại phải từ 7 - 11 chữ số!'));
                                            }
                                            return Promise.resolve();
                                        }
                                    }
                                ]}
                            >
                                <Input placeholder='Nhập số điện thoại' />
                            </Form.Item>
                            <Form.Item>
                                <Button id='btnTuVan' type="btn" htmlType="submit" className={`${styles.btnRegis}`}>
                                    Đăng ký tư vấn
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className={`${styles.ftCol} col-12 col-lg-4`}>
                        <h3>Liên hệ</h3>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 1: 376 Võ Văn Tần - Quận 3</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 2: 459 Sư Vạn Hạnh - Quận 10</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 3: 82 Ung Văn Khiêm - Bình Thạnh</p>
                        <p><i className="fa fa-map-marker-alt" /> Cơ sở 4: Đà Năng - Quận Hải Châu</p>
                        <p><i className="fa fa-phone" /> 096.105.1014 - 098.407.5835</p>
                        <div className={`${styles.ftScocial}`}>
                            <Link href="#"><i className="fab fa-facebook-f"></i></Link>
                            <Link href="#"><i className="fab fa-linkedin-in"></i></Link>
                            <Link href="#"><i className="fab fa-twitter"></i></Link>
                            <Link href="#"><i className="fab fa-instagram"></i></Link>
                            <Link href="#"><i className="fab fa-github"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer