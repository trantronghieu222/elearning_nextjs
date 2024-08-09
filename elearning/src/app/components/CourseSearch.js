"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Rate, Pagination } from 'antd';
import title from '../assets/css/Components/title.module.css';
import styles from '../assets/css/Pages/timkiem.module.css';
import btn from '../assets/css/Components/button.module.css';
import { getCourseByNameApi } from '../server/action/course';

const CourseSearch = (props) => {
    const { dsKHTimKiem = { items: [], totalCount: 0 }, TenKH } = props;
    const [currentPage, setCurrentPage] = useState(1);
    const [dsKHTimKiemKH, setDsKHTimKiemKH] = useState(dsKHTimKiem);
    const [total, setTotal] = useState(dsKHTimKiem.totalCount);
    const pageSize = 5;

    const fetchData = async (page) => {
        try {
            const data = await getCourseByNameApi(TenKH, page, pageSize);
            setDsKHTimKiemKH(data ?? { items: [], totalCount: 0 });
            setTotal(data?.totalCount || 0);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu khóa học:", error);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <div className='container'>
                <div className={`${title.title2}`}>
                    <h3 className={`${title.title_content} text-center`}>
                        Tìm thấy {total} khoá học
                    </h3>
                </div>
                {
                    dsKHTimKiemKH.items?.length ? (
                        dsKHTimKiemKH.items.map((item, index) => (
                            <div className={`${styles.card} card mb-3`} key={index}>
                                <div className="row g-0">
                                    <div className={`${styles.cardImg} col-md-3`}>
                                        <img src={item.hinhAnh} className="img-fluid rounded-start" alt={item.tenKhoaHoc} />
                                    </div>
                                    <div className="col-md-9">
                                        <div className={`card-body ${styles.cardBody}`}>
                                            <h5 className="card-title">{item.tenKhoaHoc}</h5>
                                            <p className={`${styles.detailCourse} card-text`}>{item.moTa}</p>
                                            <Rate allowHalf defaultValue={4.5} disabled /><span className="card-text px-3">({item.luotXem})</span>
                                            <p className="card-text"><small className="text-muted">{item.ngayTao}</small></p>
                                            <div className={`${styles.btnContainer}`}>
                                                <Link className={`btn ${btn.buttonSearch}`} href={`/chitiet/${item.maKhoaHoc}`} role="button">Xem chi tiết</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div>Không có khóa học nào</div>
                    )
                }
                
                <Pagination
                    className='d-flex justify-content-center py-5'
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default CourseSearch;