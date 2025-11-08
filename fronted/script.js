function loadEvents() {
    fetch('http://localhost:5000/api/events')
    .then(response => response.json())
    .then(events => {
        const filteredEvents = filterUpcomingEventsInCurrentMonth(events);
        renderEvents(filteredEvents);
    });
}

function filterUpcomingEventsInCurrentMonth(events) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-based month index
    const today = now.getDate();

    return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getFullYear() === currentYear &&
               eventDate.getMonth() === currentMonth &&
               eventDate.getDate() >= today;
    });
}

function renderEvents(events) {
    const eventsContainer = document.getElementById('eventsContainer');
    if (!eventsContainer) return;

    eventsContainer.innerHTML = '';
    events.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Time:</strong> ${event.time || ''}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p class="price">Ticket Price: ${event.price} BDT</p>
            <button>Book Now</button>
        `;
        eventsContainer.appendChild(card);
    });
}

// Load events on page load on the homepage index.html
if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
    window.onload = loadEvents;
}