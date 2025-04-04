"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config"); // this will allow to read my server the .env file
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const env_1 = require("./constants/env");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const http_1 = require("./constants/http");
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const authenticate_1 = __importDefault(require("./middleware/authenticate"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const session_route_1 = __importDefault(require("./routes/session.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json()); // a middleware to parse a json request
app.use(express_1.default.urlencoded({ extended: true })); // URL encoded to parse a Form Data
app.use((0, cors_1.default)({
    origin: env_1.APP_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.get("/", (_, res) => {
    res.status(http_1.OK).json({ status: "healthy" });
});
app.use("/auth", auth_route_1.default);
// protected routes
app.use("/user", authenticate_1.default, user_route_1.default);
app.use("/sessions", authenticate_1.default, session_route_1.default);
app.use(errorHandler_1.default);
app.listen(env_1.PORT, async () => {
    console.log(`Server is running on port ${env_1.PORT} in ${env_1.NODE_ENV}`);
    await (0, db_1.default)();
});
