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

function msToDuration(diff) {
    if (diff < 1000) {
        return diff.toFixed(2) + "ms";
    }
    let sec = diff / 1000;
    if (sec < 60) {
        return sec.toFixed(2) + "s";
    }
    let min = sec / 60;
    if (min < 60) {
        return min.toFixed(2) + "m";
    }
    let h = min / 60;
    if (h < 24) {
        return h.toFixed(2) + "h";
    }
    let d = h / 24;
    return d.toFixed(2) + "d";
}

(function() {
    'use strict';
    console.log("vote started");

    let date = new Date();
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
            console.log(href, "skipped because of invalid href type");
            return
        }
        if (href === "javascript:void(0)") {
            console.log(href, "skipped because of invalid href value");
            return;
        }
        let latest = vote[href];
        console.log(href, "[latest]", new Date(latest));
        if (typeof latest === "number") {
            let diff = date.getTime() - latest;
            console.log(href, "[time diff]", msToDuration(diff));
            if (diff < 24 * 60 * 60 * 1000) {
                console.log(href, "skipped because of cd");
                return;
            }
        }
        $.get(href).done(function(data) {
            let now = new Date()
            console.log(href, "[success]", now);
            vote[href] = now.getTime();
            GM_setValue(key, vote);
        }).fail(function() {
            console.log(href, "[failed]");
        });
    });
})();
