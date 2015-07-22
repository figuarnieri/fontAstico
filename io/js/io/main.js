/*I/O BRASIL*/
$('.settings').click(function(e){
    $('.settings .thumbs').slideToggle(600);
});
$(window).keyup(function(e) {
    var page = location.search.replace('?page=',''),
    ext = $('.img').data('extension'),
    size = $('.settings .thumb-img').size();
    if(e.keyCode===39){
        location.href='?page='+(parseInt(page)+1);
    } else if(e.keyCode===37){
        if(page!=='0'){
            location.href='?page='+(parseInt(page)-1);
        } else {
            location.href='?page='+(size-1);
        }
    };
});