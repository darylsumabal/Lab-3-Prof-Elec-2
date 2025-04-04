"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearAuthCookies = exports.setAuthCookies = exports.getRefreshTokenCookieOption = exports.getAccessTokenCookieOptions = exports.REFRESH_PATH = void 0;
const date_1 = require("./date");
exports.REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";
const defaults = {
    sameSite: "strict",
    httpOnly: true,
    secure,
};
const getAccessTokenCookieOptions = () => ({
    ...defaults,
    expires: (0, date_1.fifteenMinutesFromNow)(),
});
exports.getAccessTokenCookieOptions = getAccessTokenCookieOptions;
const getRefreshTokenCookieOption = () => ({
    ...defaults,
    expires: (0, date_1.thirtyDaysFromNow)(),
    path: exports.REFRESH_PATH,
});
exports.getRefreshTokenCookieOption = getRefreshTokenCookieOption;
const setAuthCookies = ({ res, accessToken, refreshToken }) => res
    .cookie("accessToken", accessToken, (0, exports.getAccessTokenCookieOptions)())
    .cookie("refreshToken", refreshToken, (0, exports.getRefreshTokenCookieOption)());
exports.setAuthCookies = setAuthCookies;
const clearAuthCookies = (res) => res.clearCookie("accessToken").clearCookie("refreshToken", {
    path: exports.REFRESH_PATH,
});
exports.clearAuthCookies = clearAuthCookies;
