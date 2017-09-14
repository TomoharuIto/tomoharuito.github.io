// ======================================================
// JS for the 404 page
// ======================================================

// ==================================
// Back button animation
// ==================================

$(function(){
  var value = 0.5;

  $('.Back-Btn')
  .on('mouseenter mouseleave', '.Btn-action', function(event){
    event.preventDefault();
    var opacityValue;
    if(event.type === 'mouseenter') {
      opacityValue = value;
    } else {
      opacityValue = 1;
    }
    $(this)
    .stop()
    .animate(
      {opacity:opacityValue},
      {
      duration:800,
      step:function(now, tween){
        var rotateX = 'rotateX(' + (1 - now) * (360 / value) + 'deg)';
        $(this)
          .css({
            'transform':rotateX
          });
        }
      }
    );
  })
  .each(function(){
    try {
      event = document.createEvent('TouchEvent');
      $(this)
        .off('mouseenter')
        .off('mouseleave');
    } catch(err) {
    }
  });
});

// ==================================
// Prohibited to copy
// ==================================

$(function(){

  var $body = $('body');

  $body
  .keydown(function(event){ // ◀ ctrl + C || ctrl + A key を無効化
    if((event.ctrlKey === true && event.which === 67) ||
    (event.ctrlKey === true && event.which === 65)){
      return false;
    }
  })
  .bind('copy', function(){ // <= disabling copy
    return false;
  });

});

// ==================================
// Copyright year update automatically
// ==================================

window.onload = function(){

  var now = new Date();
  var year = now.getFullYear();

  document.getElementById('year').textContent = year;

};
