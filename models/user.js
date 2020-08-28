const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const User = new Schema({
  firstName: { type: String, required: [true, 'First name required'] },
  lastName: { type: String, required: [true, 'Last name required'] },
  email: {
    type: String,
    validate: [validator.isEmail, 'Invalid Email'],
    required: [true, 'Email is required'],
  },
  data: [{ type: Schema.Types.ObjectId, ref: 'DataEntry' }],
});

User.virtual('name').get(() => {
  let fullName = '';
  if (this.firstName && this.lastName) {
    fullName = `${this.firstName}, ${this.lastName}`;
  }

  if (!this.firstName || !this.lastName) {
    fullName = '';
  }

  return fullName;
});

User.virtual('url').get(() => `/users/${this._id}`);

module.exports = mongoose.model('User', User);
