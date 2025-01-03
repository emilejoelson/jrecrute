const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const path = require("path");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const MongoStore = require("connect-mongo");

// Local imports
const db = require("./database/db.js");
const rout = require("./routes/UserRouter.js");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
app.io = io;

// Middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://apis.google.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
}));

app.use(
  cors({
    origin: [
      "https://www.consultcollab-recrutement.com",
      "http://localhost:4200",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later.",
});
app.use(limiter);

app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use((req, res, next) => {
  res.locals.message = req.session.message;
  delete req.session.message;
  req.app.io = io;
  next();
});

// Database connection
db()
  .then(() => console.log("Connected to MongoDB !!"))
  .catch((err) => console.error(err));

// Routes
app.use(rout);

// Socket.IO events
io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });

  socket.on("notification", (data) => {
    console.log("Received notification:", data);
    io.emit("notification", data);
  });
});

// Production setup
if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(
    __dirname,
    "client",
    "dist",
    "client",
    "browser"
  );

  app.use(
    express.static(staticPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith(".js")) {
          res.set("Content-Type", "application/javascript");
        }
      },
    })
  );

  app.get("*", (req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// Server setup
const port = process.env.PORT || 4000;
server.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});

module.exports = app;
