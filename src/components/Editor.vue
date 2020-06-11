<template>
  <div>
    <div id="toolbar" class="grey-border toolbar"></div>
    <div class="placeholder left-align">请输入内容:</div>
    <div id="editor" class="grey-border left-align"></div>
  </div>
</template>

<script>
import E from 'wangeditor';
import { uploadImage } from '../common/network/api';

const editorMenu = [
  'head',
  'bold',
  'fontSize',
  'fontName',
  'italic',
  'underline',
  'strikeThrough',
  'foreColor',
  'backColor',
  'link',
  'list',
  'justify',
  'quote',
  'emoticon',
  'image',
  'undo',
  'redo',
];

export default {
  name: 'Editor',
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
    const editor = new E('#toolbar', '#editor');
    editor.customConfig.menus = editorMenu;
    editor.customConfig.zIndex = 10;
    editor.customConfig.onchange = (html) => {
      const content = { html, text: editor.txt.text() };
      this.$emit('onEditorContentChange', content);
    };
    editor.customConfig.uploadImgMaxLength = 1;

    editor.customConfig.customUploadImg = this.uploadImG;
    editor.customConfig.customAlert = this.showError;
    editor.create();
  },
};
</script>

<style scoped lang="scss">
  @import "src/common/styles/colors";

  .grey-border {
    border: 1px solid $border-grey;
  }

  .left-align {
    text-align: left;
  }

  .toolbar {
    line-height: 20px;
    background: #f1f1f1;
  }

  .placeholder {
    color: $grey;
  }

  /deep/ .w-e-text-container {
    height: 500px !important;
  }
</style>
