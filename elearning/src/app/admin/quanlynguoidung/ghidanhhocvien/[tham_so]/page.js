import React from 'react'
import Link from 'next/link'
import TblGhiDanh from '@/app/components/AdminTable/TblGhiDanh';
import title from '../../../../assets/css/Components/title.module.css';
const GhiDanhHocVien = (props) => {
    const { tham_so } = props.params;

    return (
        <div style={{ padding: '32px' }}>
            <div className={title.title2}>
                <h1 className={`${title.title_content} text-center`}>
                    Ghi danh học viên
                </h1>
            </div>

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