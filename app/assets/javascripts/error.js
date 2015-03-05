$(document).ready(function () {

  $(".modal-signup form").on("submit", function (event) {
    console.log("THIS WORKED")
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
      // debugger;
    $.ajax("/users",{
      dataType: "json",
      type: "POST",
      data: data
    }).done(function (result) {
      // console.log(result);
      // debugger;
      if ( result.status ) {
         $('.modal-signup').modal('hide');  
      } else {
        // debugger;
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

});