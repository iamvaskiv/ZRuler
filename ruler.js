'use strict';

(function() {
  clear();

  var mask = document.createElement('div');
  var mouse = {
    x: 0,
    y: 0
  };
  var mouseIsDown = false;
  var keycodes = {
    esc: 27
  };

  var rulerLeft = 0,
      rulerTop = 0;

  function on(el, events, fn) {
    events.split(' ').forEach(function (event) {
      el.addEventListener(event, fn);
    });
  }


  mask.classList.add('zruler-mask');
  mask.style.height = document.body.scrollHeight + 'px';

  document.body.appendChild(mask);

  var ruler = document.createElement('div');
  ruler.classList.add('zruler-ruler');

  mask.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;

    if (mouseIsDown) {
      ruler.setAttribute('data-width', ruler.offsetWidth);
      ruler.setAttribute('data-height', ruler.offsetHeight);

      // console.log('----------------------------------');
      // console.log('rulerLeft: ', rulerLeft);
      // console.log('style left: ', parseInt(ruler.style.left));
      // console.log('style right: ', parseInt(ruler.style.right));
      // console.log(parseInt(ruler.style.left), ' + ', parseInt(ruler.style.right),' = ', parseInt(ruler.style.left) + parseInt(ruler.style.right));
      // console.log('mouse x: ', mouse.x);
      // console.log('mouse y: ', mouse.y);
      // console.log('mask width: ', mask.offsetWidth);
      // console.log('----------------------------------');

      if (rulerLeft + (mask.offsetWidth - mouse.x) >= mask.offsetWidth) {
        ruler.style.left = mouse.x + 'px';
      } else {
        ruler.style.right = mask.offsetWidth - mouse.x + 'px';
      }

      if (rulerTop + (mask.offsetHeight - mouse.y) >= mask.offsetHeight) {
        ruler.style.top = mouse.y + 'px';
      } else {
        ruler.style.bottom = mask.offsetHeight - mouse.y + 'px';
      }
    }
  });

  mask.addEventListener('mousedown', function () {
    mouseIsDown = true;
    if (!document.querySelector('.zruler-ruler')) {
      mask.appendChild(ruler);
    };


    ruler.style.left = mouse.x + 'px';
    rulerLeft = mouse.x;
    ruler.style.top = mouse.y + 'px';
    rulerTop = mouse.y;
  });

  mask.addEventListener('mouseup', function () {
    mouseIsDown = false;
  });

  window.addEventListener('keyup', function (e) {
    if (e.which === keycodes.esc) {
      clear();
    }
  });

  function clear() {
    var mask  = document.querySelector('.zruler-mask'),
        ruler = document.querySelector('.zruler-ruler');

    mouse = null;

    mask && mask.parentNode.removeChild(mask);
    ruler && ruler.parentNode.removeChild(ruler);
  }

  //isolation
  on(mask, 'click mouseup mousedown mousemove', function (e) {
    e.stopPropagation();
  });
}());
