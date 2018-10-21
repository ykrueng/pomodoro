(function() {
  console.log('Pomodoro Clock is Running ...');

  const timer = {
    defaultSetting: [25, 5, 15, 1], // 25mins session, 5mins short break, 15 mins long break, current session 1 (see currentSession below)
    length: {
      session: 20,
      shortBreak: 5,
      longBreak: 5
    },
    isRunning: false,
    currentTimer: 2512,
    currentSession: 2 // 1 - session, 2 - short break, 3 - long break
  }

  const controller = {
    init: function() {
      settingView.init();
      buttonView.init();
      timerView.init();
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
    },

    getHeaderText: function() {
      if (timer.currentSession === 1) return 'Session Time Left';
      if (timer.currentSession === 2) return 'Short Break Time Left';
      if (timer.currentSession === 3) return 'Long Break Time Left';

      timerView.render();
    },

    getTimerText: function() {
      const time = timer.currentTimer;
      const hour = Math.floor(time/100);
      let second = (time%100).toString();
      if (second.length < 2) second = '0' + second;
      return `${hour}:${second}`;
    },

    resetToDefault: function() {
      timer.length = {
        session: timer.defaultSetting[0],
        shortBreak: timer.defaultSetting[1],
        longBreak: timer.defaultSetting[2]
      }

      timer.currentSession = timer.defaultSetting[3];
      timer.currentTimer = timer.length.session * 100;
      timerView.render();
      settingView.render();
    }
  }

  const timerView = {
    init: function() {
      this.headerText = document.getElementById('timer-text-header');
      this.timerText = document.getElementById('timer-text-time');

      this.render();
    },

    render: function() {
      const headerText = controller.getHeaderText();
      const timerText = controller.getTimerText();

      this.headerText.textContent = headerText;
      this.timerText.textContent = timerText;
    }
  }

  const buttonView = {
    init: function() {
      this.resetButton = document.getElementById('button-reset');
      this.resetButton.addEventListener('click', function() {
        controller.resetToDefault();
      })
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

  controller.init();
})()