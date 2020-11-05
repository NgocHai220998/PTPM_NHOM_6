<template>
  <section class="register">
    <div class="register-box">
      <a-form class="register-form"
        :form="form"
        @submit="handleSubmit"
      >
        <h2 style="padding-top: 0; text-align: center; text-transform: uppercase; font-weight: 500;">{{ $t('login.title-signup') }}</h2>
        <p class="register-warning">
          <a-icon style="color: #faad14; font-size: 24px; position: absolute; top: 12px; left: 15px  " class="warning-icon" type="info-circle-o"/>
          <span style="">{{ $t('login.text-warning') }}</span>
          <span style="display: block">{{ homeUrl }}</span>
        </p>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'email',
              {
                rules: [
                  { required: true, message: $t('login.required-email') },
                  { type: 'email', message: $t('login.invalid-email') }
                ]
              }
            ]"
            :placeholder="$t('login.placeholder-email')"
          />
        </a-form-item>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'password',
              {
                rules: [
                  { required: true, message: $t('login.required-password') },
                  { min: 6, message: $t('login.err-length-password') }
                ]
              }
            ]"
            type='password'
            :placeholder="$t('login.placeholder-password')"
          />
        </a-form-item>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'repassword',
              {
                rules: [
                  { required: true, message: $t('login.required-repassword') },
                  { validator: compareToFirstPassword }
                ]
              }
            ]"
            type='password'
            :placeholder="$t('login.placeholder-repassword')"
          />
        </a-form-item>
        <a-form-item class="signup-terms"
        >
          <a-checkbox
            :checked="termChecked"
            @change="onTermChange"
            v-decorator ="[
              'terms',
              {
                rules: [
                  { validator: checkTermAgree }
                ],
                initialValue: true
              }
            ]"
          >
            {{ $t('login.terms-one') }} <a href="Javascript:">{{ $t('login.terms-second') }}</a>
          </a-checkbox>
        </a-form-item>
        <a-form-item class="btn-submit-register">
          <a-spin :spinning="loading" :delay="0" class="spin-button">
            <a-button class="register-button" type="primary" htmlType="submit">{{ $t('login.btn-signup') }}</a-button>
          </a-spin>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <span style="padding-right: 10px;" class="signin-forgot">{{ $t('login.already-member') }}? </span>
          <router-link :to="{ name: 'Login' }" class="signin-forgot signup-already-member">
            {{ $t('login.btn-login') }}
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script>

import userService from '@/utils/userServices'
import { jsonHeader } from '@/utils/fetchTool'
import { hash256 } from '@/utils/common'
import { API } from '@/constants/api'

export default {
  name: 'RegisterComponent',
  data () {
    return {
      loading: false,
      homeUrl: 'https://game-language.herokuapp.com',
      termChecked: true,
      form: this.$form.createForm(this)
    }
  },
  methods: {
    onTermChange (e) {
      this.termChecked = e.target.checked
    },
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error(this.$t('login.warning-check-repassword')))
      } else {
        callback()
      }
    },
    checkTermAgree (rule, value, callback) {
      if (!value) {
        callback(new Error(this.$t('login.required-terms')))
      } else {
        callback()
      }
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const password = (values.password.length > 1024) ? hash256(values.password.substring(0, 1024)) : hash256(values.password)
          fetch(API.REGISTER, {
            method: 'post',
            headers: jsonHeader.headers,
            body: JSON.stringify({
              email: values.email,
              password: password
            })
          }).then((response) => response.json())
            .then((res) => {
              if (res.code === 200) {
                fetch(API.SEND_EMAIL_REGISTER, {
                  method: 'post',
                  headers: jsonHeader.headers,
                  body: JSON.stringify({
                    email: values.email
                  })
                }).then((response) => response.json())
                  .then((res) => {
                    if (res.code === 200) {
                      const message = res.data.message ? res.data.message : 'Please! check your mail to confirm'
                      this.$message.success(message)
                      this.$router.push({ name: 'Login' })
                    } else if (res.code === 451) {
                      const message = res.data.message ? res.data.message : 'Send confirm message to register fail!'
                      this.$message.error(message)
                    } else {
                      const message = res.data.message ? res.data.message : 'Something is not right!'
                      this.$message.error(message)
                    }
                    this.loading = false
                  }).catch((err) => {
                    console.log(err)
                  })
              } else if (res.code === 401) {
                const message = res.data.message ? res.data.message : 'Email was registered'
                this.$message.error(message)
                this.loading = false
              } else {
                const message = res.data.message ? res.data.message : 'Something is not right'
                this.$message.error(message)
                this.loading = false
              }
            })
        }
      })
    }
  },
  beforeMount () {
    const user = localStorage.getItem('user')
    const isLogin = userService.verify(JSON.parse(user))
    if (isLogin) {
      this.$router.push({ name: 'HomeScreen' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .register {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    .register-box {
      width: 468px;
      border-radius: 20px;
      background-color: white;
      padding: 50px;
      .register-form {
        .register-warning {
          position: relative;
          background-color: #fcf6d7;
          text-align: center;
          padding: 10px 0px 10px 0px;
          span {
            color: rgba(0,0,0,0.65)
          }
          border-radius: 5px;
        }
        .btn-submit-register {
          .spin-button {
            width: 100%;
            text-align: center;
            .register-button {
              width: 100%;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    .register {
      width: 100%;
      .register-box{
        box-shadow: none;
        width: 100% !important;
        .register-warning {
          .warning-icon {
            display: none;
          }
          span {
            font-size: 12px;
          }
        }
        .register-form {
          width: 90%;
        }
      }
    }
  }
</style>
