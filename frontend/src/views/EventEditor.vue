<template>
  <div>
    <h1>Editor</h1>
    <main id="sample">
      <Editor
        v-model="text"
        api-key="2sunwstf5wgpgg17zlpewi8k80e6k3udiopxeqwk6tidxklg"
        :init="{
          plugins: 'lists link image table code help wordcount',
        }"
      />
    </main>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Editor,
  },
  data() {
    return {
      text: null,
    };
  },
  mounted() {
    tinymce.init({
      selector: "textarea.classic",
    });
  },
};
</script>

<style>
</style>