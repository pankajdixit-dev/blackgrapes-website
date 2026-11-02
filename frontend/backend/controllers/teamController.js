import TeamMember from '../models/TeamMember.js';

export const getTeamMembers = async (req, res, next) => {
  try {
    const team = await TeamMember.find({ isActive: true }).sort({ order: 1 });
    res.json({ success: true, count: team.length, data: team });
  } catch (error) {
    next(error);
  }
};

export const createTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.create(req.body);
    res.status(201).json({ success: true, message: 'Team member added', data: member });
  } catch (error) {
    next(error);
  }
};

export const updateTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!member) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, message: 'Team member updated', data: member });
  } catch (error) {
    next(error);
  }
};

export const deleteTeamMember = async (req, res, next) => {
  try {
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, message: 'Team member not found' });
    res.json({ success: true, message: 'Team member removed' });
  } catch (error) {
    next(error);
  }
};

