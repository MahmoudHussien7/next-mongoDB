import path from "path";

const nextConfig = {
  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  images: {
    domains: ["res.cloudinary.com"], // السماح بجلب الصور من Cloudinary
  },
};

export default nextConfig;
