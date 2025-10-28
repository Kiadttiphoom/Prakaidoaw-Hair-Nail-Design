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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GET = void 0;
var server_1 = require("next/server");
function GET(req) {
    return __awaiter(this, void 0, void 0, function () {
        var searchParams, code, tokenRes, tokenData, profileRes, profile, state, redirectUrl, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URL(req.url).searchParams;
                    code = searchParams.get("code");
                    if (!code) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: "Missing code" }, { status: 400 })];
                    }
                    return [4 /*yield*/, fetch("https://api.line.me/oauth2/v2.1/token", {
                            method: "POST",
                            headers: { "Content-Type": "application/x-www-form-urlencoded" },
                            body: new URLSearchParams({
                                grant_type: "authorization_code",
                                code: code,
                                redirect_uri: process.env.LINE_CALLBACK_URL,
                                client_id: process.env.LINE_CHANNEL_ID,
                                client_secret: process.env.LINE_CHANNEL_SECRET
                            })
                        })];
                case 1:
                    tokenRes = _a.sent();
                    return [4 /*yield*/, tokenRes.json()];
                case 2:
                    tokenData = _a.sent();
                    if (tokenData.error) {
                        return [2 /*return*/, server_1.NextResponse.json({ error: tokenData.error_description }, { status: 400 })];
                    }
                    return [4 /*yield*/, fetch("https://api.line.me/v2/profile", {
                            headers: { Authorization: "Bearer " + tokenData.access_token }
                        })];
                case 3:
                    profileRes = _a.sent();
                    return [4 /*yield*/, profileRes.json()];
                case 4:
                    profile = _a.sent();
                    state = searchParams.get("state") || "/";
                    redirectUrl = new URL(state, req.url);
                    res = server_1.NextResponse.redirect(redirectUrl);
                    // เก็บ cookie (เพื่อให้ client โหลดมาทีหลัง)
                    res.cookies.set("line_user", JSON.stringify(profile), {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax",
                        path: "/",
                        maxAge: 60 * 60 * 24
                    });
                    return [2 /*return*/, res];
            }
        });
    });
}
exports.GET = GET;
