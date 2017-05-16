# console-countdown

[![Greenkeeper badge](https://badges.greenkeeper.io/machaj/console-countdown.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/machaj/console-countdown.svg?branch=master)](https://travis-ci.org/machaj/console-countdown)
[![Coverage Status](https://coveralls.io/repos/github/machaj/console-countdown/badge.svg?branch=master)](https://coveralls.io/github/machaj/console-countdown?branch=master)

![console-countdown demo](https://raw.githubusercontent.com/machaj/console-countdown/master/demo.gif "console-countdown demo")


## Install

    npm install console-countdown -g


## Usage

This application has been developed for the needs of [Pomodoro technique](http://pomodorotechnique.com/). Therefore, the default option is 25 minutes countdown.

```bash
countdown
```

You can change default number of cycles by option `-c`. To change time interval length you can use `-i`.

```bash
# Counting down five seconds:
countdown -c 5 -i 1000
```


### Track your time

You can use option `-o` to define output file if you want to store data from your Pomodoro time tracking. Time records are appended to this file.

```bash
countdown -o pomodoro.csv "My first task"
```

Time record format is:

    task;status;start time;end time
    
Where :

* **task** is parameter without a switch option which was passed to `countdown`.
* **status** is sign if the `countdown` was terminated by pressing `Ctrl+C`.


### Playing a sound at timeout

This function is not implemented but it can be achieved it different way. For example by defining an alias.

```bash
alias coutndown=`countdown "${@}" && mplayer --really-quiet ~/beep.mp3`
```


### List of all options

    -h, --help                output usage information
    -V, --version             output the version number
    -c, --cycle-count <n>     number of countdown intervals (default 25)
    -d, --digits <n>          number of places for digits (default 4)
    -e, --hide-end-text       disable timeout text when time expires
    -i, --interval <n>        set a length of time interval in millis (default 60 sec)
    -o, --output-file [name]  file to append output
    -s, --start-time          shows timer start time


## Fonts

http://patorjk.com/software/taag/#p=display&h=1&v=3&f=Small&t=Pomodoro
