<template>
  <div class="editor" ref="editor" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor';
import { uploadImage } from '../common/network/api';

export default {
  name: 'Editor',
  data() {
    return { editorContent: '' };
  },
  methods: {
    showError(msg = '上传图片失败') {
      this.$message.error(msg);
    },
    uploadImG(files, insert) {
      const image = new FormData();
      image.append('image', files[0]);
      uploadImage(image)
        .then(({ data }) => {
          insert(`api/storyservice/hero-story/image/${data}`);
        })
        .catch(() => this.showError());
    },
  },
  mounted() {
    const editor = new E(this.$refs.editor);
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.customConfig.uploadImgMaxLength = 1;

    editor.customConfig.customUploadImg = this.uploadImG;
    editor.customConfig.customAlert = this.showError;
    editor.create();
  },
};
</script>

<style scoped>
  .editor {
    height: inherit;
  }
</style>
