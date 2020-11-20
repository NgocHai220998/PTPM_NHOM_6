<template>
  <section class="feature">
    <div class="feature-1">
      <router-link :to="{ name: '' }" class="link">
        Nguyên Linh Thạch
      </router-link>
    </div>
    <div class="feature-2">
      <router-link :to="{ name: '' }" class="link">
        Thương nhân thần bí(Mới)
      </router-link>
    </div>
    <TechnicalPoint :socket="socket" :user="user" class="feature-3" />
    <div class="feature-4">
      <router-link :to="{ name: '' }" class="link">
        Đến phong ấn ma vương
      </router-link>
    </div>
    <div class="feature-5">
      <router-link :to="{ name: '' }" class="link">
        Dược viên(0/3)
      </router-link>
    </div>
  </section>
</template>

<script>

import TechnicalPoint from './TechnicalPoint'

export default {
  name: 'FeatureComponent',
  data () {
    return {
      user: null
    }
  },
  components: {
    TechnicalPoint
  },
  props: ['socket'],
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
  .feature {
    padding: 30px 30px 30px 20px;
    &-1, &-2, &-3, &-4, &-5 {
      padding-bottom: 3px;
      .link {
        font-size: 16px;
        font-weight: 600;
        text-decoration: underline;
      }
    }
    &-technical-point {
      .input-number {
        span {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
