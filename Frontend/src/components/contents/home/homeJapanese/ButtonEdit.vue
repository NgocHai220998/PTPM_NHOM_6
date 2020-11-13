<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="home-edit">
    <a-button @click="showDrawer" class="btn-edit background-edit btn" type="primary"><a-icon type="form" />
      Sửa
    </a-button>
    <a-drawer
      title="Sửa một từ mới"
      :width="720"
      @close="onClose"
      :placement="placement"
      :class="isHiden ? 'disabledBox' : ''"
      :visible="visible"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form :class="isHiden ? 'disabledBox' : ''" :form="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="Kanji:">
              <a-input
                v-decorator="[
                  'kanji'
                ]"
                placeholder="Vui lòng nhập kanji"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="Hiragana:">
              <a-input
                v-decorator="[
                  'hira',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập hiragana' }],
                  },
                ]"
                placeholder="Vui lòng nhập hiragana"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Giải thích">
              <a-input
                v-decorator="[
                  'mean',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập giải thích' }],
                  },
                ]"
                placeholder="Vui lòng nhập giải thích"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Ví dụ 1:">
              <a-input
                v-decorator="[
                  'example_1'
                ]"
                placeholder="Vui lòng thêm ví dụ 1"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 2:">
              <a-input
                v-decorator="[
                  'example_2'
                ]"
                placeholder="Vui lòng thêm ví dụ 2"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Ví dụ 3:">
              <a-input
                v-decorator="[
                  'example_3'
                ]"
                placeholder="Vui lòng thêm ví dụ 3"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 4:">
              <a-input
                v-decorator="[
                  'example_4'
                ]"
                placeholder="Vui lòng thêm ví dụ 4"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Mô tả chi tiết:">
              <a-textarea
                v-decorator="[
                  'description'
                ]"
                :rows="4"
                placeholder="Vui lòng thêm chi tiêt giải thích từ ở trên, phần này sẽ hiện khi bạn quên và muốn biết giải thích của nó là gì"
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
        <a-button :class="isHiden ? 'disabledBox' : ''" type="danger" :style="{ marginRight: '8px' }" @click="onClose">
          <a-icon type="rollback" />Thôi
        </a-button>
        <a-button :class="isHiden ? 'disabledBox' : ''" class="background" @click="handleEdit" type="primary"><a-icon type="form" />Sửa</a-button>
      </div>
    </a-drawer>
  </section>
</template>

<script>
const key = 'updatable'
export default {
  name: 'EditHome',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      placement: 'left',
      isHiden: false // disable box while loading
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
      this.$message.success('Open drawer')
    },
    onClose () {
      this.visible = false
      this.$message.success('Close drawer')
    },
    handleEdit (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.isHiden = true
          this.$message.loading({ content: 'Vui lòng đợi, chúng tôi đang xử lý yêu cầu cho bạn...', key })
          setTimeout(() => {
            this.visible = false
            this.isHiden = false
            this.$message.success({ content: 'Xong :3', key, duration: 2 })
          }, 2000)
        }
      })
    },
    handleCancel (e) {
      this.$message.warning('handle cancel')
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .home-edit {
    text-align: center;
    margin-bottom: 3px;
    .btn {
      width: 92px;
      max-width: 92px;
      min-width: 92px;
    }
  }
</style>
