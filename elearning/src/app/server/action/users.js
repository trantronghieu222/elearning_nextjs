import { httpApiElearning } from "@/app/util/setting";
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  setDataJsonStorage,
  setDataTextStorage,
  removeDataStorage,
} from "@/app/util/function";
import { message } from 'antd';  

export const getUserApi = async () => {
  try {
    const res = await httpApiElearning.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const getUserByName = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${taiKhoan}`);
    return res.data;
  } catch (error) {
    console.log("Error", error)
  }
}

export const getUserInfo = async () => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    return res.data;
  } catch (error) {
    console.log('Error: ', error)
  }
}

export const getUserTypeApi = async () => {
  try {
    const res = await httpApiElearning.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export const addUserApi = async (user) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/ThemNguoiDung', user);
    message.success('Thêm thành công');
    return res.data;
  } catch (error) {
    message.error(error.response.data);
  }
};

export const delUserApi = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.delete('/api/QuanLyNguoiDung/XoaNguoiDung', {
      params: { TaiKhoan: taiKhoan }
    });
    message.success('Xoá thành công');
    return res.data;
  } catch (error) {
    message.error(error.response?.data || 'Có lỗi xảy ra');
    console.log('Error: ', error);
  }
};

export const updateUserApi = async (userInf) => {
  try {
    const res = await httpApiElearning.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', userInf);
    message.success('Cập nhật thành công');
    return res.data;
  } catch (error) {
    message.error(error.response.data);
    console.log('error: ', error);
  }
}

export const getCourseWaitingApi = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const getEnrolledCourseApi = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const getCourseNotRegis = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const getStudentWaitingApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const getStudentJoinedApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const getUserNotRegisApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

export const loginActionApi = async (taiKhoan, matKhau) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/DangNhap', { taiKhoan, matKhau });
    setDataJsonStorage(USER_LOGIN, res.data);
    setDataTextStorage(TOKEN_AUTHOR, res.data.accessToken);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data };
  }
};

export const handleLogout = () => {
  message.success('Đã đăng xuất thành công');
  removeDataStorage(TOKEN_AUTHOR);
  removeDataStorage(USER_LOGIN);
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};

export const signupActionApi = async (userRegis) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/DangKy', userRegis);
    message.success('Đăng ký thành công');
    return res.data
  } catch (error) {
    message.error(error.response.data);
  }
}