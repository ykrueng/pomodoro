(function() {
  console.log('Pomodoro Clock is Running ...');

  const timer = {
    length: {
      session: 25,
      shortBreak: 5,
      longBreak: 15
    },
    isRunning: false,
    currentTimer: 25,
    currentSession: 1 // 1 - session, 2 - short break, 3 - long break
  }

  const controller = {
    init: function() {
      settingView.render();
    },

    getLength: function() {
      return timer.length;
    },

    decLength(e) {
      timer.length[e] === 0 || timer.length[e]--;
      settingView.render();
    },

    incLength(e) {
      timer.length[e]++;
      settingView.render();
    }
  }

  const settingView = {
    init: function() {
      this.sessionText = document.getElementById('setting-text-0');
      this.shortBreakText = document.getElementById('setting-text-1');
      this.longBreakText = document.getElementById('setting-text-2');

      settings = ['session', 'shortBreak', 'longBreak'];

      for (let i=0; i<=2; i++) {
        let minusButton = document.getElementById('button-minus-' + i);
        let plusButton = document.getElementById('button-plus-' + i);

        minusButton.addEventListener('click', function() {
          controller.decLength(settings[i]);
        })

        plusButton.addEventListener('click', function() {
          controller.incLength(settings[i]);
        })
      }

      this.render();
    },

    render: function() {
      const length = controller.getLength();
      this.sessionText.textContent = length.session;
      this.shortBreakText.textContent = length.shortBreak;
      this.longBreakText.textContent = length.longBreak;
    }
  }

  settingView.init();
})()