import AdminProfile from '@/app/components/AdminForm/AdminProfile';
// import { getUserInfo } from '@/app/server/action/users'
import React from 'react'
const thongtinadmin = async () => {
    // const thongTinAdmin = await getUserInfo();
    // console.log(thongTinAdmin)
    return (
        <div className='container'>
            <h1 className='text-center' style={{ marginBottom: '40px' }}>Cập nhật thông tin</h1>
            <AdminProfile></AdminProfile>
        </div>
    )
}

export default thongtinadmin