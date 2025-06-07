import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  text: String,
  votes: { type: Number, default: 0 },
  userVote: [{ userId: mongoose.Types.ObjectId, username: String }]
});

const pollSchema = new mongoose.Schema({
  title: String,
  description: String,
  options: [optionSchema],
  creator: {
    id: mongoose.Types.ObjectId,
    username: String
  },
  isLocked: { type: Boolean, default: false },
  expiresAt: {
  type: Date,
  default: () => new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // mặc định sau 7 ngày
  index: { expires: 0 } // Chỉ dùng nếu muốn tự xóa document (xem bên dưới)
}
}, { timestamps: true });

const Poll = mongoose.model('Poll', pollSchema);

export default Poll;
