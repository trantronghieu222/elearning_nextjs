import AdminProfile from '@/app/components/AdminForm/AdminProfile';
// import { getUserInfo } from '@/app/server/action/users'
import React from 'react'
import title from '../../assets/css/Components/title.module.css';
const thongtinadmin = async () => {
    // const thongTinAdmin = await getUserInfo();
    // console.log(thongTinAdmin)
    return (
        <div className='container'>
            <div className={title.title2}>
                <h1 className={`text-center ${title.title_content}`}>Cập nhật thông tin</h1>
            </div>
            <AdminProfile></AdminProfile>
        </div>
    )
}

export default thongtinadmin