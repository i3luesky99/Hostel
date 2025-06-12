import { Contract } from "./Contract/Contract";
import { ContractDetail } from "./ContractDetail/ContractDetail";
import { HouseBlock } from "./HouseBlock/HouseBlock";
import { Payment } from "./Payment/Payment";
import { Room } from "./Room/Room";
import { Tenant } from "./Tenant/Tenant";
import { User } from "./User/User";

export const applyAssociations = () => {
  User.hasMany(HouseBlock, { foreignKey: "user_id", as: "houseBlocks" });

  HouseBlock.belongsTo(User, { foreignKey: "user_id", as: "user" });
  HouseBlock.hasMany(Room, { foreignKey: "house_block_id", as: "rooms" });

  Room.belongsTo(HouseBlock, { foreignKey: "house_block_id", as: "houseBlock" });
  Room.hasMany(Contract, { foreignKey: "room_id", as: "contracts" });

  Contract.belongsTo(Room, { foreignKey: "room_id", as: "room" });
  Contract.hasMany(ContractDetail, { foreignKey: "contract_id", as: "contractDetails" });
  Contract.hasMany(Payment, { foreignKey: "contract_id", as: "payments" });

  Payment.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });

  Tenant.hasMany(ContractDetail, { foreignKey: "tenant_id", as: "contractDetails" });

  ContractDetail.belongsTo(Contract, { foreignKey: "contract_id", as: "contract" });
  ContractDetail.belongsTo(Tenant, { foreignKey: "tenant_id", as: "tenant" });
};
