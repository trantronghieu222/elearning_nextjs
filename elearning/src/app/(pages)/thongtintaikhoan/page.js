"use client"
import RegisteredCourse from '@/app/components/UserForm/RegisteredCourse';
import UserProfile from '@/app/components/UserForm/UserProfile';
import { getUserInfo } from '@/app/server/action/users';
import React, { useEffect,useState } from 'react'
import styles from '../../assets/css/Pages/thongtintaikhoan.module.css';
const ThongTinTaiKhoan = () => {
    const [thongTinTaiKhoan, setThongTinTaiKhoan] = useState()

    useEffect(() => {
        getUserInfo().then(result => {
            setThongTinTaiKhoan(result);
        })

    }, [])

    return (
        <div className={`${styles.prof}`}>
            <div className={`${styles.profTitle}`}>
                <div className='container'>
                    <h1>Thông tin cá nhân</h1>
                    <p>Thông tin học viên</p>
                </div>
            </div>
            <div className={`${styles.profContent} container`}>
                <div className='row'>
                    <div className={`${styles.profContentLeft} col-12 col-md-3`}>
                        <img src="https://i.pravatar.cc?1" width={150} className='rounded-circle mb-3' alt="" />
                        <h5>Thông tin người dùng </h5>
                        <button className='btn btn-success mb-3'>Hồ sơ cá nhân</button>
                    </div>
                    <div className={`${styles.profContentRight} col-12 col-md-9 px-5`}>
                        <div>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true">Thông tin cá nhân</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="course-tab" data-bs-toggle="tab" data-bs-target="#course" type="button" role="tab" aria-controls="course" aria-selected="false">Khoá học</button>
                                </li>
                            </ul>
                            <div className={`${styles.tabContent} tab-content`} id="myTabContent">
                                <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <UserProfile thongTin={thongTinTaiKhoan}></UserProfile>
                                </div>
                                <div className="tab-pane fade" id="course" role="tabpanel" aria-labelledby="course-tab">
                                    <RegisteredCourse></RegisteredCourse>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ThongTinTaiKhoan