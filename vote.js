// ==UserScript==
// @name         Elysium Vote
// @namespace    http://github.com/zerosnake0/elysium-vote
// @version      0.1
// @description  auto vote
// @author       zerosnake0
// @match        https://cp.elysium-project.org/vote
// @icon         https://www.google.com/s2/favicons?domain=elysium-project.org
// @require      http://code.jquery.com/jquery-latest.min.js
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==
/* globals $ */

(function() {
    'use strict';
    console.log("vote started");

    let date = new Date().toISOString().slice(0,10);
    console.log("date", date);

    let key = "elysium_vote";
    let vote = GM_getValue(key);
    if (vote === undefined) {
        vote = {}
    }
    console.log("vote", vote)
    $("a.btn.btn-low-green").each(function() {
        let href = $(this).attr("href");
        console.log(href, "[start]");
        if (typeof href !== "string") {
            console.log(href, "skipped")
            return
        }
        if (href === "javascript:void(0)") {
            console.log(href, "skipped")
            return;
        }
        let latest = vote[href]
        console.log(href, "[latest]", latest);
        if (latest === date) {
            console.log(href, "already voted")
            return
        }
        $.get(href).done(function(data) {
            console.log(href, "[success]");
            vote[href] = date;
            GM_setValue(key, vote);
        }).fail(function() {
            console.log(href, "[failed]");
        });
    });
})();
