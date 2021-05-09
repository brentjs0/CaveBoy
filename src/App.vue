<template>
  <header class="page__header" role="banner">
    <h1>Empty Project</h1>
  </header>
  <main class="page__content" role="main">
    <FileControl
      input-id="ProjectFileInput"
      label-text="Select a project"
      @files-selected="loadProject"
    />
  </main>
</template>

<script lang="ts">
  import { Options, Vue } from 'vue-class-component';
  import FileControl from './components/FileControl.vue';
  import JSZip from 'jszip';
  import CaveBoyError from './script/base/error/CaveBoyError';

  @Options({
    components: {
      FileControl,
    },
  })
  export default class App extends Vue {
    loadProject(fileList: FileList): void {
      const zipFile = fileList?.item(0);

      if (zipFile) {
        JSZip.loadAsync(zipFile).then(function (jsZip: JSZip) {
          const projectFileEntry:
            | [string, JSZip.JSZipObject]
            | undefined = Object.entries(jsZip.files).find(([key, _]) =>
            key.endsWith('Project.snake')
          );

          if (projectFileEntry === undefined) {
            throw new CaveBoyError(
              'A Project.snake file could not be found in the provided ZIP.'
            );
          }

          const [projectFilePath, projectFileJSZipObject]: [
            string,
            JSZip.JSZipObject
          ] = projectFileEntry;

          projectFileJSZipObject.async('string').then(function (value: string) {
            console.log(`Found Project.snake file at '${projectFilePath}':`);
            //let project: string | number | object | null | undefined = jsyaml.load(value);

            //document.title = `${project.Title} - CaveBoy`;
          });

          return jsZip;
        });
      }
    }
  }
</script>

<style lang="scss">
  @use 'style/main';
</style>
