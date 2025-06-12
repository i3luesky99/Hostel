import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/database';

export class Room extends Model { }

Room.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  house_block_id:
  {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  room_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  status: {
    type: DataTypes.TINYINT,
    allowNull: false
  },
  electricity_cost: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  water_cost: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  internet_cost: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  other_costs: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Room',
  tableName: 'rooms',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
