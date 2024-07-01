
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { User, Event,ReservedEvent} = require('./Schema');


const imageDir = path.join(__dirname, 'Cardsimages');
if (!fs.existsSync(imageDir)) {
  fs.mkdirSync(imageDir);
}

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, imageDir);
  },
  filename: function (req, file, cb) {
    const title = req.body.title; // Get the title from the request body
    const organizerId = req.body.organizerId; // Get the organizerId from the request body
    // const extension = path.extname(file.originalname);
    const filename = `${title}_${organizerId}.png`;
    cb(null, filename);
  }
});

//creating a upload object
const upload = multer({ storage: storage });


// Display all users
const displayUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Display all events
const displayEvents = async (req, res, next) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (err) {
    next(err);
  }
};

//displaying all the reserved Events


const displayReservedEvents = async (req, res, next) => { 
  try {
    const reservedEvents = await ReservedEvent.find({});
    res.json(reservedEvents);
  } catch (err) {
    next(err);
  }
};
// const InsertUsers = async (req, res, next) => {
//   try {
//     const user = new User({
//       name: req.body.name,
//       email: req.body.email,
//       password: req.body.password
//     });
//     const savedUser = await user.save();
//     res.json({
//       message: 'User Added Successfully',
//       user: savedUser
//     });
//   } catch (err) {
//     next(err);
//   }
// };

const Login= async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password is incorrect, return an error
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Store the user data in the local storage
    const userData = {
      userId: user.userId,
      name: user.name,
      email: user.email
    };
    res.json({ message: 'Login successful from backend', user: userData });
  } catch (err) {
    next(err);
  }
};


const SignUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    console.log('Signup:', name, email, password);

    // Check if user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Create a new user
    const user = new User({ name, email, password });
    const savedUser = await user.save();

    // Log the saved user to check the userId field
    console.log('Saved User:', savedUser);

    // Store the user data in the local storage
    const userData = {
      userId: savedUser.userId,
      name: savedUser.name,
      email: savedUser.email
    };
    res.json({ message: 'Signup successful', user: userData });
  } catch (err) {
    next(err);
  }
};
 
const createEvent = async (req, res) => {
  try {
    console.log('Request Body:', req.body);
    const {
      title,
      details,
      location,
      city,
      dateTime,
      day,
      type,
      organizerId,
      vipTickets,
      regTickets,
      price,
    } = req.body;

    upload.single('image')(req, res, async function (err) {
      // if (err instanceof multer.MulterError) {
      //   // A Multer error occurred when uploading
      //   return res.status(400).json({ error: err.message });
      // } else if (err) {
      //   // An unknown error occurred when uploading
      //   return res.status(500).json({ error: err.message });
      // }

      //console.log('Request Body:', req.body); // Log the request body
      //console.log('Request File:', req.file); // Log the uploaded file

      //let imagePath = null;
      // if (req.file) {
        //const title = req.body.title;
        let imagePath = `${title}_${organizerId}.png`;
      // }

      const event = new Event({
        title: title,
        details: details,
        location: location,
        city: city,
        dateTime: dateTime,
        day: day,
        type: type,
        organizerId: organizerId,
        vipTickets: vipTickets,
        regTickets: regTickets,
        price: price,
        image: imagePath,
      });

      const savedEvent = await event.save();
      console.log('Saved Event:', savedEvent); // Log the saved event

      res.json({ message: 'Event created successfully', event: savedEvent });
    });
  } catch (err) {
    console.error('Error in createEvent:', err); // Log the error
    next(err);
  }
};

const getEventsByOrganizerId = async (req, res, next) => {
  try {
    const organizerId = req.params.organizerId;
    console.log('Organizer ID:', organizerId);
    const events = await Event.find({ organizerId, deleteStatus: false });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const getEventsNotID=async(req,res,next)=>{
  try {
    const organizerId = req.params.organizerId;
    const events = await Event.find({ organizerId: { $ne: organizerId }, deleteStatus: false });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const updateDeleteStatus = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const updatedEvent = await Event.findOneAndUpdate(
      { eventId },
      { $set: { deleteStatus: true } },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedEvent);
  } catch (err) {
    next(err);
  }
};

const getEventDetail = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    console.log('Event ID:', eventId);
    const event = await Event.findOne({ eventId: eventId });
    res.json(event);
  } catch (err) {
    next(err);
  }
};

 
const getTicket = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const ticketType = req.params.ticketType;  
    const event = await Event.findOne({ eventId });
    if(ticketType === 'vip') {
      res.json(event.vipTickets);
    } else {
      res.json(event.regTickets);
    }
  } catch (error) {
    next(error); // Don't forget to handle errors
  }
};

const InsertReserveTable = async (req, res, next) => {
  try {
    const reservedEvent = new ReservedEvent({
      eventId: req.body.eventId,
      userId: req.body.userId,
      completeStatus: false
    });
    const savedReservedEvent = await reservedEvent.save();
    const eventId = req.body.eventId;
    const event = await Event.findOne({ eventId });
    const ticketType = req.body.ticketType; // Assuming ticketType is sent in the request body

    // Decrement the ticket count
    if(ticketType === 'vip') {
      await Event.updateOne({ eventId }, { $inc: { vipTickets: -1 } });
      res.json(event.vipTickets - 1);
    } else {
      await Event.updateOne({ eventId }, { $inc: { regTickets: -1 } });
      res.json(event.regTickets - 1);
    }

    res.json({
      message: 'Event Reserved Successfully',
      reservedEvent: savedReservedEvent
    });
  } catch (err) {
    next(err);
  }
}

const ReservedEvents = async (req, res, next) => {
  try {
    const organizerId = req.params.organizerId;
    const reservedEvents = await ReservedEvent.find({ userId: organizerId, completeStatus: false });
    const eventIds = reservedEvents.map(event => event.eventId);
    const events = await Event.find({ eventId: { $in: eventIds }, deleteStatus: false });
    res.json(events);
  } catch (err) {
    next(err);
  }
};

const ReservedEventsDelete = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const organizerId = req.params.organizerId;
    const updatedReservedEvent = await ReservedEvent.findOneAndUpdate(
      { eventId: eventId, userId: organizerId, completeStatus},
      { $set: { completeStatus: true } },
      { new: true }
    );

    if (!updatedReservedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json(updatedReservedEvent);
  } catch (err) {
    next(err);
  }
};
module.exports = { displayUsers, displayEvents, Login, SignUp, createEvent, upload, getEventsByOrganizerId,getEventDetail,updateDeleteStatus,getEventsNotID,getTicket,InsertReserveTable,displayReservedEvents,ReservedEvents,ReservedEventsDelete };