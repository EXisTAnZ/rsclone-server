"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const users_1 = __importDefault(require("./main/components/users/users"));
const settings_1 = __importDefault(require("./main/components/settings/settings"));
class Server {
    constructor() {
        this.PORT = process.env.PORT || '3000';
        this.app = (0, express_1.default)();
        this.app.use((0, cors_1.default)());
        this.app.use(body_parser_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.usersRouter = new users_1.default();
        this.settingsRouter = new settings_1.default();
    }
    start() {
        this.app.use('/api/user', this.usersRouter.router);
        this.app.use('/api/settings', this.settingsRouter.router);
        this.app.listen(this.PORT);
        console.info(`Server is started on port ${this.PORT}`);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map