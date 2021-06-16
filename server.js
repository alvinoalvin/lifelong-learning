const cors = require('cors');
const Express = require('express');
const path = require('path');
const App = Express();
App.use(cors());
App.options('*', cors());
const BodyParser = require('body-parser');
const PORT = (process.env.PORT || 8080);
const db = require("./db");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
// App.use(Express.static('public'));
App.use(Express.static(path.join(__dirname, 'client/build')));

const users = require("./routes/users");
App.use("/api", users(db));
const deliverables = require("./routes/deliverables");
App.use("/api", deliverables(db));
const teams = require("./routes/teams");
App.use("/api", teams(db));
const analytics = require("./routes/analytics");
App.use("/api", analytics(db));
const skills = require("./routes/skills");
App.use("/api", skills(db));
const type = require("./routes/type");
App.use("/api", type(db));
const csv = require("./routes/csv");
App.use("/api", csv(db));
const status = require("./routes/status");
App.use("/api", status(db));
const notes = require("./routes/notes");
App.use("/api", notes(db));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));

App.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
