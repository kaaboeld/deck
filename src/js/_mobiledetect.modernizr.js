/*global Modernizr MobileDetect*/
(function (window, Modernizr) {
    'use strict';
    var md = new MobileDetect(navigator.userAgent),
        grade = md.mobileGrade();
    Modernizr.addTest({
        mobile: !!md.mobile(),
        phone: !!md.phone(),
        tablet: !!md.tablet(),
        ios: (md.os() == "iOS"),
        safari:(!!navigator.userAgent.match(/safari/i) && !navigator.userAgent.match(/chrome/i) && typeof document.body.style.webkitFilter !== "undefined" && !window.chrome),
        mobilegradea: grade === 'A'
    });
    window.mobileDetect = md;
})(window, Modernizr);