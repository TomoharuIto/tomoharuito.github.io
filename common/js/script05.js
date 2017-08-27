// === Back Button animation === バックボタンのアニメーション ===

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

//=== Copy guard === コピーガード ===

$(function(){

  var $body = $('body');

  $body
  .keydown(function(event){ // ◀ ctrl + C || ctrl + A key を無効化
    if((event.ctrlKey === true && event.which === 67) ||
    (event.ctrlKey === true && event.which === 65)){
      return false;
    }
  })
  .bind('copy', function(){ // ◀ コピーを無効化
    return false;
  });

});

//=== Update Copyright === コピーライトの更新 ===

window.onload = function(){

  var now = new Date();
  var year = now.getFullYear();

  document.getElementById('year').textContent = year;

};
