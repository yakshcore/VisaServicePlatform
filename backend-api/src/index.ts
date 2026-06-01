import 'dotenv/config';
import app from './app';
import { connectDB } from './config/database';
import { initCloudinary } from './config/cloudinary';

const PORT = process.env.PORT || 5000;

(async () => {
  await connectDB();
  initCloudinary();
  app.listen(PORT, () => {
    console.log(`VisaFlow API running on http://localhost:${PORT}`);
  });
})();
