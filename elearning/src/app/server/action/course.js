import { httpApiElearning } from "@/app/util/setting";
import { message } from "antd";

// Lấy danh sách khoá học
export const getCourseApi = async () => {
    const res = await httpApiElearning.get('/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc');
    return res.data;
}

// Lấy thông tin khoá học
export const getCourseByIdApi = async (courseId) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayThongTinKhoaHoc?maKhoaHoc=${courseId}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// Thêm khoá học upload hình
export const addCourseApi = async (courseData) => {
    try {
        const res = await httpApiElearning.post('/api/QuanLyKhoaHoc/ThemKhoaHocUploadHinh', courseData);
        return res.data;
    } catch (error) {
        console.log(error)
    }
}

// Sửa khoá học upload hình (Chưa làm xong)
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

// Lấy danh mục khoá học
export const getCategoryCourse = async () => {
    try {
        const res = await httpApiElearning.get('/api/QuanLyKhoaHoc/LayDanhMucKhoaHoc');
        return res.data;
    } catch (error) {
        console.log('Error: ', error)
    }
}

// Xoá khoá học
export const delCourseApi = async (maKH) => {
    try {
        const res = await httpApiElearning.delete('/api/QuanLyKhoaHoc/XoaKhoaHoc', {
            params: { maKhoaHoc: maKH }
        });
        message.success('Xoá khoá học thành công')
        return res.data;
    } catch (error) {
        console.log("Error: ", error)
    }
}

// Lấy khoá học theo danh mục
export const getCourseByCategoryApi = async (maDanhMuc) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayKhoaHocTheoDanhMuc?maDanhMuc=${maDanhMuc}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

// Tìm kiếm khoá học
export const getCourseByNameApi = async (tenKH, page, pageSize) => {
    try {
        const res = await httpApiElearning.get(`/api/QuanLyKhoaHoc/LayDanhSachKhoaHoc_PhanTrang?tenKhoaHoc=${tenKH}&page=${page}&pageSize=${pageSize}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
}

/* ---------------------------------- Ghi danh khoá học ---------------------------------- */
// Ghi danh khoá học (13.2.4)
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

// Đăng ký khoá học
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

// Huỷ ghi danh (13.2.5)
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
