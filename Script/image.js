$(document).ready(function () {
    $(".image").click(function () {
        const img = $(this);
        const src = img.attr("src");
        let currentRotation = 0;

        $("body").append(`
            <div class='popup'>
                <div class='popup_bg'></div>
                <div class='popup_controls'>
                    <button class='rotate_left'>⟲</button>
                    <button class='rotate_right'>⟳</button>
                </div>
                <img src='${src}' class='popup_img' />
            </div>
        `);

        const popupImg = $(".popup_img");

        function recalculateSize() { 
            const viewportWidth = $(window).width();
            const viewportHeight = $(window).height();         
            const imgElement = new Image();
            imgElement.src = src;
        
            imgElement.onload = function () {
                const naturalWidth = this.width;
                const naturalHeight = this.height;
                const isWide = naturalWidth > naturalHeight;
                let finalWidth, finalHeight;
                const aspectRatio = naturalWidth / naturalHeight;
                const isAlmostSquare = aspectRatio > 0.8 && aspectRatio < 1.2;
                if (isWide && !isAlmostSquare) {
                    finalWidth = viewportWidth * 0.8;
                    finalHeight = 'auto';
                } else if (!isWide && !isAlmostSquare) {
                   finalHeight = viewportHeight * 0.8;
                    finalWidth = 'auto';
                } else {
                    finalWidth = viewportWidth * 0.9;
                    finalHeight = viewportHeight * 0.9;
                }
        
                if (Math.abs(currentRotation % 180) === 90) {
                    if (isWide && !isAlmostSquare) {
                        if(aspectRatio > 2.6)
                        {finalHeight = viewportHeight * 0.24;}
                        else if((aspectRatio > 1.7))
                        {finalHeight = viewportHeight * 0.38;}
                        else
                        {finalHeight = viewportHeight * 0.45;}
                        finalWidth = 'auto';
                    } else if (!isWide && !isAlmostSquare) {
                        finalHeight = viewportWidth * 0.65;
                        finalWidth = 'auto'; 
                    } else {
                        finalWidth = viewportWidth * 0.9;
                        finalHeight = viewportHeight * 0.9;
                    }
                }
                popupImg.css({
                    width: `${finalWidth}`,
                    height: `${finalHeight}`,
                    transform: `rotate(${currentRotation}deg)`,
                });
            };
        }
        $(".popup").fadeIn(500).css("display", "flex");
        recalculateSize();
        $(".rotate_left").click(function (e) {
            e.stopPropagation();
            currentRotation = (currentRotation - 90) % 360;
            recalculateSize();
        });
        $(".rotate_right").click(function (e) {
            e.stopPropagation();
            currentRotation = (currentRotation + 90) % 360;
            recalculateSize();
        });
        $(".popup_bg").click(function () {
            $(".popup").fadeOut(500);
            setTimeout(function () {
                $(".popup").remove();
            }, 800);
        });
        $(window).on("resize", recalculateSize);
    });
});
