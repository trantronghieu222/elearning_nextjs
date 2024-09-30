import { httpApiElearning } from "@/app/util/setting";
import { message } from "antd";

export const getCourseApi = async () => {
    const res = await httpApiElearning.get('/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc');
    return res.data;
}

export const getCourseByIdApi = async (courseId) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const addCourseApi = async (courseData) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', courseData);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

export const updateCourseUploadApi = async (courseData) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/CapNhatKhoaHocUpload', courseData);
        message.success("cập nhật thành công");
        return res.data;
    } catch (error) {
        message.error(error.response.data)
        console.log(error)
    }
}
export const updateCourseApi = async (courseData) => {
    try {
        const res = await httpApiElearning.put('/api/QuanLyKhoaHoc/CapNhatKhoaHoc', courseData);
        message.success("cập nhật thành công");
        return res.data;
    } catch (error) {
        message.error(error.response.data)
        console.log(error)
    }
}

export const getCategoryCourse = async () => {
    try {
        const res = await httpApiElearning.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc');
        return res.data;
    } catch (error) {
        console.log('Error: ', error)
    }
}

export const delCourseApi = async (maKH) => {
    try {
        const res = await httpApiElearning.delete('/api/QuanLyKhoaHoc/XoaKhoaHoc', {
            params: { maKhoaHoc: maKH }
        });
        message.success('Xoá khoá học thành công')
        return res.data;
    } catch (error) {
        message.error(error.response?.data || 'Có lỗi xảy ra')
        console.log("Error: ", error)
    }
}

export const getCourseByCategoryApi = async (maDanhMuc) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const getCourseByNameApi = async (tenKH, page, pageSize) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${tenKH}&page=${page}&pageSize=${pageSize}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

export const enrollCourseApi = async (maKH, TK) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/GhiDanhKhoaHoc', {
            maKhoaHoc: maKH,
            taiKhoan: TK
        })
        message.success('Ghi danh thành công')
        return res.data;
    } catch (error) {
        message.error(error.response.data)
        console.log('Error: ', error);
    }
}

export const registerCourseApi = async (maKH, TK) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/DangKyKhoaHoc', {
            maKhoaHoc: maKH,
            taiKhoan: TK
        })
        message.success('Đăng ký thành công')
        return res.data;
    } catch (error) {
        message.error(error.response.data)
        console.log('Error: ', error);
    }
}

export const cancelCourseApi = async (maKH, TK) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/HuyGhiDanh', {
            maKhoaHoc: maKH,
            taiKhoan: TK
        })
        message.success('Huỷ ghi danh thành công')
        return res.data;
    } catch (error) {
        message.error(error.response.data)
        console.log('Error: ', error);
    }
}
