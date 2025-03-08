import { Request, Response } from "express";
import * as taskService from "../services/taskService";

export const getTasks = async (req: Request, res: Response): Promise<void> => {
  const tasks = await taskService.getAllTasks();
  res.json(tasks);
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.createTask(req.body);
  res.status(201).json(task);
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.getTaskById(req.params.id);
  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }
  res.json(task);
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const task = await taskService.updateTask(req.params.id, req.body);
  res.json(task);
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  await taskService.deleteTask(req.params.id);
  res.status(204).send();
};
