// ==UserScript==
// @name         Elysium Vote
// @namespace    http://github.com/zerosnake0/elysium-vote
// @version      0.1
// @description  auto vote
// @author       zerosnake0
// @match        https://cp.elysium-project.org/vote
// @icon         https://www.google.com/s2/favicons?domain=elysium-project.org
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==
/* globals $ */

(function() {
    'use strict';
    console.log("vote started");
    $("a.btn.btn-low-green").each(function() {
        let href = $(this).attr("href");
        console.log(href, "[start]");
        if (href === "javascript:void(0)") {
            return;
        }
        $.get(href).done(function(data) {
            console.log(href, "[success]");
        }).fail(function() {
            console.log(href, "[failed]");
        });
    });
})();
