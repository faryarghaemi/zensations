$(document).ready(function() {

  $("a.login-save").on("click", function(){
    $('.modal-signup').modal('hide');
    $('.modal-login').modal('show')
  });

  $("a.login").on("click", function(){
    $('.modal-signup').modal('hide');
    $('.modal-login').modal('show')
  });

  $("a.signup").on("click", function(){
    $('.modal-login').modal('hide');
    $('.modal-signup').modal('show')
  });

});