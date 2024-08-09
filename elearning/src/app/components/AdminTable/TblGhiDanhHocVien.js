'use client';
import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Row, Col, message, Form, Button, Select } from 'antd';
import { getStudentJoinedApi, getStudentWaitingApi, getUserNotRegisApi } from '@/app/server/action/users';
import { cancelCourseApi, enrollCourseApi } from '@/app/server/action/course';

const { Search } = Input;

const columnChoXacThuc = (maKhoaHoc, fetchHvChoXetDuyet, fetchHvDaGhiDanh) => [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
        title: 'Tài khoản',
        dataIndex: 'taiKhoan',
        key: 'taiKhoan',
    },
    {
        title: 'Họ tên',
        dataIndex: 'hoTen',
        key: 'hoTen',
    },
    {
        title: 'Chờ xác nhận',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button className='btn btn-success'
                    onClick={
                        async () => {
                            await enrollCourseApi(maKhoaHoc, record.taiKhoan);
                            fetchHvChoXetDuyet();
                            fetchHvDaGhiDanh();
                        }
                    }
                >
                    Xác thực
                </button>
                <button className='btn btn-danger'
                    onClick={async () => {
                        const confirm = window.confirm("Bạn có chắc chắn muốn xoá học viên này?");
                        if (confirm) {
                            await cancelCourseApi(maKhoaHoc, record.taiKhoan);
                            fetchHvChoXetDuyet();
                        }
                    }}
                >
                    Huỷ
                </button>
            </Space>
        ),
    },
];

const columnDaGhiDanh = (maKhoaHoc, fetchHvDaGhiDanh) => [
    {
        title: 'STT',
        dataIndex: 'stt',
        key: 'stt',
        render: (text, record, index) => <a>{index + 1}</a>,
    },
    {
        title: 'Tài khoản',
        dataIndex: 'taiKhoan',
        key: 'taiKhoan',
    },
    {
        title: 'Họ tên',
        dataIndex: 'hoTen',
        key: 'hoTen',
    },
    {
        title: 'Chờ xác nhận',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <button className='btn btn-danger'
                    onClick={async () => {
                        const confirm = window.confirm("Bạn có chắc chắn muốn xoá học viên này?");
                        if (confirm) {
                            await cancelCourseApi(maKhoaHoc, record.taiKhoan);
                            fetchHvDaGhiDanh();
                        }
                    }}
                >
                    Huỷ
                </button>
            </Space>
        ),
    },
];

