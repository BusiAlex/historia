<template>
  <div>
    <h1>Editor</h1>
    <main id="sample">
      <Editor
        api-key="2sunwstf5wgpgg17zlpewi8k80e6k3udiopxeqwk6tidxklg"
        :init="{
          plugins: 'lists link image table code help wordcount',
        }"
      />
    </main>
  </div>
</template>

<script setup>
import  Editor  from '@tinymce/tinymce-vue';


</script>

<style>

</style>