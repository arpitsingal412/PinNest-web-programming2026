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

4. Start the server:

```
node server.js
```

5. Open in browser:

```
http://localhost:3000
```

## Project Structure (MVC)

```
pinnest/
├── server.js           — Node.js HTTP server (Express)
├── controllers/        — Route handlers (Logic)
├── routes/             — Express route definitions
├── views/              — Handlebars templates (View layer)
│   ├── layouts/        — Main layout
│   └── partials/       — Reusable components
└── public/             — Static files
    ├── css/            — Stylesheets
    └── js/             — Browser JavaScript
```

## Pages

1. **Home** (`/`) — Home page
