const express = require('express');
const router = express.Router();
const SchemaController = require('./SchemaController');

//displaying the routes



// Route to display all users
router.get('/users', SchemaController.displayUsers);

// Route to display all events
router.get('/events', SchemaController.displayEvents);

// Route to display all reserved events
router.get('/reserved', SchemaController.displayReservedEvents);
// router.post('/users', SchemaController.InsertUsers);



router.post('/login', SchemaController.Login);

router.post('/signup', SchemaController.SignUp);

router.post('/events_create', SchemaController.upload.single('image'), SchemaController.createEvent);

router.get('/myevents/:organizerId', SchemaController.getEventsByOrganizerId);

router.get('/eventdetail/:eventId', SchemaController.getEventDetail);

router.put('/events/:eventId/delete', SchemaController.updateDeleteStatus);

router.get('/eventsnotid/:organizerId', SchemaController.getEventsNotID);

router.get('/eventtickets/:eventId/:ticketType', SchemaController.getTicket);

router.post('/reserve-event', SchemaController.InsertReserveTable);

router.get('/reservedevents/:organizerId', SchemaController.ReservedEvents);

router.put('/reservedevents/:eventId/:organizerId/delete', SchemaController.ReservedEventsDelete);
module.exports = router;