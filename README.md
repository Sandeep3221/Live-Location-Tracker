# Live Location Tracker

Live Location Tracker lets a consenting user share live GPS coordinates and shows those updates on a map in real time. It is intended for demonstrations and educational use.


## Prerequisites
To get this application up and running, ensure you have the following:
- **Node.js** (v16 or higher)

## Installation
1. **Clone the repository**:
```bash
git clone https://github.com/Sandeep3221/Live-Location-Tracker.git
cd live-location-tracker
```

2. **Install dependencies**:
```bash
npm install
```

3. **Run the application:**
```bash
npm start
```

4. Open the local dashboard URL printed in the terminal.

5. Login credentials:
```js
username: admin
password: admin
```

## Project structure

```text
src/
  app.js                 Express and Socket.IO setup
  middleware/            Authentication middleware
  routes/                HTTP routes
  services/              Cloudflare tunnel setup
  store/                 In-memory target locations
public/
  css/                    Page styles
  js/                     Browser-side behavior
views/                    HTML templates
server.js                 Application entry point
config.js                 Environment-based configuration
```

Optional environment variables: `PORT`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, and `AUTH_TOKEN`.
