$(document).ready(function() {

    /*
     * Validation of password so it can checks if both inputted
     * passwords do match
     */
    var password = document.getElementById("password"),
        confirm_password = document.getElementById("confirm_password");

    function validatePassword() {
        if (password.value != confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
        } else {
            confirm_password.setCustomValidity('');
        }
    }

    password.onchange = validatePassword;
    confirm_password.onkeyup = validatePassword;

    $('#registerForm').ajaxForm({
        beforeSubmit: function(formData, jqForm, options) {
            return true;
        },
        success: function(responseText, status, xhr, $form) {
            if (status === 'success') window.location.href = '/login';
        },
        error: function(e) {
            console.log(e);
            Materialize.toast(e.responseText, 5000);
        }
    });



});
