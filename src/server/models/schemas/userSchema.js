'use strict';

var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  handle		  : { type: String, required: true, trim: true },
  firstname		: { type: String, required: true, trim: true },
  lastname		: { type: String, required: true, trim: true },
  contactNo		: { type: String, required: false, trim: true },
  pwdHash		  : { type: String, required: true, trim: true, default: 'abcd' },
  createdOn		: { type: Date, required: true, default: Date.now },
  lastLogin		: { type: Date, required: false, default: Date.now },

  // statusFlag enum to represent account status
  //   Registered: User created but email confirmation not complete
  //   Active: User active for regular operations
  //   Locked: User locked by admin or unsuccessful login attempts
  //   Inactive: Deactivated due to certain reasons like not used for long time
  statusFlag	: { type: String, required: true, default: 'registered' } 					
});

module.exports = mongoose.model('users', userSchema);
