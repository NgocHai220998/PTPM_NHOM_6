<template>
  <div class="language">
    <a-dropdown>
      <span style="color: rgba(255, 255, 255, 0.9); cursor: pointer; font-weight: bold">
        <img style="padding-bottom: 3px;" :src="`/static/images/flag/${lang}.png`" alt="Language">
        {{ language }} <a-icon type="down" />
      </span>
      <a-menu slot="overlay">
        <a-menu-item
          v-for="item in langCode"
          :key="item.code">
          <a :class="{active: lang === item.code}" @click="setLang(item.code)">
            <img :src="item.flag" alt=''/>&nbsp;
            {{item.name}}
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
import langCode from '@/constants/lang/code'
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      langCode: langCode
    }
  },
  computed: {
    ...mapGetters(['lang']),
    language () {
      const items = this.langCode.filter(e => e.code === this.lang)
      if (items.length > 0) {
        return items[0].name
      }
      return 'English'
    }
  },
  methods: {
    ...mapActions(['setLang'])
  }
}
</script>

<style lang="less" scoped>
</style>
