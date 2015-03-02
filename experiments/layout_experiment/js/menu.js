$(document).ready(function() {
  $('a').on('click',function() {
    if($('#slide-menu').css('left')=='0px'){
        $('#slide-menu').animate({left: '-300px'}, 500);        
    }else{
        $('#slide-menu').animate({left:0}, 500); 
    }
  });
});
