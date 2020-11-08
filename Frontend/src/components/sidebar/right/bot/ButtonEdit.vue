<template>
  <section class="sidebar-editkanji">
    <a-button @click="showDrawer" class="btn-editkanji background-edit" type="primary"><a-icon type="form" />Sửa</a-button>
    <a-drawer
      title="Sửa Kanji"
      :width="720"
      @close="onClose"
      :visible="visible"
      :bodyStyle="{ paddingBottom: '80px' }"
    >
      <a-form
        :form="form"
        layout="vertical"
        @submit="handleEdit"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="Kanji:">
              <a-input
                v-decorator="[
                  'kanji',
                  {
                    initialValue: kanji,
                    rules: [{ required: true, message: 'Xin vui lòng nhập kanji' }],
                  },
                ]"
                placeholder="Xin vui lòng nhập kanji"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Âm Hán-Việt:">
              <a-input
                v-decorator="[
                  'HV',
                  {
                    rules: [{ required: true, message: 'Xin vui lòng nhập âm Hán-Việt' }],
                  },
                ]"
                placeholder="Xin vui lòng nhập âm Hán-Việt"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="6">
            <a-form-item label="Âm ON:">
              <a-input
                v-decorator="[
                  'on'
                ]"
                placeholder="Vui lòng nhập âm ON"
              />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="Âm KUN:">
              <a-input
                v-decorator="[
                  'kun'
                ]"
                placeholder="Vui lòng nhập âm KUN"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 1:">
              <a-input
                v-decorator="[
                  'example_1'
                ]"
                placeholder="Vui lòng nhập ví dụ 1"
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
                placeholder="Vui lòng nhập ví dụ 2"
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
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Mô tả:">
              <a-textarea
                v-decorator="[
                  'description'
                ]"
                :rows="4"
                placeholder="Vui lòng nhập mô tả"
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
        <a-button class="btn-addEnglish background" @click="handleEdit" type="primary"><a-icon type="plus" />Thêm</a-button>
      </div>
    </a-drawer>
  </section>
</template>

<script>
export default {
  name: 'Editkanji',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      loading: false,
      kanji: '語'
    }
  },
  methods: {
    showDrawer () {
      this.visible = true
    },
    onClose () {
      this.visible = false
    },
    handleEdit (e) {
      e.preventDefault()
      this.form.validateFields((error, values) => {
        if (!error) {
          this.$message.warning('HandleEdit')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
