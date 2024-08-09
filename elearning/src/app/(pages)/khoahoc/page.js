import CourseCard from '@/app/components/CourseCard';
import { getCourseApi } from '@/app/server/action/course'
import React from 'react'
import title from '../../assets/css/Components/title.module.css';
const KhoaHoc = async () => {
    const dsKhoahoc = await getCourseApi();
    return (
        <div>
            <div className={`${title.title1} mb-5`}>
                <h1 className={`${title.title_content} container`}>KHOÁ HỌC</h1>
            </div>
            <CourseCard dsKhoahoc={dsKhoahoc}></CourseCard>
        </div>
    )
}

export default KhoaHoc