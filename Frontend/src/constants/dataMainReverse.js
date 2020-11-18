export default [
  {
    number: 1,
    name: 'shoot',
    idle: {
      y: 0,
      x: -1230
    },
    normal: {
      y: -78,
      x: -1230
    },
    skill: {
      y: -156,
      x: -1230
    },
    dead: {
      y: -234,
      x: -1230
    },
    currentStatus: {
      y: 0,
      x: -1230
    },
    toDead: null,
    setTimeClear: null,
    run: function () {
      this.toDead = setInterval(() => {
        if (this.number === 11) {
          this.number = 1
          this.currentStatus.x = -1230
        }
        document.querySelector('.right .' + this.name).style.backgroundPosition = this.currentStatus.x + 'px ' + this.currentStatus.y + 'px'
        this.currentStatus.x += 92
        this.number++
      }, 100)
    },
    stop: function () {
      setTimeout(() => {
        this.currentStatus.x = this.idle.x
        this.currentStatus.y = this.idle.y
      }, 1000)
    }
  }, {
    number: 1,
    name: 'attack',
    idle: {
      y: -390,
      x: -1230
    },
    normal: {
      y: -312,
      x: -1230
    },
    skill: {
      y: -312,
      x: -1230
    },
    dead: {
      y: -468,
      x: -1230
    },
    currentStatus: {
      y: -390,
      x: -1230
    },
    toDead: null,
    setTimeClear: null,
    run: function () {
      this.toDead = setInterval(() => {
        if (this.number === 11) {
          this.number = 1
          this.currentStatus.x = -1230
        }
        document.querySelector('.right .' + this.name).style.backgroundPosition = this.currentStatus.x + 'px ' + this.currentStatus.y + 'px'
        this.currentStatus.x += 92
        this.number++
      }, 100)
    },
    stop: function () {
      setTimeout(() => {
        this.currentStatus.x = this.idle.x
        this.currentStatus.y = this.idle.y
      }, 1000)
    }
  }, {
    number: 1,
    name: 'ninja',
    idle: {
      y: -546,
      x: -1230
    },
    normal: {
      y: -624,
      x: -1230
    },
    skill: {
      y: -702,
      x: -1230
    },
    dead: {
      y: -780,
      x: -1230
    },
    currentStatus: {
      y: -546,
      x: -1230
    },
    toDead: null,
    setTimeClear: null,
    run: function () {
      this.toDead = setInterval(() => {
        if (this.number === 11) {
          this.number = 1
          this.currentStatus.x = -1230
        }
        document.querySelector('.right .' + this.name).style.backgroundPosition = this.currentStatus.x + 'px ' + this.currentStatus.y + 'px'
        this.currentStatus.x += 92
        this.number++
      }, 100)
    },
    stop: function () {
      setTimeout(() => {
        this.currentStatus.x = this.idle.x
        this.currentStatus.y = this.idle.y
      }, 1000)
    }
  }, {
    number: 1,
    name: 'zombie',
    idle: {
      y: -858,
      x: -1230
    },
    normal: {
      y: -936,
      x: -1230
    },
    skill: {
      y: -936,
      x: -1230
    },
    dead: {
      y: -1014,
      x: -1230
    },
    currentStatus: {
      y: -858,
      x: -1230
    },
    toDead: null,
    setTimeClear: null,
    run: function () {
      this.toDead = setInterval(() => {
        if (this.number === 11) {
          this.number = 1
          this.currentStatus.x = -1230
        }
        document.querySelector('.right .' + this.name).style.backgroundPosition = this.currentStatus.x + 'px ' + this.currentStatus.y + 'px'
        this.currentStatus.x += 92
        this.number++
      }, 100)
    },
    stop: function () {
      setTimeout(() => {
        this.currentStatus.x = this.idle.x
        this.currentStatus.y = this.idle.y
      }, 1000)
    }
  }, {
    number: 1,
    name: 'robot',
    idle: {
      y: -1092,
      x: -1230
    },
    normal: {
      y: -1170,
      x: -1230
    },
    skill: {
      y: -1170,
      x: -1230
    },
    dead: {
      y: -1248,
      x: -1230
    },
    currentStatus: {
      y: -1092,
      x: -1230
    },
    toDead: null,
    setTimeClear: null,
    run: function () {
      this.toDead = setInterval(() => {
        if (this.number === 11) {
          this.number = 1
          this.currentStatus.x = -1230
        }
        document.querySelector('.right .' + this.name).style.backgroundPosition = this.currentStatus.x + 'px ' + this.currentStatus.y + 'px'
        this.currentStatus.x += 92
        this.number++
      }, 100)
    },
    stop: function () {
      setTimeout(() => {
        this.currentStatus.x = this.idle.x
        this.currentStatus.y = this.idle.y
      }, 1000)
    }
  }
]
