"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const db_client_1 = __importDefault(require("../../shared/db-client"));
class SettingService {
    constructor() {
        this.mongoClient = new mongodb_1.MongoClient('mongodb+srv://rs-clone');
        this.premiere = {
            ID: '301',
            link: 'https://youtu.be/8qB8EGNOtr8',
        };
    }
    async setPremiere(ID, link) {
        this.premiere.ID = ID;
        this.premiere.link = link;
        const collection = await db_client_1.default.getSettingsCollection();
        const data = await collection.updateOne({}, { $set: { premiere: this.premiere } });
        return this.premiere;
    }
    async getPremiere() {
        const collection = await db_client_1.default.getSettingsCollection();
        const data = await collection.findOne();
        if (data)
            this.premiere = data.premiere;
        return this.premiere;
    }
}
exports.default = SettingService;
//# sourceMappingURL=settings.service.js.map