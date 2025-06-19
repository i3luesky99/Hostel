// services/houseBlockService.ts
import { Router } from "express";
import * as houseBlockController from "@/controllers/houseBlockController";

const router = Router();

router.get("/", houseBlockController.getAllHouseBlocks);
router.get("/:id", houseBlockController.getHouseBlockById);
router.post("/", houseBlockController.createHouseBlock);
router.put("/:id", houseBlockController.updateHouseBlock);
router.delete("/:id", houseBlockController.deleteHouseBlock);

export default router;
