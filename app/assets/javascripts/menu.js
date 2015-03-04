// $(document).ready(function() {
//   $('a').on('click',function() {
//     if($('#slide-menu').css('bottom')=='0px'){
//         $('#slide-menu').animate({bottom: '-300px'}, 500);      
//     }else{
//         $('#slide-menu').animate({bottom:0}, 500);        
//     }
//   });
// });


// $(function() {
//   $('#footer_body').on('show', function () {
//     $("html, body").animate({ scrollTop: $(document).height() }, "slow");
//   });
// });

// // Handle the form submit event to load the new URL
// .addEventListener('submit', function(e) {
//   <script>$('.modal-login').modal()</script>

$(document).ready(function() {

  $("a.log_in").on("click", function(){
    $('.modal-login').modal()
  });

});