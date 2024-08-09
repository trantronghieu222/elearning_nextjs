import FormUpdateUsers from '@/app/components/AdminForm/FormUpdateUsers';
import title from '../../../../assets/css/Components/title.module.css';
import { getUserByName } from '@/app/server/action/users';
import Link from 'next/link';
import React from 'react'

const SuaNguoiDung = async (props) => {
    const { tham_so } = props.params;
    const userInf  = await getUserByName(tham_so);
    return (
        <div>
            <div className={title.title2}>
                <h1 className={`${title.title_content} text-center`}>Thông tin người dùng</h1>
            </div>
            {/* Form update người dùng */}
            <FormUpdateUsers userInf={userInf} taiKhoanAdmin={tham_so}></FormUpdateUsers>
            <Link href="/admin/quanlynguoidung" className='text-decoration-none'>
                <i className="fa fa-arrow-left"></i> Quay lại trang trước
            </Link>
        </div>
    )
}

export default SuaNguoiDung