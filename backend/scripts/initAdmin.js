const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const initializeAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ username: process.env.ADMIN_USERNAME });
    
    if (existingAdmin) {
      console.log('ℹ️  Admin user already exists');
      process.exit(0);
    }

    // Create admin user
    const admin = new Admin({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'admin123',
      email: 'admin@exytex.com',
      role: 'super-admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    console.log(`Username: ${admin.username}`);
    console.log(`Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('🔐 Please change the default password after first login');

  } catch (error) {
    console.error('❌ Error initializing admin:', error);
  } finally {
    mongoose.connection.close();
  }
};

initializeAdmin();