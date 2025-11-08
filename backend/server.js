const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize events array
let events = [
  {
    id: 1,
    title: "Sample Event 1",
    date: "2025-11-20",
    time: "18:00",
    location: "Location A",
    price: 100
  },
  {
    id: 2,
    title: "Sample Event 2",
    date: "2025-11-25",
    time: "20:00",
    location: "Location B",
    price: 150
  }
  // Add your other events here
];

// Function to remove past events
function removePastEvents() {
  const now = new Date();
  events = events.filter(event => new Date(event.date) >= now);
}

// Remove past events once on server start
removePastEvents();

// GET all events
app.get('/api/events', (req, res) => {
  res.json(events);
});

// GET events for the running month
app.get('/api/events/month/current', (req, res) => {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const monthlyEvents = events.filter(e => {
    const ed = new Date(e.date);
    return ed.getMonth() === month && ed.getFullYear() === year;
  });

  res.json(monthlyEvents);
});

// CREATE a new event
app.post('/api/events', (req, res) => {
  const { title, date, time, location, price } = req.body;
  const id = Math.max(0, ...events.map(e => e.id)) + 1;
  const newEvent = { id, title, date, time, location, price };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// DELETE an event
app.delete('/api/events/:id', (req, res) => {
  const id = parseInt(req.params.id);
  events = events.filter(e => e.id !== id);
  res.status(204).send();
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});