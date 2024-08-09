import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { getDataJsonStorage } from '@/app/util/function';
import { handleLogout } from '@/app/server/action/users';
import Link from 'next/link';
const UserDropdown = (props) => {
  // const userLogin = getDataJsonStorage('userLogin');
  const { userLogin } = props;

  // Khai báo items dựa vào maLoaiNguoiDung của userLogin
  let items = [
    {
      label: <Link href='/thongtintaikhoan' className='text-decoration-none'>Thông tin</Link>,
      key: '0',
    },
    {
      label: <a onClick={handleLogout}>Đăng xuất</a>,
      key: '1',
    }
  ];

  if (userLogin && userLogin.maLoaiNguoiDung === 'GV') {
    items.push({
      type: 'divider'
    }, {
      label: <Link href="/admin/quanlykhoahoc" className='text-decoration-none'>Trang quản trị</Link>,
      key: '3'
    });
  }

  return (
    <Dropdown
      menu={{
        items,
      }}
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()} className='text-dark text-decoration-none'>
        <Space>
          {userLogin.hoTen}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserDropdown;