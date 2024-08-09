import Link from 'next/link';
import { Result, Button } from 'antd';

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Xin lỗi, trang bạn tìm kiếm không tồn tại."
      extra={
        <Button type="primary">
          <Link href="/" className='text-decoration-none'>Quay lại trang chủ</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;
