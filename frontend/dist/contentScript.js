/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/

function scrapeProfile() {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const name = ((_b = (_a = document.querySelector("h1")) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || "";
    const about = ((_d = (_c = document.querySelector(".pv-about__summary-text")) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || "";
    const bio = ((_f = (_e = document.querySelector(".text-body-medium")) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || "";
    const location = ((_h = (_g = document.querySelector(".pv-top-card--list-bullet")) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) || "";
    const followerText = ((_j = document.querySelector(".t-black--light")) === null || _j === void 0 ? void 0 : _j.textContent) || "";
    const followerCount = parseInt(followerText.replace(/\D/g, "")) || 0;
    const connectionText = ((_k = document.querySelector(".t-bold")) === null || _k === void 0 ? void 0 : _k.textContent) || "";
    const connectionCount = parseInt(connectionText.replace(/\D/g, "")) || 0;
    const data = {
        name,
        url: window.location.href,
        about,
        bio,
        location,
        followerCount,
        connectionCount,
    };
    chrome.runtime.sendMessage({ action: "profileData", data });
}
setTimeout(scrapeProfile, 5000);

/******/ })()
;
//# sourceMappingURL=contentScript.js.map