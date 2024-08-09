"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCourseApi } from '@/app/server/action/course';
import TblKhoaHoc from '@/app/components/AdminTable/TblKhoaHoc';
import title from '../../assets/css/Components/title.module.css';
import btn from '../../assets/css/Components/button.module.css';

const quanlykhoahoc = () => {
    // Lấy ds khoá học
    // const courseList = await getCourseApi();
    const [courseList, setCourseList] = useState();
    useEffect(() => {
        getCourseApi().then(result => {
            setCourseList(result);
        })
    }, [])
    return (
        <div>
            <div className={title.title2}>
                <h1 className={`${title.title_content} text-center`}>Quản lý khoá học</h1>
            </div>
            {/* Btn add course */}
            <Link className={`${btn.buttonBg1} mb-3`} href="quanlykhoahoc/themkhoahoc" role="button">
                <i className="fa fa-plus"></i> Thêm khoá học
            </Link>

            {/* Bảng danh sách */}
            <TblKhoaHoc courseData={courseList}></TblKhoaHoc>
        </div>
    )
}

export default quanlykhoahoc