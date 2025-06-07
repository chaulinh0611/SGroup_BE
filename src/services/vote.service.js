import Poll from '../models/poll.model.js';

export const vote = async ({ pollId, optionId, user }) => {
  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error('Poll not found');
  if (poll.isLocked) throw new Error('Poll is locked');

  const option = poll.options.id(optionId);
  if (!option) throw new Error('Option not found');

  const alreadyVoted = option.userVote.some(v => 
  v?.userId?.toString?.() === user?._id?.toString?.()
);

  if (alreadyVoted) throw new Error('User already voted');

  option.votes++;
  option.userVote.push({
    userId: user._id,
    username: user.username
  });

  await poll.save();
  return poll;
};


export const unvote = async ({ pollId, optionId, user }) => {
  const userId = user._id || user.id;

  if (!userId) {
    throw new Error('User is missing or invalid');
  }

  const poll = await Poll.findById(pollId);
  if (!poll) throw new Error('Poll not found');

  const option = poll.options.id(optionId);
  if (!option) throw new Error('Option not found');
  option.userVote = option.userVote.filter(v => {
    return v.userId && v.userId.toString() !== user._id.toString();
  });

  option.votes = option.userVote.length;

  await poll.save();
  return poll;
};



