"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const port = process.env.ACCOUNT_SERVICE_PORT || 5401;
app_1.default.listen(port, () => {
    console.log(`Server Running on port ${port}`);
});
