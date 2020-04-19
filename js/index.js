$('img').on('dragstart', function(event) { event.preventDefault(); });
$(function () {
  var sliding = startClientX = startPixelOffset = pixelOffset = currentSlide = slideNr =0,
      slideCount = $('.slide').length;
  
  $('html').on('mousedown touchstart', slideStart);
  $('html').on('mouseup touchend', slideEnd);
  $('html').on('mousemove touchmove', slide);

  $('.slide').each(function (i) {
    $('#bullets').append('<span class="bullet"></span>')
  });

  updateBullets();

  function slideStart(event) {
    if (event.originalEvent.touches)
      event = event.originalEvent.touches[0];
    if (sliding == 0) {
      sliding = 1;
      startClientX = event.clientX;
    }
  }

  function slide(event) {
    event.preventDefault();
    if (event.originalEvent.touches)
      event = event.originalEvent.touches[0];
    var deltaSlide = event.clientX - startClientX;

    if (sliding == 1 && deltaSlide != 0) {
      sliding = 2;
      startPixelOffset = pixelOffset;
    }
    
    if (sliding == 2) {
      var touchPixelRatio = 1;
      if ((currentSlide == 0 && event.clientX > startClientX) || (currentSlide == slideCount - 1 && event.clientX < startClientX))
        touchPixelRatio = 3;
      pixelOffset = startPixelOffset + deltaSlide / touchPixelRatio;
      console.log(pixelOffset)
      $('#slides').css('-webkit-transform', 'translate3d(' + pixelOffset + 'px,0,0)').removeClass();
    }
  }
  
  function slideEnd(event) {
    if (sliding == 2) {
      var oldPixelOffset = pixelOffset;
      sliding = 0;
      currentSlide = pixelOffset < startPixelOffset ? currentSlide + 1 : currentSlide - 1;
      currentSlide = Math.min(Math.max(currentSlide, 0), slideCount - 1);
      pixelOffset = currentSlide * -$('#view').width();
      if(pixelOffset < oldPixelOffset) {
        slideNr++;} else if (pixelOffset > oldPixelOffset){
        slideNr--;}

      $('#temp').remove();
      $('<style id="temp">#slides.animate{-webkit-transform:translate3d(' + pixelOffset + 'px,0,0)}</style>').appendTo('head');
      $('#slides').addClass('animate').css('-webkit-transform', '');
      updateBullets();
    }
  }

  // remove the selected class from each bullet and set it to the current one
  function updateBullets() {
    $('.bullet').removeClass('selected');
    $('.bullet:nth-child(' + (currentSlide + 1) + ')').addClass('selected');
  }
});

