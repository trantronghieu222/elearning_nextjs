/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: ' elearningnew.cybersoft.edu.vn',
                port: '',
                pathname: '/**'
            }
        ]
    }
};

export default nextConfig;
