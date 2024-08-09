"use client"
import React, { useState, useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col, DatePicker, InputNumber, Upload, message, Image } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { getCategoryCourse, updateCourseApi, updateCourseUploadApi } from '@/app/server/action/course';
import { getUserInfo } from '@/app/server/action/users';

const FormUpdateCourse = (props) => {
  let { course } = props;
  const [courseDetail, setCourseDetail] = useState(course)
  const [form] = Form.useForm();
  const [numberValue, setNumberValue] = useState(0);
  const [category, setCategory] = useState([]);
  const [creator, setCreator] = useState([]);
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
    const fetchCreator = async () => {
      const res = await getUserInfo();
      if (res) {
        const user = [{
          label: res.hoTen,
          value: res.taiKhoan
        }];
        setCreator(user);
      }
    }
    fetchCategoryCourse();
    fetchCreator();
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
      // Kiểm tra và append hinhAnh
      formData.append('hinhAnh', imageFile || courseDetail?.hinhAnh);
      formData.append('maNhom', 'GP01');
      formData.append('ngayTao', values.ngayTao ? moment(values.ngayTao).format('DD/MM/YYYY') : '');
      formData.append('maDanhMucKhoaHoc', values.danhMucKhoaHoc);
      formData.append('taiKhoanNguoiTao', values.nguoiTao);


      // Xem console
      // console.log("maKhoaHoc", formData.get('maKhoaHoc'));
      // console.log("biDanh", formData.get('biDanh'));
      // console.log("tenKhoaHoc", formData.get('tenKhoaHoc'));
      // console.log("moTa", formData.get('moTa'));
      // console.log("luotXem", formData.get('luotXem'));
      // console.log("danhGia", formData.get('danhGia'));
      // console.log("hinhAnh", formData.get('hinhAnh'));
      // console.log("maNhom", formData.get('maNhom'));
      // console.log("ngayTao", formData.get('ngayTao'));
      // console.log("maDanhMucKhoaHoc", formData.get('maDanhMucKhoaHoc'));
      // console.log("taiKhoanNguoiTao", formData.get('taiKhoanNguoiTao'));

      await updateCourseUploadApi(formData);

      // const course = {
      //   maKhoaHoc: values?.maKhoaHoc,
      //   biDanh: values.tenKhoaHoc.replace(/\s+/g, '-').toLowerCase(),
      //   tenKhoaHoc: values?.tenKhoaHoc,
      //   moTa: values?.moTa,
      //   luotXem: values?.luotXem,
      //   danhGia: values?.danhGia,
      //   hinhAnh: imageFile || courseDetail?.hinhAnh,
      //   maNhom: 'GP01',
      //   ngayTao: values?.ngayTao ? moment(values.ngayTao, 'DD/MM/YYYY') : null,
      //   maDanhMucKhoaHoc: values?.danhMucKhoaHoc,
      //   nguoiTao: values?.nguoiTao
      // }
      // console.log(course)


    } catch (error) {
      console.error('Failed to add course:', error);
      message.error('Cập nhật  khóa học thất bại.');
    }
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onFinish}
        scrollToFirstError
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{
          maKhoaHoc: courseDetail?.maKhoaHoc,
          biDanh: courseDetail?.biDanh,
          tenKhoaHoc: courseDetail?.tenKhoaHoc,
          moTa: courseDetail?.moTa,
          luotXem: courseDetail?.luotXem,
          danhGia: courseDetail?.danhGia,
          hinhAnh: courseDetail?.hinhAnh,
          maNhom: courseDetail?.maNhom,
          ngayTao: courseDetail?.ngayTao ? moment(courseDetail.ngayTao, 'DD/MM/YYYY') : null,
          danhMucKhoaHoc: courseDetail?.danhMucKhoaHoc?.maDanhMucKhoahoc,
          nguoiTao: courseDetail?.nguoiTao?.taiKhoan
        }}
      >
        <Row gutter={24}>
          <Col xs={24} sm={12}>
            <Form.Item
              name="maKhoaHoc"
              label="Mã khoá học"
              rules={[{ required: true, message: 'Vui lòng nhập mã khoá học!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="tenKhoaHoc"
              label="Tên khoá học"
              rules={[{ required: true, message: 'Vui lòng nhập tên khoá học!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="danhMucKhoaHoc"
              label="Danh mục khoá học"
              rules={[{ required: true, message: 'Hãy chọn danh mục khoá học!' }]}
            >
              <Select options={category} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item name="ngayTao" label="Ngày tạo">
              <DatePicker style={{ width: '100%' }} format="DD-MM-YYYY" />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="danhGia"
              label="Đánh giá"
              validateStatus={validateNumber(numberValue).validateStatus}
              help={validateNumber(numberValue).errorMsg}
              rules={[{ required: true, message: 'Không được để trống đánh giá!' }]}
            >
              <InputNumber
                type="number"
                min={0}
                max={5}
                value={numberValue}
                onChange={handleNumberChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="luotXem"
              label="Lượt xem"
              rules={[{ required: true, message: 'Vui lòng nhập lượt xem!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="nguoiTao"
              label="Người tạo"
              rules={[{ required: true, message: 'Hãy chọn người tạo!' }]}
            >
              <Select options={creator} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Form.Item
              name="upload"
              label="Upload"
              valuePropName="fileList"
              getValueFromEvent={handleUpload}
            >
              <Upload name="logo" listType="picture" beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12}>
            <Image width={100} src={courseDetail.hinhAnh}></Image>
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
            Lưu
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default FormUpdateCourse;