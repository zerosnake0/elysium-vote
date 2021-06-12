// ==UserScript==
// @name         Elysium Vote
// @namespace    http://github.com/zerosnake0/elysium-vote
// @version      0.1
// @description  auto vote
// @author       zerosnake0
// @match        https://cp.elysium-project.org/vote
// @icon         https://www.google.com/s2/favicons?domain=elysium-project.org
// @grant        GM_openInTab
// @require      http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

(function() {
    'use strict';
    $("a.btn.btn-low-green").each(function() {
        let href = $(this).attr("href");
        console.log(href);
        if (href === "javascript:void(0)") {
            return;
        }
        let tab = GM_openInTab(href, {
            active: false
        });
        setTimeout(function() {
            tab.close();
        }, 1000);
    });
})();
