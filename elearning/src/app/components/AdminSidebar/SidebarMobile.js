'use client';
import React from 'react';
import Link from 'next/link';
import styles from '../../assets/css/Components/sidebar.module.css';

const SidebarMobile = () => {
    return (
        <div id="mySidebar" className={styles.sidebarMobile}>
            <Link href="/"><i className="fa fa-home"></i></Link>
            <Link href="/admin/quanlykhoahoc"><i className="fa fa-book"></i></Link>
            <Link href="/admin/quanlynguoidung"><i className="fa fa-user"></i></Link>
        </div>
    );
}

export default SidebarMobile;