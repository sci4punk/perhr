const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const userSchema = new Schema ({

    username: {type: String, unique: true, required: true},
    password: {type: String},
    email: {type: String, unique: true},
    linkedin: {type: Boolean, default: false},
    fullName: String,
    title: String,
    location: String,
    phone: String,
    rate: Number,
    portfolio: {type: Schema.Types.ObjectId, ref: 'Portfolio'},
    skills: {type: Schema.Types.ObjectId, ref: 'Skill'}
}, {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;