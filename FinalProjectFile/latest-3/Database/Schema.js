const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AutoIncrement = require('mongoose-sequence')(mongoose);

// User Schema
const userSchema = new Schema({
  userId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

userSchema.plugin(AutoIncrement, { inc_field: 'userId', start_seq: 1 });
const User = mongoose.model('User', userSchema);

// Event Schema
const eventSchema = new Schema({
  eventId: { type: Number, unique: true },
  title: { type: String, required: true, unique: true },
  details: { type: String, required: true },
  location: { type: String, required: true },
  city: { type: String, required: true },
  dateTime: { type: Date, required: true },
  day: { type: String, required: true },
  type: { type: String, required: true },
  organizerId: { type: Number, ref: 'User', required: true },
  vipTickets: { type: Number, required: true },
  regTickets: { type: Number, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  deleteStatus: { type: Boolean, default: false }
});

eventSchema.plugin(AutoIncrement, { inc_field: 'eventId', start_seq: 1 });
const Event = mongoose.model('Event', eventSchema);

// Reserved Event Schema
const reservedEventSchema = new Schema({
  eventId: { type: Number, ref: 'Event', required: true },
  userId: { type: Number, ref: 'User', required: true },
  completeStatus: { type: Boolean, default: false }
});

const ReservedEvent = mongoose.model('ReservedEvent', reservedEventSchema);
const mySchemas = { User, Event, ReservedEvent };
module.exports = mySchemas;