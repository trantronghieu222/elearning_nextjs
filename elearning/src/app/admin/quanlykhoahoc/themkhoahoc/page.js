"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button, Form, Input, Select, Row, Col, DatePicker, InputNumber, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { addCourseApi, getCategoryCourse } from '@/app/server/action/course';
import { getUserInfo } from '@/app/server/action/users';
import title from '../../../assets/css/Components/title.module.css';

const ThemKhoaHoc = () => {
  const [form] = Form.useForm();
  const [numberValue, setNumberValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [originator, setOriginator] = useState([]);
  const [imageFile, setImageFile] = useState(null);

  const handleNumberChange = (value) => {
    setNumberValue(value);
  };

  const validateNumber = (number) => {
    if (number >= 0 && number <= 5) {
      return {
        validateStatus: 'success',
        errorMsg: null,
      };
    } else {
      return {
        validateStatus: 'error',
        errorMsg: 'Đánh giá từ 0 đến 5',
      };
    }
  };

  const handleUpload = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    setImageFile(e.file);
    return e && e.fileList;
  };

  useEffect(() => {
    const fetchCategoryCourse = async () => {
      const res = await getCategoryCourse();
      if (res) {
        const categoryCourse = res.map(value => ({
          label: value.tenDanhMuc,
          value: value.maDanhMuc
        }));
        setCategory(categoryCourse);
      }
    };
    const fetchOriginator = async () => {
      const res = await getUserInfo();
      if (res) {
        const user = [{
          label: res.hoTen,
          value: res.taiKhoan
        }];
        setOriginator(user);
      }
    };
    fetchCategoryCourse();
    fetchOriginator();
  }, []);

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      formData.append('maKhoaHoc', values.maKhoaHoc);
      formData.append('biDanh', values.tenKhoaHoc.replace(/\s+/g, '-').toLowerCase());
      formData.append('tenKhoaHoc', values.tenKhoaHoc);
      formData.append('moTa', values.moTa);
      formData.append('luotXem', values.luotXem);
      formData.append('danhGia', values.danhGia);
      formData.append('hinhAnh', imageFile);
      formData.append('maNhom', 'GP01');
      formData.append('ngayTao', values.ngayTao ? moment(values.ngayTao).format('DD/MM/YYYY') : '');
      formData.append('maDanhMucKhoaHoc', values.danhMucKhoaHoc);
      formData.append('taiKhoanNguoiTao', values.nguoiTao);

      await addCourseApi(formData);
      form.resetFields();
      message.success('Thêm khóa học thành công!');
    } catch (error) {
      console.error('Failed to add course:', error);
      message.error('Thêm khóa học thất bại.');
    }
  };

  return (
    <div style={{ padding: '32px' }}>
      <div className={title.title2}>
        <h1 className={`${title.title_content} text-center`}>Thêm khoá học</h1>
      </div>
      <Form
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            {/* Mã khoá học */}
            <Form.Item
              name="maKhoaHoc"
              label="Mã khoá học"
              rules={[{ required: true, message: 'Vui lòng nhập mã khoá học!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Tên khoá học */}
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khoá học"
              rules={[{ required: true, message: 'Vui lòng nhập tên khoá học!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Danh mục khoá học */}
            <Form.Item
              name="danhMucKhoaHoc"
              label="Danh mục khoá học"
              rules={[{ required: true, message: 'Hãy chọn danh mục khoá học!' }]}
            >
              <Select
                options={category}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Ngày tạo */}
            <Form.Item name="ngayTao" label="Ngày tạo">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Đánh giá */}
            <Form.Item
              name="danhGia"
              label="Đánh giá"
              validateStatus={validateNumber(numberValue).validateStatus}
              help={validateNumber(numberValue).errorMsg}
            >
              <InputNumber
                type='number'
                min={0}
                max={5}
                value={numberValue}
                onChange={handleNumberChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Lượt xem */}
            <Form.Item
              name="luotXem"
              label="Lượt xem"
              rules={[{ required: true, message: 'Vui lòng nhập lượt xem!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Người tạo */}
            <Form.Item
              name="nguoiTao"
              label="Người tạo"
              rules={[{ required: true, message: 'Hãy chọn người tạo!' }]}
            >
              <Select
                options={originator}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            {/* Upload */}
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={handleUpload}
              rules={[{ required: true, message: 'Vui lòng upload hình ảnh!' }]}
            >
              <Upload name="logo" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="moTa"
          label="Mô tả"
          rules={[{ required: true, message: 'Vui lòng nhập mô tả!' }]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea rows={6} style={{ width: '100%' }} />
        </Form.Item>
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button className='me-2' type="primary" htmlType="submit">
            Submit
          </Button>
          <Button danger onClick={() => form.resetFields()}>
            Reset
          </Button>
        </Form.Item>
      </Form>
      <Link href="/admin/quanlykhoahoc" className='text-decoration-none'>
        <i className="fa fa-arrow-left"></i> Quay lại trang trước
      </Link>
    </div>
  );
};

export default ThemKhoaHoc;