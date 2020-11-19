export default {
  left: {
    kind: '',
    kindReverse: '',
    text: '',
    textHpDeducted: '',
    showStatus: function (kind, message) {
      this.text = message
      this.kind = kind
      setTimeout(() => {
        this.text = ''
        this.kind = ''
      }, 1500)
    },
    showHpDeducted: function (message, kindReverse) {
      this.textHpDeducted = message
      this.kindReverse = kindReverse
      setTimeout(() => {
        this.textHpDeducted = ''
        this.kindReverse = ''
      }, 1500)
    }
  },
  right: {
    kind: '',
    text: '',
    kindReverse: '',
    textHpDeducted: '',
    showStatus: function (kind, message) {
      this.text = message
      this.kind = kind
      setTimeout(() => {
        this.text = ''
        this.kind = ''
      }, 1500)
    },
    showHpDeducted: function (message, kindReverse) {
      this.textHpDeducted = message
      this.kindReverse = kindReverse
      setTimeout(() => {
        this.textHpDeducted = ''
        this.kindReverse = ''
      }, 1500)
    }
  }
}