const TblGhiDanhHocVien = (props) => {
    const { maKhoaHoc } = props;
    const [hocVienChoXet, setHocVienChoXet] = useState();
    const [hocVienDaTG, setHocVienDaTG] = useState();
    const [nguoiDungChuaDki, setNguoiDungChuaDki] = useState();
    const [searchTextChoXet, setSearchTextChoXet] = useState('');
    const [searchTextDaGhiDanh, setSearchTextDaGhiDanh] = useState('');
    const [filteredHvChoXet, setFilteredHvChoXet] = useState();
    const [filteredHvDaTG, setFilteredHvDaTG] = useState();

    // Lấy ds người dùng chưa đăng ký
    useEffect(() => {
        const fetchNguoiDung = async () => {
            const userData = await getUserNotRegisApi(maKhoaHoc);
            if (userData) {
                const userTypeOptions = userData.map(nguoiDung => ({
                    label: nguoiDung.hoTen,
                    value: nguoiDung.taiKhoan
                }));
                setNguoiDungChuaDki(userTypeOptions);
            }
        };
        fetchNguoiDung();
    }, [maKhoaHoc]);

    // Lấy ds học viên chờ xét duyệt
    const fetchHvChoXetDuyet = async () => {
        try {
            const res = await getStudentWaitingApi(maKhoaHoc);
            setHocVienChoXet(res);
            setFilteredHvChoXet(res);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
    };

    // Lấy ds học viên đã ghi danh
    const fetchHvDaGhiDanh = async () => {
        try {
            const res = await getStudentJoinedApi(maKhoaHoc);
            setHocVienDaTG(res);
            setFilteredHvDaTG(res);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
    };

    useEffect(() => {
        fetchHvChoXetDuyet();
        fetchHvDaGhiDanh();
    }, [])

    const onFinish = async (values) => {
        try {
            const ghiDanh = {
                taiKhoan: values.taiKhoan,
                maKhoaHoc: maKhoaHoc
            };
            await enrollCourseApi(ghiDanh.maKhoaHoc, ghiDanh.taiKhoan);
            fetchHvChoXetDuyet();
            fetchHvDaGhiDanh();
        } catch {
            console.log('Thêm khoá học thất bại');
        }
    };

    const handleSearchHvChoXacThuc = (value) => {
        const filtered = hocVienChoXet.filter(hocVien =>
            hocVien.taiKhoan.toLowerCase().includes(value.toLowerCase()) ||
            hocVien.hoTen.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredHvChoXet(filtered);
        setSearchTextChoXet(value);
    };

    const handleSearchHvDaThamGia = (value) => {
        const filtered = hocVienDaTG.filter(hocVien =>
            hocVien.taiKhoan.toLowerCase().includes(value.toLowerCase()) ||
            hocVien.hoTen.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredHvDaTG(filtered);
        setSearchTextDaGhiDanh(value);
    };

    return (
        <div>
            <h5>Chọn người dùng: </h5>
            <Form
                name="formKhChuaDk"
                onFinish={onFinish}
                style={{ display: 'flex', marginBottom: 0, flexDirection: 'column' }}
            >
                <Row gutter={16}>
                    <Col xs={24} sm={24} md={16} lg={20}>
                        <Form.Item
                            name="taiKhoan"
                            rules={[{ required: true, message: 'Hãy chọn người dùng!' }]}
                            style={{
                                marginBottom: 10,
                                width: '100%',
                            }}
                        >
                            <Select
                                showSearch
                                placeholder="Chọn người dùng"
                                optionFilterProp="label"
                                options={nguoiDungChuaDki}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={8} lg={4}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            <Button type="primary" htmlType="submit">
                                Ghi danh
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <hr />
            <h5>Học viên chờ xác thực</h5>
            <Row style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Search
                        placeholder="Nhập tên học viên hoặc số điện thoại"
                        onSearch={handleSearchHvChoXacThuc}
                        onChange={(e) => handleSearchHvChoXacThuc(e.target.value)}
                        value={searchTextChoXet}
                        enterButton
                    />
                </Col>
            </Row>
            <Table
                columns={columnChoXacThuc(maKhoaHoc, fetchHvChoXetDuyet, fetchHvDaGhiDanh)}
                dataSource={filteredHvChoXet}
                rowKey="taiKhoan"
                scroll={{ x: 'max-content' }}
                pagination={{
                    defaultPageSize: 2,
                    pageSizeOptions: ['2', '4', '10'],
                    showSizeChanger: true,
                }}
            />
            <hr />
            <h5>Học viên đã tham gia khoá học</h5>
            <Row style={{ marginBottom: 16 }}>
                <Col xs={24} sm={12} md={8} lg={6}>
                    <Search
                        placeholder="Nhập tên học viên hoặc số điện thoại"
                        onSearch={handleSearchHvDaThamGia}
                        onChange={(e) => handleSearchHvDaThamGia(e.target.value)}
                        value={searchTextDaGhiDanh}
                        enterButton
                    />
                </Col>
            </Row>
            <Table
                columns={columnDaGhiDanh(maKhoaHoc, fetchHvDaGhiDanh)}
                dataSource={filteredHvDaTG}
                rowKey="taiKhoan"
                scroll={{ x: 'max-content' }}
                pagination={{
                    defaultPageSize: 2,
                    pageSizeOptions: ['2', '4', '10'],
                    showSizeChanger: true,
                }}
            />
        </div>
    );
};

export default TblGhiDanhHocVien;