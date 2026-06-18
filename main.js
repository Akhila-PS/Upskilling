// main.js - Local Community Event Portal

// Exercise 1: Basics & Setup
console.log("Welcome to the Community Portal");

window.addEventListener('load', () => {
    alert("🎉 Page is fully loaded! Welcome to the Community Portal.");
});

// Exercise 2: Data Types & Operators
const eventName = "Tech Innovators Meetup";
const eventDate = "2025-07-15";
let availableSeats = 45;

console.log(`Event: ${eventName} on ${eventDate} | Seats left: ${availableSeats}`);

// Sample Events Array (Exercise 6)
let events = [
    {
        id: 1,
        title: "Tech Innovators Meetup",
        category: "Workshop",
        date: "2025-07-15",
        seats: 45,
        location: "New York"
    },
    {
        id: 2,
        title: "Music & Arts Fair",
        category: "Cultural",
        date: "2025-06-28",
        seats: 0,
        location: "Los Angeles"
    },
    {
        id: 3,
        title: "Community Sports Day",
        category: "Sports",
        date: "2025-07-20",
        seats: 120,
        location: "Chicago"
    }
];

// Exercise 5: Event Constructor + Prototype
function Event(id, title, category, date, seats, location) {
    this.id = id;
    this.title = title;
    this.category = category;
    this.date = date;
    this.seats = seats;
    this.location = location;
}

Event.prototype.checkAvailability = function() {
    return this.seats > 0;
};

// Exercise 7: DOM Manipulation - Render Events
function renderEvents(filteredEvents = events) {
    const container = document.getElementById('eventsContainer');
    if (!container) {
        console.warn("eventsContainer not found in HTML");
        return;
    }

    container.innerHTML = ''; // Clear previous

    filteredEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Category:</strong> ${event.category}</p>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p><strong>Seats Left:</strong> ${event.seats}</p>
            <button onclick="registerForEvent(${event.id})" 
                    ${event.seats <= 0 ? 'disabled' : ''}>
                ${event.seats > 0 ? 'Register' : 'Full'}
            </button>
        `;
        container.appendChild(card);
    });
}

// Exercise 3 & 6: Register User with try-catch
function registerForEvent(eventId) {
    try {
        const event = events.find(e => e.id === eventId);
        
        if (!event) throw new Error("Event not found");
        if (event.seats <= 0) throw new Error("No seats available");

        event.seats--;
        console.log(`✅ Registered for ${event.title}. Seats left: ${event.seats}`);
        
        alert(`🎉 Successfully registered for ${event.title}!`);
        renderEvents(); // Update UI

    } catch (error) {
        console.error("Registration Error:", error.message);
        alert("❌ " + error.message);
    }
}

// Exercise 4 & 6: Filter Events
function filterEventsByCategory(category) {
    return events.filter(event => 
        event.category.toLowerCase() === category.toLowerCase() && 
        event.seats > 0
    );
}

// Example: Filter Music/Cultural events
console.log("Cultural Events:", filterEventsByCategory("Cultural"));

// Exercise 8: Event Handling (will be connected via HTML)
function setupFilters() {
    const filterSelect = document.getElementById('categoryFilter');
    if (filterSelect) {
        filterSelect.addEventListener('change', function() {
            const filtered = this.value 
                ? filterEventsByCategory(this.value) 
                : events;
            renderEvents(filtered);
        });
    }
}

// Exercise 11: Form Handling
function setupRegistrationForm() {
    const form = document.getElementById('regForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Stop page reload

        const name = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const eventType = document.getElementById('eventType').value;

        if (!name || !email || !eventType) {
            alert("Please fill all required fields");
            return;
        }

        console.log(`New Registration → Name: ${name}, Email: ${email}, Event: ${eventType}`);
        alert(`Thank you ${name}! Registration successful for ${eventType}.`);
        
        // Bonus: Reduce seat if matching event
        const matchedEvent = events.find(e => e.title.toLowerCase().includes(eventType.toLowerCase()));
        if (matchedEvent && matchedEvent.seats > 0) {
            matchedEvent.seats--;
        }

        form.reset();
        renderEvents();
    });
}

// Initialize everything when page loads
window.addEventListener('load', () => {
    setupFilters();
    setupRegistrationForm();
    renderEvents();   // Display events dynamically
});

// Exercise 10: Modern JS Example
const displayEventInfo = ({title, date, seats}) => {
    console.log(`Modern JS: ${title} on ${date} - ${seats} seats`);
};

displayEventInfo(events[0]);