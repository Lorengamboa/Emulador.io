$(document).ready(function() {
    $('.modal').modal();
    $("#file-input").change(function() {
        $('#uprofile').submit();
    });
    $('.tooltipped').tooltip({
        delay: 50
    });
});
