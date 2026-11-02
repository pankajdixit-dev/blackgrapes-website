import mongoose from 'mongoose';
import Project from '../models/Project.js';
import ActivityLog from '../models/ActivityLog.js';
import { DEFAULT_PROJECTS } from '../defaultData.js';

export const getProjects = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, count: DEFAULT_PROJECTS.length, data: DEFAULT_PROJECTS, fallback: true });
    }

    const { featured, limit } = req.query;
    const query = {};
    if (featured === 'true') query.isFeatured = true;

    let q = Project.find(query).maxTimeMS(2000).sort({ order: 1, createdAt: -1 });
    if (limit) q = q.limit(Number(limit));

    const projects = await q;
    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.json({ success: true, count: DEFAULT_PROJECTS.length, data: DEFAULT_PROJECTS, fallback: true });
  }
};

export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body);
    await ActivityLog.create({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'CREATE',
      module: 'PROJECT',
      details: `Created project: ${project.title}`
    }).catch(() => {});

    res.status(201).json({ success: true, message: 'Project created successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    res.json({ success: true, message: 'Project updated successfully', data: project });
  } catch (error) {
    next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, message: 'Project not found' });

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    next(error);
  }
};

