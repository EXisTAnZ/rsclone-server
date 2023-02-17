"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_client_1 = __importDefault(require("../../shared/db-client"));
class UsersService {
    constructor() {
        this.mongoClient = new mongodb_1.MongoClient('mongodb+srv://rs-clone');
        this.users = [];
    }
    async findByLogin(login) {
        const collection = await db_client_1.default.getUsersCollection();
        const data = await collection.findOne({ login: login });
        return data;
    }
    async create(user) {
        const collection = await db_client_1.default.getUsersCollection();
        const createdAt = new Date();
        const { insertedId } = await collection.insertOne({
            createdAt,
            updatedAt: createdAt,
            login: user.login,
            password: user.password,
        });
        console.log(insertedId);
        console.log('created user', user);
        return user;
    }
    async hashPassword(password) {
        const salt = await bcryptjs_1.default.genSalt(5);
        return await bcryptjs_1.default.hash(password, salt);
    }
    createToken(login) {
        return jsonwebtoken_1.default.sign({ login: login }, process.env.TOKEN_SECRET || 'secret');
    }
    verifyToken(auth) {
        const token = auth.split(' ')[0] === 'Bearer' ? auth.split(' ')[1] : '';
        try {
            const verified = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || 'secret');
            console.log('verified', verified);
            return verified.login;
        }
        catch (err) {
            return '';
        }
    }
}
exports.default = UsersService;
//# sourceMappingURL=users.service.js.map