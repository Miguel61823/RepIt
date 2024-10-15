"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountService = void 0;
const db_1 = require("../db");
class AccountService {
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let select = ``;
            const query = {
                text: select,
                values: [],
            };
            const { rows } = yield db_1.pool.query(query);
            const accounts = [];
            for (const row of rows) {
                accounts.push(row);
            }
            return accounts;
        });
    }
    addAccount(userData) {
        return __awaiter(this, void 0, void 0, function* () {
            let select = `INSERT INTO member(email, first_name, last_name)
     VALUES ($1, $2, $3)
     RETURNING *`;
            const query = {
                text: select,
                values: [userData.email, userData.first_name, userData.last_name]
            };
            const { rows } = yield db_1.pool.query(query);
            return rows[0];
        });
    }
    getByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            let select = `
    SELECT * FROM member
    WHERE email = $1`;
            const query = {
                text: select,
                values: [email],
            };
            const { rows } = yield db_1.pool.query(query);
            return rows[0];
        });
    }
}
exports.AccountService = AccountService;
