import { Request, Response, NextFunction } from 'express';
import { upload } from '../utils/cloudinary';

export const uploadMiddleware = (fieldName: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const uploadHandler = upload.single(fieldName);
    
    uploadHandler(req, res, (err) => {
      if (err) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).json({
            success: false,
            message: 'File size too large. Maximum size is 5MB'
          });
        }
        return res.status(400).json({
          success: false,
          message: 'Error uploading file',
          error: err.message
        });
      }
      next();
    });
  };
}; 