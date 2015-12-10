function orient() {
    var result = "";
    $("body").removeClass("_landscape _portrait");
    if ((window.orientation == 0 || window.orientation == 180)) {
        result = "_portrait";
    }
    else if ((window.orientation == -90 || window.orientation == 90)) {
        result = "_landscape";
    }
    $("body").addClass(result);
    return result;
}
function pageSize() {
    var b = $("body");
    var h = $(window).height();
    var w = $(window).width();
    $("body").css({
        "width":w,
        "height":h
    });
}
$(window).load(function() {
});
$(document).on("ready",function(){
    orient();
    pageSize();
});
$(window).on("resize orientationchange", function() {
    orient();
    pageSize();
});