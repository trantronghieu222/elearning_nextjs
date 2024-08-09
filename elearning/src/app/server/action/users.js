import { httpApiElearning } from "@/app/util/setting";
import {
  TOKEN_AUTHOR,
  USER_LOGIN,
  setDataJsonStorage,
  setDataTextStorage,
  removeDataStorage,
  createCookie,
  deleteCookie,
} from "@/app/util/function";
import { message } from 'antd';  

// Lấy danh sách người dùng
export const getUserApi = async () => {
  try {
    const res = await httpApiElearning.get('/api/QuanLyNguoiDung/LayDanhSachNguoiDung');
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// Tìm kiếm người dùng
export const getUserByName = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.get(`/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=${taiKhoan}`);
    return res.data;
  } catch (error) {
    console.log("Error", error)
  }
}

// Lấy thông tin người dùng
export const getUserInfo = async () => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan')
    return res.data;
  } catch (error) {
    console.log('Error: ', error)
  }
}

// Lấy danh sách loại người dùng
export const getUserTypeApi = async () => {
  try {
    const res = await httpApiElearning.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung')
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

// Hàm thêm người dùng 
export const addUserApi = async (user) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/ThemNguoiDung', user);
    message.success('Thêm thành công');
    return res.data;
  } catch (error) {
    message.error(error.response.data);
  }
};

// Hàm xoá người dùng
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

// Hàm cập nhật thông tin người dùng
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

/* ---------------------------------- Trang ghi danh học viên ---------------------------------- */
// Hàm lấy danh sách khoá học chờ xét duyệt (13.2.3)
export const getCourseWaitingApi = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocChoXetDuyet', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Hàm lấy danh sách khoá học đã ghi danh (13.2.2)
export const getEnrolledCourseApi = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocDaXetDuyet', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Lấy danh sách khoá học chưa ghi danh (13.2.1)
export const getCourseNotRegis = async (taiKhoan) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachKhoaHocChuaGhiDanh', { taiKhoan });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Hàm lấy danh sach học viên chờ xác thực (13.1.3)
export const getStudentWaitingApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachHocVienChoXetDuyet', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Hàm lấy danh sách học viên đã tham gia khoá học (13.1.2)
export const getStudentJoinedApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachHocVienKhoaHoc', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

// Lấy danh sách người dùng chưa ghi danh (13.1.1)
export const getUserNotRegisApi = async (maKhoaHoc) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/LayDanhSachNguoiDungChuaGhiDanh', { maKhoaHoc });
    return res.data;
  } catch (error) {
    console.log('Error: ', error);
  }
}

/* ---------------------------------- Trang đăng nhập, đăng ký ---------------------------------- */
// Hàm đăng nhập
export const loginActionApi = async (taiKhoan, matKhau) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/DangNhap', { taiKhoan, matKhau });
    setDataJsonStorage(USER_LOGIN, res.data);
    setDataTextStorage(TOKEN_AUTHOR, res.data.accessToken);
    // createCookie(TOKEN_AUTHOR, res.data.accessToken, 7);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response?.data };
  }
};

// Hàm đăng xuất
export const handleLogout = () => {
  message.success('Đã đăng xuất thành công');
  removeDataStorage(TOKEN_AUTHOR);
  removeDataStorage(USER_LOGIN);
  // deleteCookie(TOKEN_AUTHOR);
  setTimeout(() => {
    window.location.href = '/';
  }, 1000);
};

// Hàm đăng ký
export const signupActionApi = async (userRegis) => {
  try {
    const res = await httpApiElearning.post('/api/QuanLyNguoiDung/DangKy', userRegis);
    message.success('Đăng ký thành công');
  } catch (error) {
    message.error(error.response.data);
  }
}