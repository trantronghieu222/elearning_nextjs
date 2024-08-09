import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { handleLogout } from '@/app/server/action/users';
import styles from '../../assets/css/Components/userDropdown.module.css';
import Link from 'next/link';

const UserDropdown = (props) => {
  const { userLogin } = props;

  let items = [
    {
      label: <Link href='/thongtintaikhoan' className={styles.navLink}>Thông tin</Link>,
      key: '0',
    },
    {
      label: <a className={styles.navLink} onClick={handleLogout}>Đăng xuất</a>,
      key: '1',
    }
  ];

  if (userLogin && userLogin.maLoaiNguoiDung === 'GV') {
    items.push(
      { type: 'divider' },
      {
        label: <Link href="/admin/quanlykhoahoc" className={styles.navLink}>Trang quản trị</Link>,
        key: '3'
      }
    );
  }

  return (
    <Dropdown
      overlay={
        <div className={styles.dropdownMenu}>
          {items.map(item => (
            item.type === 'divider' ? <hr key={item.key} className={styles.divider} /> :
            <div 
              key={item.key} 
              className={styles.dropdownItem}
              onMouseEnter={(e) => e.currentTarget.classList.add(styles.dropdownItemHover)}
              onMouseLeave={(e) => e.currentTarget.classList.remove(styles.dropdownItemHover)}
            >
              {item.label}
            </div>
          ))}
        </div>
      }
      trigger={['click']}
    >
      <a onClick={(e) => e.preventDefault()} className={styles.dropdownTrigger}>
        <Space>
          {userLogin.hoTen}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default UserDropdown;