import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../../../src/app/components/UserForm/UserProfile'
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/navigation';
import { setDataTextStorage, TOKEN_AUTHOR } from '@/app/util/function';
import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import { getUserInfo, updateUserApi } from '@/app/server/action/users';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('UserProfile Page', () => {

    // Kiểm tra thông tin user có được hiển thị trong form hay không
    it('render user profile information', () => {
        const thongTinTaiKhoan = {
            chiTietKhoaHocGhiDanh: [],
            email: "newuser@example.com",
            hoTen: "Nguyen Van A",
            maLoaiNguoiDung: "HV",
            maNhom: "GP01",
            matKhau: "password123",
            soDT: "0123456789",
            taiKhoan: "newuser"
        }

        render(<UserProfile thongTin={thongTinTaiKhoan}></UserProfile>)

        expect(screen.getByDisplayValue('newuser@example.com')).toBeInTheDocument();
        expect(screen.getByDisplayValue('Nguyen Van A')).toBeInTheDocument();
        expect(screen.getByDisplayValue('password123')).toBeInTheDocument();
        expect(screen.getByDisplayValue('0123456789')).toBeInTheDocument();
        expect(screen.getByDisplayValue('newuser')).toBeInTheDocument();
    })

    // Kiểm tra để form rỗng
    it('check empty profile', async () => {
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        render(<UserProfile></UserProfile>)
        fireEvent.click(screen.getByRole('button', { name: 'Cập nhật thông tin' }));
        expect(await screen.findByText('Họ tên không được để trống!')).toBeInTheDocument();
        expect(await screen.findByText('Email không được để trống!')).toBeInTheDocument();
        expect(await screen.findByText('Số điện thoại không được để trống!')).toBeInTheDocument();
    })

    // Kiểm tra validation
    it('check validation profile', async () => {
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        render(<UserProfile></UserProfile>)

        fireEvent.click(screen.getByRole('button', { name: 'Cập nhật thông tin' }));
        fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'aaaaa' } })
        fireEvent.change(screen.getByLabelText('Số điện thoại'), { target: { value: 'aaa012312' } })

        expect(await screen.findByText('Email không hợp lệ!')).toBeInTheDocument();
        expect(await screen.findByText('Số điện thoại không hợp lệ!')).toBeInTheDocument();
    })

    // Kiểm tra cập nhật thành công
    it('update user', async () => {
        const mock = new MockAdapter(axios);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmV3dXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzI3NjY2MzI4LCJleHAiOjE3Mjc2Njk5Mjh9.Lx0sB7PyK0vWsmS6q45lG3juM2nE60yLN8RDv_ilrP0';

        setDataTextStorage(TOKEN_AUTHOR, token);

        const mockResponse = {
            taiKhoan: 'newuser',
            matKhau: 'password123',
            hoTen: 'Nguyen Van A',
            soDt: '0123456789',
            maLoaiNguoiDung: 'HV',
            maNhom: 'GP01',
            email: 'newuser@example.com',
            biDanh: null,
            maLoaiNguoiDungNavigation: null,
            hocVienKhoaHoc: [],
            khoaHoc: []
        };

        mock.onPut('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung').reply(config => {
            expect(config.headers.Authorization).toBe(`Bearer ${token}`);
            return [200, mockResponse];
        });

        const userInf = {
            taiKhoan: 'newuser',
            matKhau: 'password123',
            hoTen: 'Nguyen Van A',
            soDT: '0123456789',
            maLoaiNguoiDung: 'HV',
            maNhom: 'GP01',
            email: 'newuser@example.com'
        };

        await act(async () => {
            const response = await updateUserApi(userInf);
        });

        await waitFor(() => {
            expect(screen.getByText('Cập nhật thành công')).toBeInTheDocument();
        });
    });

    // Kiểm tra cơ sở dữ liệu đã được cập nhật hay chưa
    it('check update user', async () => {
        const mock = new MockAdapter(axios);
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoibmV3dXNlciIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkhWIiwibmJmIjoxNzI3NjY2MzI4LCJleHAiOjE3Mjc2Njk5Mjh9.Lx0sB7PyK0vWsmS6q45lG3juM2nE60yLN8RDv_ilrP0';

        setDataTextStorage(TOKEN_AUTHOR, token);

        const mockResponse = {
            chiTietKhoaHocGhiDanh: [],
            taiKhoan: "newuser",
            matKhau: "password123",
            hoTen: "Nguyen Van A",
            soDT: "0123456789",
            maLoaiNguoiDung: "HV",
            maNhom: "GP01",
            email: "newuser@example.com"
        }

        const profile = await getUserInfo();

        expect(profile).toEqual(mockResponse);
    })

})