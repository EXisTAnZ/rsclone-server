"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.premiereValidation = exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.body)('login', 'логин должен иметь не меньше 3 символов').isLength({ min: 3 }),
    (0, express_validator_1.body)('password', 'длина пароля должна быть больше 5 символов').isLength({ min: 6 }),
];
exports.loginValidation = [
    (0, express_validator_1.body)('login', 'логин не может быть пустым').exists(),
    (0, express_validator_1.body)('password', 'вход без пароля не возможен').exists(),
];
exports.premiereValidation = [
    (0, express_validator_1.body)('ID', 'ID не может быть пустым').exists(),
    (0, express_validator_1.body)('link', 'неверная ссылка').isURL(),
];
//# sourceMappingURL=validations.js.map