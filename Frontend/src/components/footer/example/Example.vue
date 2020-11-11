<template>
  <footer class="footer-example">
    <Left class="footer-example-left" />
    <Center class="footer-example-center" />
    <Right class="footer-example-right" />
  </footer>
</template>

<script>

import Left from './Left'
import Right from './Right'
import Center from './Center'

export default {
  name: 'ExampleComponent',
  data () {
    return {
    }
  },
  components: {
    Left,
    Right,
    Center
  }
}
</script>

<style lang="scss" scoped>
    .footer-example {
        display: flex;
        justify-content: space-between;
        &-left {
            width: 150px;
        }
        &-center {
            width: 100%;
        }
        &-right {
            width: 150px;
        }
    }
</style>
