'use client';
import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Row, Col, message } from 'antd';
import btn from '../../assets/css/Components/button.module.css';
import { delUserApi, getUserApi } from '@/app/server/action/users';
import Link from 'next/link';

const { Search } = Input;

const columns = (fetchData) => [
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
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'Số điện thoại',
        dataIndex: 'soDt',
        key: 'soDt',
    },
    {
        title: 'Mã loại người dùng',
        dataIndex: 'maLoaiNguoiDung',
        key: 'maLoaiNguoiDung',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link href={`quanlynguoidung/ghidanhhocvien/${record.taiKhoan}`} className='btn btn-primary'>Ghi danh</Link>
                <Link href={`quanlynguoidung/suanguoidung/${record.taiKhoan}`} className='btn btn-warning'>Sửa</Link>
                <button
                    className='btn btn-danger'
                    onClick={async () => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
                            try {
                                await delUserApi(record.taiKhoan);
                                fetchData(); // Reload data after deletion
                            } catch (error) {
                                message.error('Xóa người dùng không thành công');
                            }
                        }
                    }}
                >
                    Xoá
                </button>
            </Space>
        ),
    },
];

const TblNguoiDung = (props) => {
    const { userData } = props;
    const [userList, setUserList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(userData);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        const filtered = userList.filter(user =>
            user.taiKhoan.toLowerCase().includes(value.toLowerCase()) ||
            user.hoTen.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setSearchText(value);
    };

    const fetchData = async () => {
        try {
            const res = await getUserApi();
            setUserList(res);
            setFilteredData(res);
        } catch (error) {
            message.error('Không thể tải dữ liệu');
        }
    };

    return (
        <>
            <Row style={{ marginBottom: 16 }}>
                <Col xs={24} sm={24} md={18} lg={12} xl={8}>
                    <Search
                        placeholder="Tìm kiếm tài khoản hoặc họ tên"
                        onSearch={handleSearch}
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchText}
                        enterButton={
                            <button className={`${btn.buttonSearchAdmin}`}>
                                Tìm kiếm
                            </button>
                        }
                    />
                </Col>
            </Row>
            <Table columns={columns(fetchData)} dataSource={filteredData} rowKey="taiKhoan" scroll={{ x: 'max-content' }} />
        </>
    );
};

export default TblNguoiDung;