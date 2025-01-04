require("dotenv").config();
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
const crypto = require("crypto");

// Local imports
const db = require("./database/db.js");
const rout = require("./routes/UserRouter.js");
const configureSocket = require("./config/socket");
const { errorHandler } = require("./middleware/errorHandler");

class Server {
  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = socketIo(this.server, {
      cors: {
        origin: [
          "https://www.consultcollab-recrutement.com",
          "http://localhost:4200",
        ],
        credentials: true,
      },
    });
    this.port = process.env.PORT || 4000;

    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.initializeDatabase();
    this.initializeSocket();
  }

  initializeMiddleware() {
    // Security nonce
    this.app.use((req, res, next) => {
      res.locals.nonce = Buffer.from(crypto.randomBytes(16)).toString("base64");
      next();
    });

    // Content Security Policy (CSP) Configuration
    const cspConfig = {
      directives: {
        defaultSrc: ["'self'"],
        imgSrc: ["'self'", "data:", "blob:", "https:"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          (req, res) => `'nonce-${res.locals.nonce}'`,
        ],
        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://fonts.googleapis.com",
          "https://cdn.jsdelivr.net",
        ],
        fontSrc: [
          "'self'",
          "data:",
          "https://fonts.gstatic.com",
          "https://cdn.jsdelivr.net",
        ],
        connectSrc: ["'self'", "https:", "wss:", "ws:"],
        frameSrc: ["'self'"],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        workerSrc: ["'self'", "blob:"],
        childSrc: ["'self'", "blob:"],
        formAction: ["'self'"],
        upgradeInsecureRequests:
          process.env.NODE_ENV === "production" ? [] : null,
        baseUri: ["'self'"],
      },
      reportOnly: false,
    };

    // Manual CSP Header for more control
    this.app.use((req, res, next) => {
      res.setHeader(
        "Content-Security-Policy",
        Object.entries(cspConfig.directives)
          .filter(([key, value]) => value !== null)
          .map(([key, value]) => {
            const directiveValues = Array.isArray(value)
              ? value
                  .map((v) => (typeof v === "function" ? v(req, res) : v))
                  .join(" ")
              : value;
            return `${key
              .replace(/[A-Z]/g, "-$&")
              .toLowerCase()} ${directiveValues}`;
          })
          .join("; ")
      );
      next();
    });

    // Helmet security (Updated format)
    this.app.use(
      helmet({
        contentSecurityPolicy: cspConfig,
        dnsPrefetchControl: { allow: false },
        frameguard: { action: "deny" },
        hsts: {
          maxAge: 31536000,
          includeSubDomains: true,
          preload: true,
        },
        ieNoOpen: true,
        noSniff: true,
        permittedCrossDomainPolicies: true,
        referrerPolicy: { policy: "strict-origin-when-cross-origin" },
        xssFilter: true,
      })
    );

    // CORS configuration
    this.app.use(
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

    // Body parser
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(bodyParser.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: false }));

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      message: "Too many requests, please try again later.",
    });
    this.app.use(limiter);

    // Session configuration
    this.app.use(
      session({
        secret: process.env.SESSION_SECRET || "fallback_secret",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
          mongoUrl: process.env.MONGO_URI,
          ttl: 24 * 60 * 60, // 1 day
        }),
        cookie: {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "Strict",
          maxAge: 24 * 60 * 60 * 1000,
        },
      })
    );

    // Socket.io middleware
    this.app.use((req, res, next) => {
      res.locals.message = req.session.message;
      delete req.session.message;
      req.app.io = this.io;
      next();
    });
  }

  initializeRoutes() {
    this.app.use(rout);

    // Production static file serving
    if (process.env.NODE_ENV === "production") {
      const staticPath = path.join(
        __dirname,
        "client",
        "dist",
        "client",
        "browser"
      );

      // Serve static files from Angular dist directory
      this.app.use(
        express.static(staticPath, {
          setHeaders: (res, filePath) => {
            if (filePath.endsWith(".js")) {
              res.setHeader("Content-Type", "application/javascript");
            } else if (filePath.endsWith(".css")) {
              res.setHeader("Content-Type", "text/css");
            }
          },
        })
      );

      this.app.get("*", (req, res) => {
        res.sendFile(path.join(staticPath, "index.html"));
      });
    } else {
      this.app.get("/", (req, res) => {
        res.send("API running");
      });
    }
  }

  initializeErrorHandling() {
    this.app.use(errorHandler);
  }

  async initializeDatabase() {
    try {
      await db();
      console.log("Connected to MongoDB !!");
    } catch (err) {
      console.error("Database connection error:", err);
      process.exit(1);
    }
  }

  initializeSocket() {
    configureSocket(this.io);
  }

  start() {
    this.server.listen(this.port, () => {
      console.log(`Server running on port ${this.port}.`);
    });
  }
}

// Create and start server instance
const server = new Server();
server.start();

module.exports = server.app;
