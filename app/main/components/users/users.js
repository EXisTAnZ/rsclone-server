"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const users_service_1 = __importDefault(require("../../services/users.service"));
const validations_1 = require("../../../shared/model/validations");
class UsersRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.usersService = new users_service_1.default();
        this.router.post('/login', validations_1.loginValidation, (req, res) => this.login(req, res));
        this.router.post('/register', validations_1.registerValidation, (req, res) => this.register(req, res));
        this.router.get('/me', (req, res) => this.authorization(req, res));
    }
    async login(req, res) {
        let paramErr = 'login';
        const validateErr = (0, express_validator_1.validationResult)(req);
        if (!validateErr.isEmpty()) {
            return res.status(400).json({ errors: validateErr.array()[0] });
        }
        console.log(req.body);
        try {
            const existedUser = await this.usersService.findByLogin(req.body.login);
            if (!existedUser) {
                throw new Error('Неверный логин');
            }
            const validPassword = await bcryptjs_1.default.compare(req.body.password, existedUser.password);
            if (!validPassword) {
                paramErr = 'password';
                throw new Error('Неверный пароль');
            }
            const token = this.usersService.createToken(existedUser.login);
            res.header('auth-token', token).json({
                errors: null,
                token,
                data: existedUser,
            });
        }
        catch (err) {
            return res.status(400).json({
                errors: { msg: err.message, param: paramErr },
            });
        }
    }
    async register(req, res) {
        console.log(req.body);
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0] });
        }
        try {
            const existedUser = await this.usersService.findByLogin(req.body.login);
            if (existedUser) {
                throw new Error('Пользователь уже зарегистрирован');
            }
        }
        catch (err) {
            return res.status(400).json({
                errors: { msg: err.message, param: 'login' },
            });
        }
        try {
            const password = await this.usersService.hashPassword(req.body.password);
            const user = await this.usersService.create({
                login: req.body.login,
                password,
            });
            const token = this.usersService.createToken(user.login);
            res.header('auth-token', token).json({
                errors: null,
                token,
                data: user,
            });
        }
        catch (err) {
            res.send('error');
        }
    }
    async authorization(req, res) {
        try {
            const login = this.usersService.verifyToken(req.headers.authorization || '');
            if (!login) {
                throw new Error('Invalid token');
            }
            res.send({
                errors: null,
                token: '',
                data: { login, result: true, msg: 'authorization success' },
            });
        }
        catch (err) {
            return res.status(400).json({
                errors: { msg: err.message },
            });
        }
    }
}
exports.default = UsersRouter;
//# sourceMappingURL=users.js.map