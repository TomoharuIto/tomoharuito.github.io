// ======================================================
// JS for the Contact page
// ======================================================

// ==================================
// Mail form
// ==================================

$(function(){

  var paper = Raphael('Mail', '100%', '100%');
  paper.setViewBox(-15, -120, 300, 400, true);

  var $square = paper.path('M0,0 L270,0 L270,210 L0,210 Z');
  $square.attr({
            fill:'#737373',
            stroke:'#fff',
            'stroke-width':'2px',
            'stroke-linejoin':'round'
          });

  var $parchment = paper.add([
                    {
                    type:'rect',
                    x:10, y:10, width:250, height:180,
                    fill:'#fff',
                    stroke:'#9DBED5',
                    'stroke-width':'2px',
                    'stroke-linejoin': 'round',
                    'stroke-opacity':0.5
                    },
                    {
                    type:'rect',
                    x:10, y:10, width:250, height:180,
                    fill:'#fff',
                    stroke:'#9DBED5',
                    'stroke-width':'2px',
                    'stroke-linejoin': 'round',
                    'stroke-opacity':0.5
                    },
                    {
                    type:'text',
                    x:135, y:80,
                    text:'CONTACT\nFORM',
                    'font-family':'"Helvetica Neue", Arial, sans-serif',
                    'font-weight':400,
                    'font-size':'3rem',
                    fill:'#CCCCCC'
                    }
                  ]);
                  paper.add([
                    {
                    type:'path',
                    path:'M0,210 L270,0 L270,210 Z',
                    fill:'#9DBED5',
                    stroke:'#fff',
                    'stroke-width':'2px',
                    'stroke-linejoin':'round'
                    },
                    {
                    type:'path',
                    path:'M270,210 L0,0 L0,210 Z',
                    fill:'#9DBED5',
                    stroke:'#fff',
                    'stroke-width':'2px',
                    'stroke-linejoin':'round'
                    },
                    {
                    type:'text',
                    x:70, y: 195,
                    text:'TREE OF LIFE',
                    'font-family': '"Helvetica Neue", Arial, sans-serif',
                    'font-weight':400,
                    'font-size':'1rem',
                    fill:'#fff'
                    }
                  ]);

  var $flap = paper.path('M0,0 L270,0 L135,120 Z');
  $flap.attr({
          fill:'#9DBED5',
          stroke:'#fff',
          'stroke-width':'2px',
          'stroke-linejoin':'round'
        });

  function GjRaphael(){
    var $Mail = $('#Mail');
    var $rect = $Mail.find('rect');
    var $flap1 = 'M0,0 L270,0 L135,-120 Z';
    var $flap2 = 'M0,0 L270,0 L135,120 Z';
    var $opened = Raphael.animation({path:$flap1}, 500, 'linear', function(){$flap.toBack();});
    var $out = Raphael.animation({transform:'t0,-85'}, 1000, 'elastic', function(){
      $parchment.attr({'href':'http://goo.gl/forms/8fGhthU8AF', 'target':'blank'});
      $rect.eq(0).animate({'stroke-width':'18px'},400, 'linear')
      .animate({'stroke-width':'0px'},400, 'linear')
      .repeat(3);
    }).delay(1000);

    var $putIn = Raphael.animation({transform:'t0,0'}, 1000, 'backIn', function(){$flap.toFront();});
    var $closed = Raphael.animation({path:$flap2}, 500, 'linear').delay(1000);

    if(Raphael.isPointInsideBBox($flap.getBBox(false), 135,120)){
      $flap.stop(false).animate($opened);
      $parchment.stop(false).animate($out);
    } else {
      $Mail.find('a').removeAttr('href show');
      $parchment.stop(false).animate($putIn);
      $flap.stop(false).animate($closed);
      //$rect.eq(0).removeAttr('class'); ◀？
    }
  }

  var $path = $('#Mail').find('path');
  $path
  .on('click', function(event){
    event.preventDefault();
    GjRaphael($(this));
  });

});
// ©2017 Tomoharu Ito FYI: https://github.com/TomoharuIto/tomoharuito.github.io
