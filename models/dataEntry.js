const mongoose = require('mongoose');

const { Schema } = mongoose;

const DataEntry = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    stats: {
      temp: { type: Number, required: true },
      symbol: {
        type: String,
        enum: ['No Mucus', 'Less-fertile', 'More-fertile'],
        required: true,
      },
      cervix: {
        type: String,
        enum: ['Hard', 'Soft', 'Closed', 'Open', 'Not Provided'],
        default: 'Not Provided',
      },
      mucus: {
        characteristic: {
          type: String,
          enum: ['Stretchy', 'Tacky', 'Nothing'],
          required: true,
        },
        sensation: {
          type: String,
          enum: ['Dry', 'Moist', 'Wet, Slippery'],
          required: true,
        },
      },
    },
  },
  {
    collection: 'data',
    timestamps: { createdAt: 'createdAt' },
  }
);

module.exports = mongoose.model('DataEntry', DataEntry);
