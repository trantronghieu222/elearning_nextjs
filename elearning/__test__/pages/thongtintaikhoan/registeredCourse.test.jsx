import axios from 'axios';
import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '../../../src/app/components/UserForm/UserProfile'
import MockAdapter from 'axios-mock-adapter';
import { useRouter } from 'next/navigation';
import { waitFor } from '@testing-library/react';
import { act } from '@testing-library/react';

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('RegisterCourse Page', () => {
    it('Check register course', () => {
        
    })
})