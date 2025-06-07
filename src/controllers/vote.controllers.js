import * as voteService from '../services/vote.service.js';
const vote = async (req, res, next) => {
  try {
    const result = await voteService.vote({
      pollId: req.params.id,     
      optionId: req.params.optionId,
      user: req.user             
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

const unvote = async (req, res, next) => {
  try {
    const result = await voteService.unvote({
      pollId: req.params.id,
      optionId: req.params.optionId,
      user: req.user
    });
    res.json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};
const voteController = {
  vote,
  unvote
};

export default voteController;