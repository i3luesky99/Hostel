import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/database';

export class Payment extends Model { }

Payment.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  contract_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  total_cost: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  electricity_number: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  water_number: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  internet_cost: {
    type: DataTypes.DECIMAL,
    allowNull: true
  },
  other_costs: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  payment_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  payment_method: {
    type: DataTypes.TINYINT,
    allowNull: false,
    // 0: cash, 1: bank transfer, 2: online payment
    validate: {
      isIn: [[0, 1, 2]]
    }
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false,
    // 0: pending, 1: completed, 2: failed
    validate: {
      isIn: [[0, 1, 2]]
    }
  }
}, {
  sequelize,
  modelName: 'Payment',
  tableName: 'payments',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
