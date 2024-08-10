'use client';
import React, { useState, useEffect } from 'react';
import { Space, Table, Select, Form, Button, Row, Col } from 'antd';
import { cancelCourseApi, enrollCourseApi } from '@/app/server/action/course';
import { getCourseNotRegis, getCourseWaitingApi } from '@/app/server/action/users';
import { getEnrolledCourseApi } from '@/app/server/action/users';
import btn from '../../assets/css/Components/button.module.css';
const columnChoXacThuc = (taiKhoan, fetchKhChoXetDuyet, fetchKhDaGhiDanh) => [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
        title: 'Tên khoá học',
        dataIndex: 'tenKhoaHoc',
        key: 'tenKhoaHoc',
    },
    {
        title: 'Chờ xác nhận',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button className='btn btn-success'
                    onClick={
                        async () => {
                            await enrollCourseApi(record.maKhoaHoc, taiKhoan);
                            fetchKhChoXetDuyet();
                            fetchKhDaGhiDanh();
                        }
                    }>
                    Xác thực
                </button>
                <button className='btn btn-danger'
                    onClick={async () => {
                        const confirm = window.confirm("Bạn có chắc chắn muốn huỷ khoá học này?");
                        if (confirm) {
                            await cancelCourseApi(record.maKhoaHoc, taiKhoan);
                            fetchKhChoXetDuyet();
                        }
                    }}
                >
                    Huỷ
                </button>
            </Space>
        ),
    },
];

const columnDaGhiDanh = (taiKhoan, fetchKhDaGhiDanh) => [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
        title: 'Tên khoá học',
        dataIndex: 'tenKhoaHoc',
        key: 'tenKhoaHoc',
    },
    {
        title: 'Chờ xác nhận',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button className='btn btn-danger'
                    onClick={async () => {
                        const confirm = window.confirm("Bạn có chắc chắn muốn huỷ khoá học này?");
                        if (confirm) {
                            await cancelCourseApi(record.maKhoaHoc, taiKhoan);
                            fetchKhDaGhiDanh();
                        }
                    }}
                >
                    Huỷ
                </button>
            </Space>
        ),
    },
];

// Search
const onChange = (value) => {
    console.log(`selected ${value}`);
};
const onSearch = (value) => {
    console.log('search:', value);
};

const TblGhiDanh = (props) => {
    const { taiKhoan } = props;
    const [choXetDuyet, setChoXetDuyet] = useState();
    const [daGhiDanh, setDaGhiDanh] = useState();
    const [khoaHoc, setkhoaHoc] = useState();

    const fetchKhChoXetDuyet = async () => {
        try {
            const res = await getCourseWaitingApi(taiKhoan);
            setChoXetDuyet(res);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
    };

    const fetchKhDaGhiDanh = async () => {
        try {
            const res = await getEnrolledCourseApi(taiKhoan);
            setDaGhiDanh(res);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
    }

    useEffect(() => {
        fetchKhChoXetDuyet();
        fetchKhDaGhiDanh();
    }, [])

    // Set khoá học chưa ghi dánh vào ô select search
    useEffect(() => {
        const fetchkhoaHoc = async () => {
            const courseData = await getCourseNotRegis(taiKhoan);
            if (courseData) {
                const userTypeOptions = courseData.map(khoaHoc => ({
                    label: khoaHoc.tenKhoaHoc,
                    value: khoaHoc.maKhoaHoc
                }));
                setkhoaHoc(userTypeOptions);
            }
        };
        fetchkhoaHoc();
    }, []);

    // Submit
    const onFinish = async (values) => {
        try {
            const ghiDanh = {
                taiKhoan: taiKhoan,
                maKhoaHoc: values.maKhoaHoc
            }
            await enrollCourseApi(ghiDanh.maKhoaHoc, ghiDanh.taiKhoan);
            fetchKhChoXetDuyet();
            fetchKhDaGhiDanh();
        } catch {
            console.log('Thêm khoá học thất bại')
        }
    };

    return (
        <>
            {/* Form Ghi danh khoá học */}
            <h5>Chọn khoá học: </h5>
            <Form
                name="formKhChuaDk"
                onFinish={onFinish}
                style={{ display: 'flex', marginBottom: 0, flexDirection: 'column' }}
            >
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={16} lg={20}>
                        <Form.Item
                            name="maKhoaHoc"
                            rules={[{ required: true, message: 'Hãy chọn khoá học!' }]}
                            style={{
                                marginBottom: 10,
                                width: '100%',
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn khoá học"
                                optionFilterProp="label"
                                onChange={onChange}
                                onSearch={onSearch}
                                options={khoaHoc}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={4}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button className={btn.buttonSearch} htmlType="submit">
                                Ghi danh
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            {/* Khoá học chờ xét duyệt */}
            <hr />
            <h5>Khoá học chờ xét duyệt</h5>
            <Table
                columns={columnChoXacThuc(taiKhoan, fetchKhChoXetDuyet, fetchKhDaGhiDanh)}
                dataSource={choXetDuyet}
                rowKey="tenKhoaHoc"
                scroll={{ x: 'max-content' }}
                pagination={{
                    defaultPageSize: 2,
                    pageSizeOptions: ['2', '4', '10'],
                    showSizeChanger: true,
                }}
            />
            {/* Khoá học đã ghi danh */}
            <hr />
            <h5>Khoá học đã ghi danh</h5>
            <Table
                columns={columnDaGhiDanh(taiKhoan, fetchKhDaGhiDanh)}
                dataSource={daGhiDanh}
                rowKey="tenKhoaHoc"
                scroll={{ x: 'max-content' }}
                pagination={{
                    defaultPageSize: 2,
                    pageSizeOptions: ['2', '4', '10'],
                    showSizeChanger: true,
                }}
            />
        </>

    );
};

export default TblGhiDanh;