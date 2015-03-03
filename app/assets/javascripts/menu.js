// $(document).ready(function() {
//   $('a').on('click',function() {
//     if($('#slide-menu').css('bottom')=='0px'){
//         $('#slide-menu').animate({bottom: '-300px'}, 500);      
//     }else{
//         $('#slide-menu').animate({bottom:0}, 500);        
//     }
//   });
// });


$(function() {
  $('#footer_body').on('show', function () {
    $("html, body").animate({ scrollTop: $(document).height() }, "slow");
  });
});