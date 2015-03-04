var mousePosition = {x: 0, y: 0};

mouseMovement = function () {

document.addEventListener('mousemove', function(e){ 
    mousePosition.x = e.clientX || e.pageX; 
    mousePosition.y = e.clientY || e.pageY 
}, false);

}; 