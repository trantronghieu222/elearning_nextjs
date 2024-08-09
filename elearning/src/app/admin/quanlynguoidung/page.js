"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getUserApi } from '@/app/server/action/users';
import TblNguoiDung from '@/app/components/AdminTable/TblNguoiDung';
import title from '../../assets/css/Components/title.module.css';
import btn from '../../assets/css/Components/button.module.css';
const quanlynguoidung = () => {
  // const userList = await getUserApi();
  const [userList, setUserList] = useState([]);
  useEffect(() => {
    getUserApi().then(result => {
      setUserList(result);
    })
  }, [])
  return (
    <div>
      <div className={title.title2}>
        <h1 className={`${title.title_content} text-center`}>Quản lý người dùng</h1>
      </div>
      {/* Btn add user */}
      <div>
        <Link className={`${btn.buttonBg1} mb-3`} href="quanlynguoidung/themnguoidung" role="button">
          <i className="fa fa-plus"></i> Thêm người dùng
        </Link>
      </div>

      {/* Bảng danh sách */}
      <TblNguoiDung userData={userList}></TblNguoiDung>
    </div>
  )
}

export default quanlynguoidung