$(document).ready(function() {
  $('.show').on('click',function() {
    if($('#slide-menu').css('left')==='0px'){
      $('#slide-menu').animate({left: '-500px'}, 500);
      $('.show').text('>>>').show(200); 

    }else{
      $('#slide-menu').animate({left:0}, 500); 
      $('.show').text('<<<').show(200); 
    }
  });
});
