'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../../assets/css/Components/sidebar.module.css';

const Sidebar = () => {
    const toggleNav = () => {
        const sidebar = document.getElementById("mySidebar");
        sidebar.classList.toggle(styles.closed);
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle(styles.open);
        }
    };

    return (
        <div id="mySidebar" className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
                <h3><img className='w-75' src="../image/logo.png" alt="logo-cyber" /></h3>
                <button className={styles.toggleBtn} type='button' onClick={toggleNav}>
                    <i className="fas fa-bars" />
                </button>
            </div>
            <Link href="/"><i className="fa fa-home"></i> <span>Trang chủ</span></Link>
            <Link href="/admin/quanlykhoahoc"><i className="fa fa-book"></i> <span>Quản lý khoá học</span></Link>
            <Link href="/admin/quanlynguoidung"><i className="fa fa-user"></i> <span>Quản lý người dùng</span></Link>
        </div>
    );
}

export default Sidebar;