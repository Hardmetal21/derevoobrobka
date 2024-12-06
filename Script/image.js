$(document).ready(function() {
    $(".image").click(function() {
        var img = $(this); 
        var src = img.attr('src');
        var naturalWidth = img[0].naturalWidth; 
        var naturalHeight = img[0].naturalHeight; 

        var windowWidth = $(window).width() * 0.9; 
        var windowHeight = $(window).height() * 0.9; 

        var scale = Math.min(windowWidth / naturalWidth, windowHeight / naturalHeight);
        var finalWidth = naturalWidth * scale;
        var finalHeight = naturalHeight * scale; 

        $("body").append("<div class='popup'> "+
            "<div class='popup_bg'></div>"+
            "<img src='" + src + "' class='popup_img' style='width:" + finalWidth + "px; height:" + finalHeight + "px;'/>"+
            "</div>");
        $(".popup").fadeIn(500).css('display', 'flex');
        $(".popup_bg").click(function() {
            $(".popup").fadeOut(500);
            setTimeout(function() { 
                $(".popup").remove(); 
            }, 800);
        });
    });
});
