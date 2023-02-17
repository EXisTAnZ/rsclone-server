"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class DBClient {
    constructor() {
        this.DBName = 'rsclone';
        this.DBUser = process.env.DB_USER || 'rs-clone';
        this.DBPassword = process.env.DB_PASSWORD || 'Z94ai17';
        const uri = `mongodb+srv://${this.DBUser}:${this.DBPassword}@cluster0.2uewvbb.mongodb.net/?retryWrites=true&w=majority`;
        this.client = new mongodb_1.MongoClient(uri);
    }
    async connect() {
        try {
            this.client.connect();
        }
        catch (error) {
            console.log(error);
        }
        console.info(`mongo db client is connected to ${this.DBName}`);
        this.client.on(`close`, () => {
            console.info(`mongo db client is disconnected`);
        });
        return this.client.db(this.DBName);
    }
    async getUsersCollection() {
        return (await this.connect()).collection('users');
    }
    async getSettingsCollection() {
        return (await this.connect()).collection('settings');
    }
}
const dbClient = new DBClient();
exports.default = dbClient;
//# sourceMappingURL=db-client.js.map