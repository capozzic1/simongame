var game = {
  level: 1,
  turn: 0,
  difficulty: 1,
  score: 0,
  active: false,
  handler: false,
  shape: '.shape',
  genSequence: [],
  plaSequence: [],

  flash: function(element, times, speed, pad) {
    var that = this;

    if (times > 0) {
      that.playSound(pad);
      element.stop().animate({
        opacity: '1'
      }, {
        duration: 75,
        complete: function() {
          element.stop().animate({
            opacity: '0.6'
          }, 200);
        }
      });
    }

    if (times > 0) {
      setTimeout(function() {
        that.flash(element, times, speed, pad);
      }, speed);
      times -= 1;
    }

  },

  playSound: function(clip) {

    var sound = $('.sound' + clip)[0];
    console.log(sound + "sound");
    sound.currentTime = 0;
    sound.play();
  },

  randomizePad: function(passes) {
    for (i = 0; i < passes; i++) {
      this.genSequence.push(Math.floor(Math.random() * 4) + 1);
    }

  },

  displaySequence: function() {
    var that = this;

    $.each(this.genSequence, function(index, val) {

      setTimeout(function() {

        that.flash($(that.shape + val), 1, 500, val);
      }, 500 * index * that.difficulty);
    });
  },

  displayLevel: function() {

     
        $('.level p').text(this.level);
      
    //skip display score
  },

  logPlayerSequence: function(pad) {

    this.plaSequence.push(pad);
    this.checkSequence(pad);

  },

  checkSequence: function(pad) {

    that = this;

    if (pad !== this.genSequence[this.turn]) {

      this.incorrectSequence();
    } else {

     
      this.turn++;
    }

    if (this.turn === this.genSequence.length) {
      this.level++;
      this.displayLevel();
      this.active = false;
      
    
      setTimeout(function() {
        that.newLevel();
        
      }, 2000);
    }
  },

  incorrectSequence: function() {

    var corPad = this.genSequence[this.turn],

      that = this;
    //this.active = false;
    //this.displayLevel();
    //this.displayScore();
    
  setTimeout(function() {
     $('.level p').text("!!");
   that.flash($(that.shape + corPad), 4, 300, corPad);
   }, 300);
      
   $('.start').show();
    //start here 1/4
  },

  initPadHandler: function() {

    that = this;

    $('.pad').on('mouseup', function() {

      if (that.active === true) {

        var pad = parseInt($(this).data('pad'), 10);
        console.log(pad);
        that.flash($(this), 1, 300, pad);

        that.logPlayerSequence(pad);
      }
    });
    this.handlers = true;
  },

  init: function() {
    if (this.handler === false) {
      this.initPadHandler();
      this.handler = true;
    }
    this.newGame();
  },

  newGame: function() {
    this.level = 1;
    this.score = 0;
    this.newLevel();
    this.displayLevel();
  },

  newLevel: function() {

    this.genSequence.length = 0;
    this.plaSequence.length = 0;
    this.pos = 0;
    this.turn = 0;
    this.active = true;

    this.randomizePad(this.level);
    this.displaySequence();

  }

};

$(document).ready(function() {

  $('.start').on('mouseup', function() {
    $(this).hide();
    game.init();
  });

});