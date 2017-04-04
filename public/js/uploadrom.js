$(document).ready(function() {

    $('#uploadromForm').ajaxForm({
        beforeSubmit: function(formData, jqForm, options) {
            return true;
        },
        success: function(responseText, status, xhr, $form) {
            if (status === 'success') window.location.href = '/admin/uploadrom';
        },
        error: function(e) {
            console.log(e);
            Materialize.toast(e.responseText, 5000);
        }
    });

});
