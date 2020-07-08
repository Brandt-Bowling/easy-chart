const mongoose = require('mongoose');

const { Schema } = mongoose;

const userData = new Schema(
  {
    user: {
      firstName: String,
      lastName: String,
    },
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

module.exports = mongoose.model('userData', userData);
