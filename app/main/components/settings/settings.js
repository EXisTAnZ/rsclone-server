"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const validations_1 = require("../../../shared/model/validations");
const settings_service_1 = __importDefault(require("../../services/settings.service"));
class SettingsRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.settingsService = new settings_service_1.default();
        this.router.post('/premiere', validations_1.premiereValidation, (req, res) => this.setPremiere(req, res));
        this.router.get('/premiere', (req, res) => this.getPremiere(req, res));
    }
    async getPremiere(req, res) {
        const validateErr = (0, express_validator_1.validationResult)(req);
        if (!validateErr.isEmpty()) {
            return res.status(400).json({ errors: validateErr.array()[0] });
        }
        console.log(req.method, req.originalUrl);
        try {
            const premiere = await this.settingsService.getPremiere();
            if (!premiere) {
                throw new Error('Отсутствует в базе');
            }
            res.json(premiere);
        }
        catch (err) {
            return res.status(400).json({
                errors: { msg: err.message },
            });
        }
    }
    async setPremiere(req, res) {
        console.log(req.body);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0] });
        }
        try {
            const premiere = await this.settingsService.setPremiere(req.body.ID, req.body.link);
            res.json(premiere);
        }
        catch (err) {
            res.send('error');
        }
    }
}
exports.default = SettingsRouter;
//# sourceMappingURL=settings.js.map