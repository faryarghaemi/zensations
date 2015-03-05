$(document).ready(function() {
  $('a').on('click',function() {
    if($('#slide-menu').css('left')==='0px'){
      console.log('if'); 
        $('#slide-menu').animate({left: '-500px'}, 500);
        $('.show').text('<<<').show(200); 

    }else{
      console.log('else'); 
        $('#slide-menu').animate({left:0}, 500); 
        $('.show').text('>>>').show(200); 
    }
  });
});
