<template>
  <div>
    <el-button class="login-btn" round type="primary" @click="shouldShowModal = true" >
      <slot></slot>
    </el-button>

    <el-dialog custom-class="modal" center :title="title" @close="resetForm"
               :visible.sync="shouldShowModal" append-to-body>

      <el-alert class="modal-alert" center v-if="alert.message"
                effect="dark" show-icon :title="alert.message" :type="alert.type">
      </el-alert>

      <el-form class="sign-in-form" label-width="auto"
               :model="signInForm" :rules="rules" ref="signInForm">
        <el-form-item prop="email">
          <el-input v-model="signInForm.email"
                    prefix-icon="el-icon-message" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signInForm.password" show-password @keyup.native="replaceInvalidPwd()"
                    type="password" prefix-icon="el-icon-lock" placeholder="密码"/>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button type="primary" class="btn" @click="handleSubmit" v-if="!isNotActivatedEmail"
                     :disabled="submitBtnDisabled">登录</el-button>
          <ResendEmailDialog v-if="isNotActivatedEmail"
                             :email="signInForm.email"
                             @closed="shouldShowModal = false"/>
          <el-button class="btn" @click="shouldShowModal = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { login } from '../../common/network/api';
import ResendEmailDialog from './ResendEmailDialog';
import { ERROR_CODE, ERROR_MESSAGE } from '../../common/network/errors';

export default {
  name: 'SignInModal',
  components: { ResendEmailDialog },
  props: { title: String },
  data() {
    const requiredNotEmptyRule = { type: 'string', required: true, transform: (value) => value.trim() };
    const validateEmail = (rule, value, callback) => {
      if (value && this.isNotActivatedEmail) {
        callback(new Error(ERROR_CODE.NOT_ACTIVATED_ACCOUNT.message));
      }
      callback();
    };

    return {
      shouldShowModal: false,
      submitBtnDisabled: false,
      isNotActivatedEmail: false,
      alert: {
        message: '',
        type: '',
      },
      signInForm: {
        password: '',
        email: '',
      },
      rules: {
        email: [
          { ...requiredNotEmptyRule, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { validator: validateEmail },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 8, max: 30, message: '密码长度为 8 到 30 个字符', trigger: 'blur' },
        ],
      },
    };
  },
  computed: {},
  methods: {
    async login() {
      const { data: { code, msg } } = await login(this.signInForm.email, this.signInForm.password)
        .catch(() => {
          this.alert.message = ERROR_MESSAGE.SYSTEM_ERROR;
          this.alert.type = 'error';
          this.submitBtnDisabled = false;
        });
      if (code === 0) {
        this.shouldShowModal = false;
        this.$emit('logged-in');
      } else if (code === 2) {
        this.isNotActivatedEmail = true;
        this.$refs.signInForm.validateField('email');
      } else {
        this.alert.type = 'error';
        this.alert.message = msg;
      }
      this.submitBtnDisabled = false;
    },
    resetForm() {
      this.isNotActivatedEmail = false;
      this.submitBtnDisabled = false;
      this.alert.message = '';
      this.$refs.signInForm.resetFields();
    },
    replaceInvalidPwd() {
      this.signInForm.password = this.signInForm.password.replace(/[^(\x21-\x7f)]+/g, '');
    },
    handleSubmit() {
      this.$refs.signInForm.validate((valid) => {
        if (!valid) {
          return;
        }
        this.submitBtnDisabled = true;
        this.login();
      });
    },
  },
};
</script>

<style scoped lang="scss">
  @import "../../common/styles/dimens";

  /deep/ .modal {
    width: 400px;
    padding: 0 20px;
  }

  .btn-group {
    margin-bottom: 0px;

    /deep/ .el-form-item__content {
      margin-top: $basic-margin * 2;
      display: flex;
    }

    .btn {
      flex: 1;
    }
  }

  .modal-alert {
    position: absolute;
    top: 0;
    right: 0;
  }
</style>
