import React from 'react'
import Link from 'next/link'
import TblGhiDanhHocVien from '@/app/components/AdminTable/TblGhiDanhHocVien'
// import { getStudentWaitingApi, getStudentJoinedApi, getUserNotRegisApi } from '@/app/server/action/users'
const GhiDanhKhoaHoc = async (props) => {
    const { tham_so } = props.params
    return (
        <div>
            <h1 className='text-center pb-3'>
                Ghi danh khoá học
            </h1>

            {/* Table ghi danh học viên */}
            <TblGhiDanhHocVien maKhoaHoc={tham_so}></TblGhiDanhHocVien>

            {/* Quay về */}
            <Link href="/admin/quanlykhoahoc" className='text-decoration-none'>
                <i className="fa fa-arrow-left"></i> Quay lại trang trước
            </Link>
        </div>
    )
}

export default GhiDanhKhoaHoc