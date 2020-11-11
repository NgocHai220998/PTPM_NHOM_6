<template>
  <section class="sidebar-addEnglish">
    <a-button @click="showDrawer" class="btn-addEnglish background" type="primary"><a-icon type="plus" />
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      <span class="effect"></span>
      Thêm
    </a-button>
    <a-drawer
      title="Thêm Kanji"
      :height="330"
      @close="onClose"
      :visible="visible"
      :placement="placement"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form
        :form="form"
        layout="vertical"
        @submit="handleAdd"
      >
        <a-row :gutter="16">
          <a-col :span="4">
            <a-form-item label="Từ mới:">
              <a-input
                v-decorator="[
                  'voca',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập từ mới' }],
                  },
                ]"
                placeholder="Xin vui lòng nhập từ mới"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="Nghĩa:">
              <a-input
                v-decorator="[
                  'mean',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập giải thích' }],
                  },
                ]"
                placeholder="Xin vui lòng nhập giải thích"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item label="Phiên âm:">
              <a-input
                v-decorator="[
                  'spell'
                ]"
                placeholder="Xin vui lòng nhập phiên âm"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 1:">
              <a-input
                v-decorator="[
                  'example_1'
                ]"
                placeholder="Xin vui lòng nhập Ví dụ 1"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Ví dụ 2:">
              <a-input
                v-decorator="[
                  'example_2'
                ]"
                placeholder="Xin vui lòng nhập Ví dụ 2"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 3:">
              <a-input
                v-decorator="[
                  'example_3'
                ]"
                placeholder="Vui lòng nhập ví dụ 3"
              />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
        <a-button type="danger" :style="{ marginRight: '8px' }" @click="onClose">
          Thôi
        </a-button>
        <a-button class="background" @click="handleAdd" type="primary"><a-icon type="plus" />Thêm</a-button
        >
      </div>
    </a-drawer>
  </section>
</template>

<script>
export default {
  name: 'addEnglish',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      placement: 'top'
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    handleAdd (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.$message.warning('HandleAdd')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
