import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import Detail from '../../../src/app/components/Detail'
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/navigation';
import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { setDataTextStorage, TOKEN_AUTHOR } from '@/app/util/function';
import { registerCourseApi } from '@/app/server/action/course';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

export const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmV3dXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzI4MzgxNjg2LCJleHAiOjE3MjgzODUyODZ9.BdEhPGHqH3hCUW9rp4UCXbNMCIsMESrotYQBt7_DFOY'

export const chiTietKh = {
    maKhoaHoc: "5675",
    biDanh: "lap-trinh-game-code",
    tenKhoaHoc: "lập trình game code",
    moTa: "khoá học hay bổ ích",
    luotXem: 122,
    hinhAnh: "https://elearningnew.cybersoft.edu.vn/hinhanh/lap-trinh-game-code.jpg",
    maNhom: "GP01",
    ngayTao: "07/10/2024",
    soLuongHocVien: 0,
    nguoiTao: {
        taiKhoan: "pencilkg123",
        hoTen: "Trần Đăng Khoa",
        maLoaiNguoiDung: "GV",
        tenLoaiNguoiDung: "Giáo vụ"
    },
    danhMucKhoaHoc: {
        maDanhMucKhoahoc: "Design",
        tenDanhMucKhoaHoc: "Thiết kế Web"
    }
}

describe('TC_DangKy_KhoaHoc', () => {
    // Kiểm tra đăng jys khoá học nếu chưa đăng nhập
    it('TC01_DK_KH_ChuaDangNhap', async () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush,
        }));
        render(<Detail></Detail>)

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
        })

        await waitFor(() => {
            expect(screen.getByText('Vui lòng đăng nhập để đăng ký khoá học!')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/users/dangnhap');
        });
    })

    // Kiểm tra đăng ký khoá học thành công
    it('TK03_DK_KH_ThanhCong', async () => {
        const mock = new MockAdapter(axios);
        setDataTextStorage(TOKEN_AUTHOR, token);

        render(<Detail chiTietKh={chiTietKh}></Detail>)

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
        })

        await waitFor(() => {
            expect(screen.getByText('Đăng ký thành công')).toBeInTheDocument();
        });
    })

    // Kiểm tra nếu đăng ký trùng khoá học 
    it('TK03_DK_KH_Trung', async () => {
        // const mock = new MockAdapter(axios);
        setDataTextStorage(TOKEN_AUTHOR, token);
        render(<Detail chiTietKh={chiTietKh}></Detail>)

        await act(async () => {
            fireEvent.click(screen.getByRole('button', { name: 'Đăng ký' }));
        })

        await waitFor(() => {
            expect(screen.getByText('Đã đăng ký khóa học này rồi!')).toBeInTheDocument();
        });
    })
})