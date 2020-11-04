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
          <a-col :span="12">
            <a-form-item label="Từ mới:">
              <a-input
                v-decorator="[
                  'vocabulary',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập từ mới' }],
                    initialValue: this.currentWord.vocabulary
                  }
                ]"
                placeholder="Vui lòng nhập từ mới"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Giải thích">
              <a-input
                v-decorator="[
                  'explain',
                  {
                    rules: [{ required: true, message: 'Vui lòng nhập giải thích' }],
                    initialValue: this.currentWord.explain
                  }
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
                  'example1',
                  {
                    initialValue: this.currentWord.example1
                  }
                ]"
                placeholder="Vui lòng thêm ví dụ 1"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 2:">
              <a-input
                v-decorator="[
                  'example2',
                  {
                    initialValue: this.currentWord.example2
                  }
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
                  'example3',
                  {
                    initialValue: this.currentWord.example3
                  }
                ]"
                placeholder="Vui lòng thêm ví dụ 3"
              />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Ví dụ 4:">
              <a-input
                v-decorator="[
                  'example4',
                  {
                    initialValue: this.currentWord.example4
                  }
                ]"
                placeholder="Vui lòng thêm ví dụ 4"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Mô tả chi tiết">
              <a-textarea
                v-decorator="[
                  'description',
                  {
                    initialValue: this.currentWord.description
                  }
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

import { API } from '@/constants/api'
import { jsonHeader } from '@/utils/fetchTool'

const key = 'updatable'
export default {
  name: 'EditHome',
  data () {
    return {
      form: this.$form.createForm(this),
      visible: false,
      placement: 'left',
      currentWord: {
        vocabulary: '',
        explain: '',
        description: '',
        example1: '',
        example2: '',
        example3: '',
        example4: ''
      },
      isHiden: false // disable box while loading
    }
  },
  props: ['word'],
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
          this.isHiden = true
          this.$message.loading({ content: 'Vui lòng đợi, chúng tôi đang xử lý yêu cầu cho bạn...', key })
          fetch(`${API.UPDATE_WORD}/${this.word._id}`, {
            headers: jsonHeader.headers,
            method: 'put',
            body: JSON.stringify({
              token: this.user.token,
              data: {
                vocabulary: values.vocabulary,
                explain: values.explain,
                description: values.description,
                example1: values.example1,
                example2: values.example2,
                example3: values.example3,
                example4: values.example4
              }
            })
          }).then((response) => response.json())
            .then((res) => {
              this.visible = false
              this.isHiden = false
              if (res.code === 200) {
                this.$message.success({ content: 'Sửa từ mới thành công :3', key, duration: 2 })
                this.$emit('editDone')
              } else {
                this.$message.error(res.data.message)
              }
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    handleCancel (e) {
      this.$message.warning('handle cancel')
      this.visible = false
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  },
  watch: {
    word: function () {
      this.currentWord = this.word
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
