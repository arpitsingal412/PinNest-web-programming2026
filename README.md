# PinNest — Furniture & Interior Inspiration

A full-stack web application built for CSE2022 Web Programming.

## Technology Stack

- **UI Layer**: HTML + CSS
- **Logic Layer**: JavaScript (DOM, Events, JSON)
- **Backend Layer**: Node.js + Express.js
- **Data Layer**: MongoDB + Mongoose
- **Template Engine**: Handlebars
- **Architecture**: MVC

## Setup Instructions

### Prerequisites

- Node.js installed
- MongoDB installed and running locally

### Installation

1. Navigate to the project folder:

```
cd pinnest
```

2. Install dependencies:

```
npm install
```

3. Make sure MongoDB is running:

```
mongod
```

4. Seed the database with sample data:

```
node seed.js
```

5. Start the server:

```
node server.js
```

6. Open in browser:

```
http://localhost:3000
```

## Project Structure (MVC)

```
pinnest/
├── server.js           — Node.js HTTP server (Express)
├── seed.js             — Database seed script
├── models/             — Mongoose schemas (Data layer)
├── controllers/        — Route handlers (Logic)
├── routes/             — Express route definitions
├── views/              — Handlebars templates (View layer)
│   ├── layouts/        — Main layout
│   └── partials/       — Reusable components
└── public/             — Static files
    ├── css/            — Stylesheets
    ├── js/             — Browser JavaScript
    └── images/         — Local images
```

## Pages

1. **Home** (`/`) — Pinterest-style furniture feed
2. **Explore** (`/explore`) — Search and filter pins
3. **Pin Detail** (`/pins/:id`) — Single pin view
4. **Create Pin** (`/pins/create`) — Add new pin form
5. **Boards** (`/boards`) — View and create boards
6. **Board Detail** (`/boards/:id`) — Pins in a board
7. **Profile** (`/profile`) — User profile page
8. **My Rooms** (`/rooms`) — List of rooms
9. **Room Planner** (`/rooms/create`) — Create room with budget
10. **Room Detail** (`/rooms/:id`) — Room items and budget

## Unique Feature — Room Planner

Create a room, set a budget, add furniture items, and JavaScript calculates:
- Total cost
- Remaining budget
- Budget exceeded warning
