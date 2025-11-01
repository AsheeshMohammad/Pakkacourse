import { Sequelize } from 'sequelize';

let sequelize;

const connectDB = async () => {
  try {
    const dbUrl = process.env.DATABASE_URL || '';
    
    if (!dbUrl) {
      console.log('⚠️  PostgreSQL connection string is empty. Please set DATABASE_URL in your environment variables.');
      return;
    }

    console.log('🔗 Attempting to connect to database...');
    console.log('📊 Database URL:', dbUrl.substring(0, 20) + '...');

    sequelize = new Sequelize(dbUrl, {
      dialect: 'postgres',
      logging: process.env.NODE_ENV === 'development' ? console.log : false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    });

    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected successfully');
    
    // Import models after connection is established
    await import('../models/User.js');
    await import('../models/Link.js');
    
    // Sync database (create tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');
    
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    process.exit(1);
  }
};

const getSequelize = () => {
  if (!sequelize) {
    throw new Error('Database not initialized. Call connectDB() first.');
  }
  return sequelize;
};

export { connectDB, getSequelize };
