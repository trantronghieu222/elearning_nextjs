"use client"
import React, { useState, useEffect } from 'react'
import { Space, Table, Input, Row, Col, message } from 'antd';
import { delCourseApi, getCourseApi } from '@/app/server/action/course';
import btn from '../../assets/css/Components/button.module.css';
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
        title: 'Mã khoá học',
        dataIndex: 'maKhoaHoc',
        key: 'maKhoaHoc',
    },
    {
        title: 'Tên khoá học',
        dataIndex: 'tenKhoaHoc',
        key: 'tenKhoaHoc',
    },
    {
        title: 'Hình ảnh',
        dataIndex: 'hinhAnh',
        key: 'hinhAnh',
        render: (text) => <img src={text} alt="course" style={{ width: '50px' }} />,
    },
    {
        title: 'Lượt xem',
        dataIndex: 'luotXem',
        key: 'luotXem',
    },
    {
        title: 'Người tạo',
        dataIndex: ['nguoiTao', 'hoTen'],
        key: 'nguoiTao',
    },
    {
        title: 'Thao tác',
        key: 'action',
        render: (_, record) => (
            <Space size="middle">
                <Link href={`quanlykhoahoc/ghidanhkhoahoc/${record.maKhoaHoc}`} className='btn btn-primary'>Ghi danh</Link>
                <Link href={`quanlykhoahoc/suakhoahoc/${record.maKhoaHoc}`} className='btn btn-warning'>Sửa</Link>
                {/* <a className='btn btn-danger'>Xoá</a> */}
                <button
                    className='btn btn-danger'
                    onClick={async () => {
                        if (window.confirm('Bạn có chắc chắn muốn xóa không?')) {
                            try {
                                await delCourseApi(record.maKhoaHoc);
                                fetchData();
                            } catch (error) {
                                message.error('Xóa khoá học không thành công');
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
const TblKhoaHoc = (props) => {
    const { courseData } = props;
    const [courseList, setCourseList] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(courseData);

    useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = (value) => {
        const filtered = courseList.filter(course =>
            course.maKhoaHoc.toLowerCase().includes(value.toLowerCase()) ||
            course.tenKhoaHoc.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredData(filtered);
        setSearchText(value);
    };

    const fetchData = async () => {
        try {
            const res = await getCourseApi();
            setCourseList(res);
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
                        placeholder="Tìm kiếm mã hoặc tên khoá học"
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
            <Table columns={columns(fetchData)} dataSource={filteredData} rowKey="maKhoaHoc" scroll={{ x: 'max-content' }} />
        </>
    )
}

export default TblKhoaHoc