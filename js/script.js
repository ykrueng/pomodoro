(function() {
  console.log('Pomodoro Clock is Running ...');

  const timer = {
    defaultSetting: [25, 5, 15, 'session'], // 25mins session, 5mins short break, 15 mins long break, current session
    pomodoro: 0, // track session repeat, long break in every forth break, short break for the rest.
    length: {
      session: 25,
      shortBreak: 5,
      longBreak: 15
    },
    isRunning: false,
    currentTimer: 25 * 60 * 1000,
    currentSession: 'session', // session, shortBreak, longBreak
    interval: null
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
      timer.length[e] === 1 || timer.length[e]--;
      if (e === 'session') timer.currentTimer = timer.length.session * 60 * 1000;
      settingView.render();
      timerView.render();
    },

    incLength(e) {
      timer.length[e]++;
      if (e === 'session') timer.currentTimer = timer.length.session * 60 * 1000;
      settingView.render();
      timerView.render();
    },

    getHeaderText: function() {
      if (timer.currentSession === 'session') return 'Session Time Left';
      if (timer.currentSession === 'shortBreak') return 'Short Break Time Left';
      if (timer.currentSession === 'longBreak') return 'Long Break Time Left';

      timerView.render();
    },

    getTimerText: function() {
      let minute = Math.floor(timer.currentTimer/ (60 * 1000));
      let second = Math.floor((timer.currentTimer % (60 * 1000))/1000);
      if (second.toString().length < 2) second = '0' + second;
      if (minute.toString().length < 2) minute = '0' + minute;
      return `${minute}:${second}`;
    },

    resetToDefault: function() {
      timer.length = {
        session: timer.defaultSetting[0],
        shortBreak: timer.defaultSetting[1],
        longBreak: timer.defaultSetting[2]
      }

      timer.currentSession = timer.defaultSetting[3];
      timer.currentTimer = timer.defaultSetting[0] * 60 * 1000;
      timerView.render();
      settingView.render();
    },

    runTimer: function() {
      if (!timer.isRunning) {
        timer.isRunning = true;
        timer.interval = setInterval(function() {
          if (timer.currentTimer === 0) {
            if (timer.currentSession === 'session') {
              timer.pomodoro++;
              if (timer.pomodoro === 4) {
                timer.currentSession = 'longBreak';
                timer.pomodoro = 0;
              } else {
                timer.currentSession = 'shortBreak';
              }
            } else {
              timer.currentSession = 'session';
            }
            timer.currentTimer = timer.length[timer.currentSession]* 60 * 1000;
          }

          timer.currentTimer -= 1000;

          timerView.render();
        },1000)
      } else {
        timer.isRunning = false;
        clearInterval(timer.interval);
      }

      buttonView.render();
      settingView.render();
    },

    getState: function() {
      return timer.isRunning;
    },

    getCurrentTimer: function() {
      return timer.currentTimer;
    },

    getCurrentSession: function() {
      return timer.currentSession;
    }
  }

  const timerView = {
    init: function() {
      this.timerDisplay = document.getElementById('timer-text');
      this.headerText = document.getElementById('timer-text-header');
      this.timerText = document.getElementById('timer-text-time');

      this.render();
    },

    render: function() {
      const headerText = controller.getHeaderText();
      const timerText = controller.getTimerText();
      const timer = controller.getCurrentTimer();
      const session = controller.getCurrentSession();

      this.headerText.textContent = headerText;
      this.timerText.textContent = timerText;

      if (timer <= 10000) {
        this.timerText.style.color = 'black';
      } else {
        timerView.timerText.style.color = 'white';
      }

      if (session === 'session') {
        this.timerDisplay.style['background-color'] = '#DD4F0A';
      } else if (session === 'shortBreak') {
        this.timerDisplay.style['background-color'] = '#EB981C';
      } else {
        this.timerDisplay.style['background-color'] = '#F9C381';
      }
    }
  }

  const buttonView = {
    init: function() {
      this.resetButton = document.getElementById('button-reset');
      this.resetButton.addEventListener('click', function() {
        controller.resetToDefault();
      })

      this.startButton = document.getElementById('button-start');
      this.startButton.addEventListener('click', function() {
        controller.runTimer();
      })

      this.render();
    },

    render: function() {
      const isRunning = controller.getState();

      if (isRunning) {
        this.startButton.textContent = 'Pause';
        this.resetButton.style.display = 'none';
      } else {
        this.startButton.textContent = 'Start';
        this.resetButton.style.display = null;
      }
    }
  }

  const settingView = {
    init: function() {
      this.setting = document.getElementById('setting');
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
      const isRunning = controller.getState();
      this.sessionText.textContent = length.session;
      this.shortBreakText.textContent = length.shortBreak;
      this.longBreakText.textContent = length.longBreak;
      this.setting.style.display = isRunning ? 'none' : 'block';
    }
  }

  controller.init();
})()