<template>
  <div>
    <el-button round @click="showModal">注册</el-button>

    <el-dialog custom-class="modal" center title="注册"
               :visible.sync="shouldShowModal" append-to-body>

      <el-alert class="modal-alert" center show-icon
                v-if="message" effect="dark"
                :title="message" :type="isSuccess ? 'success' : 'error'">
      </el-alert>

      <el-form class="sign-up-form" label-width="auto"
               :model="signUpForm" :rules="rules" ref="signUpForm">
        <el-form-item prop="username">
          <el-input v-model="signUpForm.username"
                    prefix-icon="el-icon-user-solid" placeholder="昵称"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="signUpForm.email"
                    prefix-icon="el-icon-message" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signUpForm.password" show-password @keyup.native="replaceInvalidPwd()"
                    type="password" prefix-icon="el-icon-lock" placeholder="密码"/>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="signUpForm.checkPassword"
                    type="password" prefix-icon="el-icon-lock" placeholder="确认密码"/>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button type="primary" class="btn" @click="handleSubmit"
                     :disabled="submitBtnDisabled" v-if="!shouldShowResendButton">注册</el-button>
          <ResendEmailDialog v-if="shouldShowResendButton"
                             :email="signUpForm.email"
                             @closed="shouldShowModal = false"/>
          <el-button class="btn" @click="shouldShowModal = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { registerUser } from '../../common/network/api';
import { ERROR_CODE, ERROR_MESSAGE } from '../../common/network/errors';
import ResendEmailDialog from './ResendEmailDialog';

const successMsg = '注册成功，请前往注册邮箱激活帐户';

export default {
  name: 'SignUpModal',
  components: { ResendEmailDialog },
  data() {
    const validatePassword = (rule, value, callback) => {
      const { checkPassword, password } = this.signUpForm;
      if (checkPassword !== '' && password !== '' && checkPassword !== password) {
        callback(new Error('两次输入密码不一致!'));
      }
      callback();
    };

    const recheckPassword = (rule, value, callback) => {
      if (this.signUpForm.checkPassword !== '') {
        this.$refs.signUpForm.validateField('checkPassword');
      }
      callback();
    };

    const validateEmail = (rule, value, callback) => {
      if (value && this.emailValidateError != null) {
        callback(new Error(this.emailValidateError.message));
      }
      callback();
    };

    const requiredNotEmptyRule = { type: 'string', required: true, transform: (value) => value.trim() };

    return {
      shouldShowModal: false,
      submitBtnDisabled: false,
      isSuccess: false,
      isDuplicateEmail: false,
      emailValidateError: null,
      shouldShowResendButton: false,
      message: '',
      signUpForm: {
        password: '',
        email: '',
        username: '',
        checkPassword: '',
      },
      rules: {
        username: [
          { ...requiredNotEmptyRule, message: '请输入昵称' },
          { min: 1, max: 20, message: '昵称长度为 1 到 20 字符' },
        ],
        email: [
          { ...requiredNotEmptyRule, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
          { validator: validateEmail },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 8, max: 30, message: '密码长度为 8 到 30 个字符' },
          { validator: recheckPassword, trigger: 'blur' },
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码' },
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    showModal() {
      if (this.$refs.signUpForm) {
        this.$refs.signUpForm.resetFields();
      }
      this.resetState();
      this.submitBtnDisabled = false;
      this.shouldShowModal = true;
    },
    resetState() {
      this.isSuccess = false;
      this.message = '';
      this.emailValidateError = null;
      this.shouldShowResendButton = false;
    },
    replaceInvalidPwd() {
      this.signUpForm.password = this.signUpForm.password.replace(/[^(\x21-\x7f)]+/g, '');
    },
    handleSubmit() {
      this.resetState();
      this.$refs.signUpForm.validate((valid) => {
        if (valid) {
          this.submitBtnDisabled = true;
          this.registerUser();
        }
      });
    },
    registerUser() {
      registerUser(this.signUpForm)
        .then(() => {
          this.isSuccess = true;
          this.message = successMsg;
        })
        .catch(({ response }) => this.handleRegisterFailed(_.get(response, 'data.error_code')));
    },
    handleRegisterFailed(errorCode) {
      this.isSuccess = false;
      this.submitBtnDisabled = false;
      if (errorCode === ERROR_CODE.DUPLICATE_EMAIL.code) {
        this.emailValidateError = ERROR_CODE.DUPLICATE_EMAIL;
        this.$refs.signUpForm.validateField('email');
      } else if (errorCode === ERROR_CODE.NOT_ACTIVATED_ACCOUNT.code) {
        this.emailValidateError = ERROR_CODE.NOT_ACTIVATED_ACCOUNT;
        this.$refs.signUpForm.validateField('email');
        this.shouldShowResendButton = true;
      } else {
        this.message = ERROR_MESSAGE.SYSTEM_ERROR;
      }
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
