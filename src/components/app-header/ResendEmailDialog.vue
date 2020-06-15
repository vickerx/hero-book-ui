<template>
  <div>
    <el-button type="primary" class="btn" @click="dialogVisible = true">重新发送激活邮件</el-button>

    <el-dialog :visible.sync="dialogVisible"
               :modal-append-to-body="false"
               :append-to-body="true"
               :before-close="handleClose"
               width="30%">
      <span class="dialog-content">确认重新发送激活邮件？</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" class="btn" @click="resendRegistrationEmail">发送激活邮件</el-button>
        <el-button class="btn" @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as _ from 'lodash';
import { resendRegistrationEmail } from '../../common/network/api';
import { ERROR_CODE, ERROR_MESSAGE } from '../../common/network/errors';

export default {
  name: 'ResendEmailDialog',
  props: { email: String },
  data() {
    return { dialogVisible: false };
  },
  methods: {
    resendRegistrationEmail() {
      resendRegistrationEmail(this.email)
        .then(() => {
          this.$message({
            message: '发送邮件成功！',
            type: 'success',
          });
          this.handleClose();
        })
        .catch(({ response }) => {
          const errorCode = _.get(response, 'data.error_code');
          if (errorCode === ERROR_CODE.EMAIL_NOT_FOUND.code) {
            this.$message.error(ERROR_CODE.EMAIL_NOT_FOUND.message);
          } else if (errorCode === ERROR_CODE.ACTIVATED_ACCOUNT.code) {
            this.$message.error(ERROR_CODE.ACTIVATED_ACCOUNT.message);
          } else {
            this.$message.error(ERROR_MESSAGE.SYSTEM_ERROR);
          }
          this.handleClose();
        });
    },
    handleClose() {
      this.dialogVisible = false;
      this.$emit('closed');
    },
  },
};
</script>

<style scoped>
  .dialog-content {
    line-height: 24px;
    font-size: 18px;
  }
  /deep/ .el-dialog__body {
    text-align: center;
  }
  .dialog-footer {
    display: flex;
  }
  .btn {
    flex: 1;
  }

</style>
