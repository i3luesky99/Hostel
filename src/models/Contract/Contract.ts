import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/database';

export class Contract extends Model { }

Contract.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  room_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Contract',
  tableName: 'contracts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
