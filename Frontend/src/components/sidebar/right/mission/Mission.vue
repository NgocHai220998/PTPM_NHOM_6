<template>
  <section class="mission">
    <a-menu class="content background" mode="inline" :openKeys="openKeys" @openChange="onOpenChange" style="width: 256px">
      <a-sub-menu key="day">
        <span slot="title"><a-icon class="icon" type="highlight" /><span class="title">Nhiệm vụ hằng ngày</span></span>
        <a-menu-item class="item" key="1">Option 1</a-menu-item>
        <a-menu-item class="item" key="2">Option 1</a-menu-item>
        <a-menu-item class="item" key="3">Option 1</a-menu-item>
        <a-menu-item class="item" key="4">Option 1</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="growth">
        <span slot="title"><a-icon class="icon" type="line-chart" /><span class="title">Nâng cao</span></span>
        <a-menu-item class="item" key="5">Option 5</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="month">
        <span slot="title"><a-icon class="icon" type="box-plot" /><span class="title">Nhiệm vụ tháng</span></span>
        <a-menu-item class="item" key="9">Option 9</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </section>
</template>

<script>
export default {
  name: 'MissionComponent',
  data () {
    return {
      rootSubmenuKeys: ['day', 'growth', 'month'],
      openKeys: ['day']
    }
  },
  methods: {
    onOpenChange (openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1)
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mission {
  .content {
    .title {
      font-weight: 600;
      font-size: 16px;
      color: white;
    }
    .icon {
      color: white;
    }
    .item {
      // background-color: rgba(0, 0, 0, 0.1);
    }
  }
}
</style>
