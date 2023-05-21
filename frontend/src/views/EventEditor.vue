<template>
  <div v-if="true" class="">
    <h1 class="centered">Esemény szerkesztő</h1>

    <div class="editor-wrapper">
      <Editor v-model="text" :init="tinymceConfig" class="textarea" />
      </div>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce";
import 'tinymce/themes/silver';

export default {
  components: {
    Editor,
  },
  data() {
    return {
      text: null,
      tinymceConfig: {
        selector: 'textarea.textarea',
        plugins: 'lists link image editimage table code help wordcount',
        skin: "HISTORIASKIN",
        skin_url: '/node_modules/tinymce/skins/ui/historyskin/',
        promotion: false,
      },
    };
  },
  mounted() {
    tinymce.baseURL = "/";
  },
};
</script>

<style>

.centered {
  text-align: center;
}

.editor-wrapper {
  position: relative;
  width: 100%;
  height: 400px;
}

.tox-tinymce{
  position: absolute;
  transform: translate(13%, 8%);
  height: 900px !important;
  width: 950px;
}

</style>