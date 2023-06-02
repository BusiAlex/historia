<template>
  <div v-if="true" class="">
    <h1 class="centered">Esemény szerkesztő</h1>

    <div id="editor11" class="editor11">
      <Editor v-model="text" :init="tinymceConfig" id="editor1" class="editor1" />
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
        selector: "#editor1",
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

#editor11{
  position: relative;
  transform: translate(13%, 8%);
  width: 950px;

}


.tox-tinymce{
  height: 900px !important;
}


</style>