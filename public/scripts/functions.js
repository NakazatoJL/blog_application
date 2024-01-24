$(".navToggle").click(function(){
    console.log('toggle');
    $(".navItem.h").toggleClass("hidden");
    $(".fixed").toggleClass("transparent");
});

const filter = $(".filter");
for (let i = 0; i < filter.length; i++) {
    filter[i].addEventListener('click', function(){
        console.log('filter clicked');
        $(".pop").toggleClass("hidden");
    });
}

if($(window).width() <= 600)
{
    $(".navItem.h").addClass("hidden");
    $(".navToggle").removeClass("hidden");
    $(".fixed").addClass("transparent");
}

$(window).on("resize", function(){
    checkWindowSize();
});

function checkWindowSize(){
    if($(window).width() <= 600){
        $(".navItem.h").addClass("hidden");
        $(".navToggle").removeClass("hidden");
        $(".fixed").addClass("transparent");
    }
    else{
        $(".navItem.h").removeClass("hidden");
        $(".navToggle").addClass("hidden");
        $(".fixed").removeClass("transparent");
    }
}