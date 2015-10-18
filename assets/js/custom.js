function h(e) {
    $(e).css({'height':'auto','overflow-y':'hidden'}).height(e.scrollHeight);
}

$(document).ready(function() {
    $('textarea').each(function () {
        h(this);
    }).on('input', function () {
        h(this);
    });
});