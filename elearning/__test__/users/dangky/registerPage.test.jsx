import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DangKy from '../../../src/app/users/dangky/page';
import { useRouter } from 'next/navigation';
import { act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { getUserByName } from '../../../src/app/server/action/users';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('DangKy Page', () => {
    // Kiểm tra các phần tử trong form đăng ký
    it('render Register form', () => {
        render(<DangKy />)
        expect(screen.getByText('ĐĂNG KÝ', { selector: 'p' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Tài khoản')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mật khẩu')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Nhập lại mật khẩu')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Họ tên')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Số điện thoại')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'ĐĂNG KÝ' })).toBeInTheDocument();
        expect(screen.getByText('Đã có tài khoản?')).toBeInTheDocument();
        expect(screen.getByText('Đăng nhập')).toBeInTheDocument();
    })

    // Kiểm tra validation
    it('shows error message when register fields are empty', async () => {
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        render(<DangKy />);
        fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG KÝ' }));
        expect(await screen.findByText('Không được để trống tài khoản!')).toBeInTheDocument();
        const passwordErrors = await screen.findAllByText('Không được để trống mật khẩu!');
        expect(passwordErrors).toHaveLength(2);
        expect(await screen.findByText('Không được để trống họ tên!')).toBeInTheDocument();
        expect(await screen.findByText('Email không được để trống!')).toBeInTheDocument();
        expect(await screen.findByText('Số điện thoại không được để trống!')).toBeInTheDocument();
    });

    // Kiểm tra validation
    it('shows error message when password and confirm password do not match', async () => {
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        render(<DangKy />);
        fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG KÝ' }));
        fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), { target: { value: 'password123' } });
        fireEvent.change(screen.getByPlaceholderText('Nhập lại mật khẩu'), { target: { value: 'password456' } });
        fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'abckasn' } });
        fireEvent.change(screen.getByPlaceholderText('Số điện thoại'), { target: { value: '0asdas12312' } });

        expect(await screen.findByText('Mật khẩu không trùng khớp!')).toBeInTheDocument();
        expect(await screen.findByText('Email không chính xác!')).toBeInTheDocument();
        expect(await screen.findByText('Số điện thoại không hợp lệ!')).toBeInTheDocument();
    });

    // Kiểm tra đăng ký trùng tài khoản
    it('check registration if duplicate account', async () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush,
        }));

        render(<DangKy />);
        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Tài khoản'), { target: { value: 'bbb111' } });
            fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), { target: { value: '12345' } });
            fireEvent.change(screen.getByPlaceholderText('Nhập lại mật khẩu'), { target: { value: '12345' } });
            fireEvent.change(screen.getByPlaceholderText('Họ tên'), { target: { value: 'Hieu tran' } });
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'abc@gmail.com' } });
            fireEvent.change(screen.getByPlaceholderText('Số điện thoại'), { target: { value: '0927831231' } });
            fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG KÝ' }));
        });

        await waitFor(() => {
            expect(screen.getByText('Email đã tồn tại!')).toBeInTheDocument();
        });

    })

    // Kiểm tra đăng ký thành công
    it('registers successfully with valid inputs', async () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush,
        }));

        render(<DangKy />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Tài khoản'), { target: { value: 'newuser' } });
            fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByPlaceholderText('Nhập lại mật khẩu'), { target: { value: 'password123' } });
            fireEvent.change(screen.getByPlaceholderText('Họ tên'), { target: { value: 'Nguyen Van A' } });
            fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'newuser@example.com' } });
            fireEvent.change(screen.getByPlaceholderText('Số điện thoại'), { target: { value: '0123456789' } });
            fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG KÝ' }));
        });

        await waitFor(() => {
            expect(screen.getByText('Đăng ký thành công')).toBeInTheDocument();
        });

    });

    // Kiểm tra tài khoản tồn tại trong cơ sở dữ liệu
    it('checks if user exists in the database', async () => {
        const mock = new MockAdapter(axios);

        const mockUser = {
            taiKhoan: 'newuser',
            matKhau: 'password123',
            hoTen: 'Nguyen Van A',
            soDt: '0123456789',
            email: 'newuser@example.com'
        };
        mock.onGet('/api/QuanLyNguoiDung/TimKiemNguoiDung?tuKhoa=newuser').reply(200, [mockUser]);

        const users = await getUserByName('newuser');

        expect(users[0]).toEqual({
            ...mockUser,
            maLoaiNguoiDung: 'HV',
            tenLoaiNguoiDung: 'Học viên'
        });
    });

}) 