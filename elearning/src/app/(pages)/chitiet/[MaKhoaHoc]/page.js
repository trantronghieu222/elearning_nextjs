import React from 'react'
import { getCourseByIdApi } from '@/app/server/action/course';

import Detail from '@/app/components/Detail';

const ChiTietKhoaHoc = async (props) => {
    const { MaKhoaHoc } = props.params;
    const chiTietKh = await getCourseByIdApi(MaKhoaHoc)

    return (
        <>
            <Detail chiTietKh={chiTietKh}></Detail>
        </>
    )
}

export default ChiTietKhoaHoc