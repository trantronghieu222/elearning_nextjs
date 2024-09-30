import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DangNhap from '../../../src/app/users/dangnhap/page';
import { useRouter } from 'next/navigation';
import { act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('DangNhap Page', () => {
    // Kiểm tra các phần tử trong form đăng nhập
    it('renders login form', () => {
        render(<DangNhap />);
        expect(screen.getByText('ĐĂNG NHẬP', { selector: 'p' })).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Tài khoản')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Mật khẩu')).toBeInTheDocument();
        expect(screen.getByLabelText('Ghi nhớ tài khoản')).toBeInTheDocument();
        expect(screen.getByText('Quên mật khẩu')).toBeInTheDocument();
        expect(screen.getByText('Bạn không có tài khoản?')).toBeInTheDocument();
        expect(screen.getByText('đăng ký ngay!')).toBeInTheDocument();
        expect(screen.getByText('Đăng nhập với')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'ĐĂNG NHẬP' })).toBeInTheDocument();
    });

    // Kiểm tra validation
    it('shows error message when fields are empty', async () => {
        useRouter.mockImplementation(() => ({
            push: jest.fn(),
        }));

        render(<DangNhap />);
        fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG NHẬP' }));
        expect(await screen.findByText('Không được để trống tài khoản!')).toBeInTheDocument();
        expect(await screen.findByText('Không được để trống mật khẩu!')).toBeInTheDocument();
    });

    // Kiểm tra đăng nhập thành công
    it('logs in successfully with valid credentials and shows success message', async () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush,
        }));

        render(<DangNhap />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Tài khoản'), { target: { value: 'bbb111' } });
            fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), { target: { value: '12345' } });
            fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG NHẬP' }));
        });

        await waitFor(() => {
            expect(screen.getByText('Đăng nhập thành công')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith('/');
        });
    });

    // Kiểm tra đăng nhập thất bại
    it('logs in failed with invalid credentials and shows error message', async () => {
        const mockPush = jest.fn();
        useRouter.mockImplementation(() => ({
            push: mockPush,
        }));

        render(<DangNhap />);

        await act(async () => {
            fireEvent.change(screen.getByPlaceholderText('Tài khoản'), { target: { value: 'bbb111q' } });
            fireEvent.change(screen.getByPlaceholderText('Mật khẩu'), { target: { value: '12345q' } });
            fireEvent.click(screen.getByRole('button', { name: 'ĐĂNG NHẬP' }));
        });

        await waitFor(() => {
            expect(screen.getByText('Tài khoản hoặc mật khẩu không đúng!')).toBeInTheDocument();
        });
    });
});
