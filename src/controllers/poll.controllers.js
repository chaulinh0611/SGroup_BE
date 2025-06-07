import pollService from '../services/poll.service.js';
import express from 'express';
const getAllPolls = async (req, res, next) => {
  try {
    

    const { polls, total } = await pollService.getPolls();

    return res.status(200).json({
      success: true,
      message: 'Get all Poll successfully',
      data: {
        polls,
        total
      }
    });
  } catch (error) {
    next(error);
  }
};
const getPollById = async (req, res, next) => {
  try {
    const poll = await pollService.getPollById(req.params.id);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Get Poll successfully',
      data: { ...poll.toObject(), totalVotes: poll.options.reduce((a, b) => a + b.votes, 0) }
    });
  } catch (error) {
    next(error);
  }
};
const createPoll = async (req, res, next) => {
  try {
    console.log("req.body:", req.body);    
    console.log("req.user:", req.user); 
    if (!Array.isArray(req.body.options) || req.body.options.length < 1) {
      return res.status(400).json({
        success: false,
        message: 'Poll must have at least 1 options'
      });
    }

    const poll = await pollService.createPoll({
      title: req.body.title,
      description: req.body.description,
      options: req.body.options,
      creator: {
        id: req.user.id,
        username: req.user.username
      }
    });

    return res.status(201).json({
      success: true,
      message: 'Poll created successfully',
      data: poll
    });
  } catch (error) {
    next(error);
  }
};

const updatePoll = async (req, res, next) => {
  try {
    const poll = await pollService.updatePoll(req.params.id, req.body);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      data: poll
    });
  } catch (error) {
    next(error);
  }
};
const deletePoll = async (req, res, next) => {
  try {
    const poll = await pollService.deletePoll(req.params.id);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      message: 'Poll deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};
const lockPoll = async (req, res, next) => {
  try {
    const poll = await pollService.lockPoll(req.params.id);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      data: poll
    });
  } catch (error) {
    next(error);
  }
};
const unlockPoll = async (req, res, next) => {
  try {
    const poll = await pollService.unlockPoll(req.params.id);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      data: poll
    });
  } catch (error) {
    next(error);
  }
};
const addOption = async (req, res, next) => {
  try {
    const poll = await pollService.addOption(req.params.id, req.body.text);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found or locked' });
    }
    return res.status(200).json({
      success: true,
      data: poll
    });
  } catch (error) {
    next(error);
  }
};
const removeOption = async (req, res, next) => {
  try {
    const poll = await pollService.removeOption(req.params.id, req.params.optionId);
    if (!poll) {
      return res.status(404).json({ success: false, message: 'Poll not found' });
    }
    return res.status(200).json({
      success: true,
      data: poll
    });
  } catch (error) {
    next(error);
  }
};

const pollController = {
  getAllPolls,
  getPollById,
  createPoll,
  updatePoll,
  deletePoll,
    lockPoll,
    unlockPoll,
    addOption,
    removeOption
};
export default pollController;
