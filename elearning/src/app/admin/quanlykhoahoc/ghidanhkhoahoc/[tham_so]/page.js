import React from 'react'
import Link from 'next/link'
import TblGhiDanhHocVien from '@/app/components/AdminTable/TblGhiDanhHocVien'
import title from '../../../../assets/css/Components/title.module.css'
// import { getStudentWaitingApi, getStudentJoinedApi, getUserNotRegisApi } from '@/app/server/action/users'
const GhiDanhKhoaHoc = async (props) => {
    const { tham_so } = props.params
    return (
        <div style={{ padding: '32px' }}>
            <div className={title.title2}>
                <h1 className={`${title.title_content} text-center`}>
                    Ghi danh khoá học
                </h1>
            </div>

            {/* Table ghi danh học viên */}
            <TblGhiDanhHocVien maKhoaHoc={tham_so}></TblGhiDanhHocVien>

            {/* Quay về */}
            <Link href="/admin/quanlykhoahoc" className='text-decoration-none mb-5'>
                <i className="fa fa-arrow-left"></i> Quay lại trang trước
            </Link>
        </div>
    )
}

export default GhiDanhKhoaHoc