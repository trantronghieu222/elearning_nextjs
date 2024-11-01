"use client"
import { useRouter } from 'next/navigation'
import { getUserInfo, handleLogout } from '@/app/server/action/users'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const Header = () => {
    const [adminProfile, setAdminProfile] = useState();
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            try {
                const result = await getUserInfo();

                if (result && result.maLoaiNguoiDung === 'GV') {
                    setAdminProfile(result);
                } else {
                    // Tạo Bug thì cmt
                    router.push('/not-found');
                }
            } catch (error) {
                console.error('Failed to fetch user info:', error);
                router.push('/not-found');
            }
        };

        checkUser();
    }, [router]);

    if (!adminProfile) {
        return null;
    }

    return (
        <div className='header-admin d-flex justify-content-end'>
            <span className='d-flex align-items-center px-2 py-0'>Chào! {adminProfile.hoTen}</span>
            <div className="dropdown">
                <button className="btn dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                    {/* <img src="https://i.pravatar.cc?1" width={50} className='rounded-circle' alt="" /> */}
                    <img src="/image/avt_boy.png" width={50} className='rounded-circle' alt="" />
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><Link className="dropdown-item" href="/admin/thongtinadmin">Cập nhật thông tin</Link></li>
                    <li><a className="dropdown-item" href="#" onClick={
                        handleLogout
                    }>Đăng xuất</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Header