import { Request, Response } from "express";
import { HouseBlock } from "@/models/HouseBlock/HouseBlock";

export const getAllHouseBlocks = async (_: Request, res: Response) => {
  try {
    const blocks = await HouseBlock.findAll();
    res.json(blocks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching house blocks", error: err });
  }
};

export const getHouseBlockById = async (req: Request, res: Response): Promise<any> => {
  try {
    const block = await HouseBlock.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Not found" });
    res.json(block);
  } catch (err) {
    res.status(500).json({ message: "Error fetching block", error: err });
  }
};

export const createHouseBlock = async (req: Request, res: Response) => {
  try {
    const block = await HouseBlock.create(req.body);
    res.status(201).json(block);
  } catch (err) {
    res.status(500).json({ message: "Error creating block", error: err });
  }
};

export const updateHouseBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const block = await HouseBlock.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Not found" });

    await block.update(req.body);
    res.json(block);
  } catch (err) {
    res.status(500).json({ message: "Error updating block", error: err });
  }
};

export const deleteHouseBlock = async (req: Request, res: Response): Promise<any> => {
  try {
    const block = await HouseBlock.findByPk(req.params.id);
    if (!block) return res.status(404).json({ message: "Not found" });

    await block.destroy();
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting block", error: err });
  }
};
