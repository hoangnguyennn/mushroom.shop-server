import { v2 as cloudinaryV2 } from 'cloudinary';
import fs from 'fs';
import configs from '../configs';

cloudinaryV2.config({
  cloud_name: configs.cloudName,
  api_key: configs.cloudKey,
  api_secret: configs.cloudSecret
});

const UploadService = {
  uploadSingle: async (filePath: string) => {
    return cloudinaryV2.uploader.upload(filePath).then(res => {
      fs.unlinkSync(filePath);
      return {
        url: res.secure_url,
        publicId: res.public_id
      };
    });
  },
  deleteSingle: async (publicId: string) => {
    return cloudinaryV2.uploader.destroy(publicId);
  }
};

export default UploadService;
