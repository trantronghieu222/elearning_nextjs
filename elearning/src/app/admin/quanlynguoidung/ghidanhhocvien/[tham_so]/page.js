import React from 'react'
import Link from 'next/link'
import TblGhiDanh from '@/app/components/AdminTable/TblGhiDanh';
const GhiDanhHocVien = (props) => {
    const { tham_so } = props.params;
    
    return (
        <div>
            <h1 className='text-center pb-3'>
                Ghi danh học viên
            </h1>

            {/* Table ghi danh và chờ xét duyệt */}
            <TblGhiDanh taiKhoan={tham_so}></TblGhiDanh>

            {/* Quay về */}
            <Link href="/admin/quanlynguoidung" className='text-decoration-none'>
                <i className="fa fa-arrow-left"></i> Quay lại trang trước
            </Link>
        </div>
    )
}

export default GhiDanhHocVien