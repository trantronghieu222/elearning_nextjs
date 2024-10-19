import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/navigation';
import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';
import Header from '@/app/components/Header';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
}));

describe('TC_Header', () => {
    it('TC01_Header_DSKH', async() => {
        render(<Header></Header>)
        // expect(screen.getByText('Danh mục khoá học')).toBeInTheDocument();
        const dropdownToggle = screen.getByText('Danh mục khoá học');
        // Hover vào phần tử 'Danh mục khoá học'
        fireEvent.mouseOver(dropdownToggle);

        // Kiểm tra xem menu có xuất hiện không
        const dropdownMenu = screen.getByRole('menu');
        expect(dropdownMenu).toBeInTheDocument();
    } )
})