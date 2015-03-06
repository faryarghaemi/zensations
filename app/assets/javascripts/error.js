$(document).ready(function () {

  $(".modal-signup form").on("submit", function (event) {

    event.preventDefault();

    var data = {
        _method: "POST",
        user: {
          "name": $("#signup-name").val(),
          "email": $("#signup-email").val(),
          "password": $("#signup-password").val(),
          "password_confirmation": $("#signup-password-confirmation").val()
        }
      }

    $.ajax("/users",{
      dataType: "json",
      type: "POST",
      data: data
    }).done(function (result) {
      if ( result.status ) {
         // SUCCESSFUL SIGN UP
         $('.modal-signup').modal('hide');  
      } else {
        // UNSUCCESSFUL SIGN UP
        if ( result.name ) {
            $("#signup-name-label").css("color", "red"); 
            var text = $("#signup-name-label").text(); 
            $("#signup-name-label").text(result.name[0]); 
        } else if ( result.email ) {
            $("#signup-email-label").css("color", "red"); 
            var text = $("#signup-email-label").text(); 
            $("#signup-email-label").text(result.email[0]); 
        } else if ( result.password ) {
            $("#signup-password-label").css("color", "red"); 
            var text = $("#signup-password-label").text(); 
            $("#signup-password-label").text(result.password[0]); 
        } else if ( result.password_confirmation ) {
            $("#signup-password-confirmation-label").css("color", "red"); 
            var text = $("#signup-password-confirmation-label").text(); 
            $("#signup-password-confirmation-label").text(result.password_confirmation[0]); 
        }  
      }
    });
  });

  $(".modal-login form").on("submit", function (event) {
    event.preventDefault();

    var data = {
        _method: "POST",
        user: {
          "email": $("#login-email").val(),
          "password": $("#login-password").val()
        }
      }
    $.ajax("/login",{
      dataType: "json",
      type: "POST",
      data: data
    }).done(function (result) {
      if ( result.status !== "INVALID" ) {
        // SUCCESSFUL LOGIN
        $('.modal-login').modal('hide');  
      } else {
        // UNSUCCESSFUL LOGIN
        $("#login-error-box").css("color", "red");
        var error = "Not a valid email or password"
        $("#login-error-box").append(error);  
      }
    });
  });

});