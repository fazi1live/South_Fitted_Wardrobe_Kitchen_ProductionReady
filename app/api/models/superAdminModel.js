// Dependencies
const mongoose = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
mongoose.pluralize(null);
const saltRounds = 10;

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    name: { type: String, required: true, },
    username: { type: String, required: true, default: 'userOne', },
    email: { type: String, required: true, unique: true, },
    mobile: { type: String, required: true, },
    password: { type: String, required: true, },
    address: { type: String, required: true, },
    img: { type: String, required: true, },
    status: { type: Number, },
    created_At: { type: String, default: Date.now, },
    updated_At: { type: Date, },
});

adminSchema.plugin(mongooseUniqueValidator);

adminSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    next();
});

const adminModel = mongoose.model('Admins', adminSchema);

module.exports = adminModel;