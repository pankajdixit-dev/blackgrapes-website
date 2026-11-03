import mongoose from 'mongoose';
import Project from '../models/Project.js';
import { safeRecordActivity } from '../utils/activityLogger.js';
import { getStoredProjects, saveStoredProjects } from '../utils/siteStore.js';

export const getProjects = async (req, res, next) => {
  try {
    if (mongoose.connection && mongoose.connection.readyState === 1) {
      const { featured, limit } = req.query;
      const query = {};
      if (featured === 'true') query.isFeatured = true;

      let q = Project.find(query).maxTimeMS(1000).sort({ order: 1, createdAt: -1 });
      if (limit) q = q.limit(Number(limit));

      const projects = await q.lean();
      if (projects && projects.length > 0) {
        saveStoredProjects(projects);
        return res.json({ success: true, count: projects.length, data: projects });
      }
    }
  } catch (error) {}

  const stored = getStoredProjects();
  res.json({ success: true, count: stored.length, data: stored });
};

export const createProject = async (req, res, next) => {
  try {
    const list = getStoredProjects();
    const newProject = {
      ...req.body,
      id: req.body.id || `proj_${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    list.push(newProject);
    saveStoredProjects(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Project.create(newProject);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'CREATE',
      module: 'PROJECT',
      details: `Created project: ${newProject.title || newProject.name}`
    });

    res.status(201).json({ success: true, message: 'Project created successfully', data: newProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateProject = async (req, res, next) => {
  try {
    const list = getStoredProjects();
    const id = req.params.id;
    const index = list.findIndex((p) => p.id === id || p._id === id);

    let updatedProject;
    if (index >= 0) {
      list[index] = { ...list[index], ...req.body, updatedAt: new Date().toISOString() };
      updatedProject = list[index];
    } else {
      updatedProject = { ...req.body, id, updatedAt: new Date().toISOString() };
      list.push(updatedProject);
    }
    saveStoredProjects(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Project.findByIdAndUpdate(id, req.body, { new: true, runValidators: false }).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'UPDATE',
      module: 'PROJECT',
      details: `Updated project: ${updatedProject.title || updatedProject.name || id}`
    });

    res.json({ success: true, message: 'Project updated successfully', data: updatedProject });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    const id = req.params.id;
    const list = getStoredProjects().filter((p) => p.id !== id && p._id !== id);
    saveStoredProjects(list);

    if (mongoose.connection && mongoose.connection.readyState === 1) {
      try {
        await Project.findByIdAndDelete(id).maxTimeMS(1500);
      } catch (e) {}
    }

    safeRecordActivity({
      adminName: req.user?.name || 'Admin',
      adminEmail: req.user?.email || '',
      action: 'DELETE',
      module: 'PROJECT',
      details: `Deleted project ${id}`
    });

    res.json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
