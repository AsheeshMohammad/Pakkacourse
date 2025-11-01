import { DataTypes } from 'sequelize';
import { getSequelize } from '../config/database.js';
import User from './User.js';

let sequelize = getSequelize();

const Link = sequelize.define('Link', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      len: [1, 100],
      notEmpty: true
    }
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      isUrl: true,
      notEmpty: true
    }
  },
  description: {
    type: DataTypes.TEXT,
    validate: {
      len: [0, 500]
    }
  },
  category: {
    type: DataTypes.ENUM('course', 'resource', 'tutorial', 'documentation', 'other'),
    allowNull: false
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING(20)),
    defaultValue: []
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  lastUpdatedBy: {
    type: DataTypes.UUID,
    references: {
      model: 'users',
      key: 'id'
    }
  }
}, {
  timestamps: true,
  tableName: 'links',
  indexes: [
    {
      fields: ['category', 'isActive']
    },
    {
      fields: ['createdBy']
    },
    {
      fields: ['tags']
    }
  ]
});

// Define associations
Link.belongsTo(User, { 
  as: 'createdByUser', 
  foreignKey: 'createdBy' 
});
Link.belongsTo(User, { 
  as: 'lastUpdatedByUser', 
  foreignKey: 'lastUpdatedBy' 
});

export default Link;
