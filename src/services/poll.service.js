import Poll from '../models/poll.model.js';

const createPoll = async (pollData) => {
  return await Poll.create(pollData);
};

const getPolls = async () => {
  const polls = await Poll.find(); 
  return { polls, total: polls.length };
};

const getPollById = async (id) => {
  return await Poll.findById(id);
};

const updatePoll = async (id, updateData) => {
  return await Poll.findByIdAndUpdate(id, updateData, { new: true });
};

const deletePoll = async (id) => {
  return await Poll.findByIdAndDelete(id);
};

const lockPoll = async (id) => {
  return await Poll.findByIdAndUpdate(id, { isLocked: true }, { new: true });
};

const unlockPoll = async (id) => {
  return await Poll.findByIdAndUpdate(id, { isLocked: false }, { new: true });
};

const addOption = async (id, text) => {
  const poll = await Poll.findById(id);
  if (!poll || poll.isLocked) return null;
  poll.options.push({ text });
  await poll.save();
  return poll;
};

const removeOption = async (pollId, optionId) => {
  const poll = await Poll.findById(pollId);
  if (!poll) return null;
  poll.options = poll.options.filter(opt => opt._id.toString() !== optionId);
  await poll.save();
  return poll;
};

export default {
  createPoll,
  getPolls,
  getPollById,
  updatePoll,
  deletePoll,
  lockPoll,
  unlockPoll,
  addOption,
  removeOption
};
