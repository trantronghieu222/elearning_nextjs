import { getCourseByNameApi } from '@/app/server/action/course';
import React from 'react';
import title from '../../../assets/css/Components/title.module.css';
import styles from '../../../assets/css/Pages/timkiem.module.css';
import CourseSearch from '@/app/components/CourseSearch';
const TimKiem = async (props) => {
    const { TenKH } = props.params;
    const dsKHTimKiem = await getCourseByNameApi(TenKH, 1, 5);
    return (
        <div className={`${styles.searchPage}`}>
            <div className={`${title.title1} mb-5`}>
                <h1 className={`${title.title_content} container`}>Danh sách khoá học tìm kiếm</h1>
            </div>
            <CourseSearch dsKHTimKiem={dsKHTimKiem} TenKH={TenKH}></CourseSearch>
        </div>
    );
};

export default TimKiem;