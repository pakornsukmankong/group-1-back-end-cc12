const cloudinary = require('../config/cloudinary');

exports.upload = async (path, folder, publicId) => {
  const option = {
    use_filename: true,
    overwrite: true,
    unique_filename: false
  };

  if (folder) {
    option.folder = folder;
  }

  if (publicId) {
    option.public_id = publicId;
  }

  const res = await cloudinary.uploader.upload(path, option);
  return res.secure_url;
};

exports.getPublicId = (url) => {
  const splitSlash = url.split('/');
  return splitSlash[splitSlash.length - 1].split('.')[0];
};
