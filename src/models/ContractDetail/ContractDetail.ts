import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/database';

export class ContractDetail extends Model { }

ContractDetail.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  contract_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  tenant_id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'ContractDetail',
  tableName: 'contract_details',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});
