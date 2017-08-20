<template lang="pug">
  md-dialog(ref="fileBox")
    form(class='file-box'
         @submit.prevent="handleSubmit"
         autocomplete='off')

      md-dialog-content(class="dialog-content")
        md-input-container
          label Company's name
          md-input(v-model="title" required)
          md-icon title

        md-input-container
          label Link to site
          md-input(v-model="link")
          md-icon link

        md-input-container
          label Logo (max size is 180х100)
          md-file(v-model="filename" ref="file" accept="image/*" required)

      md-dialog-actions
        md-button(:disabled="loading"
                  class="md-raised md-primary"
                  type="submit") Save
        md-button(@click.native="close"
                  :disabled="loading"
                  class="md-warn") Cancel

    md-spinner(md-indeterminate class="md-warn file-box__loader" v-show="loading")
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Axios, { AxiosResponse } from 'axios';

  import { checkLink, checkFile } from './utils';

  @Component
  class FileBoxComponent extends Vue {
    public loading: boolean = false;
    public title: string = '';
    public link: string = '';
    public filename: string = '';

    get file() {
      return (<any>this.$refs.file).$el.children[2];
    }

    clear (): void {
      const inputs: NodeList = this.$el.querySelectorAll('input');
      const inputsArray: Array<Node> = Array.from(inputs);

      this.title = '';
      this.link = '';
      this.filename = '';
      this.file.value = '';

      inputsArray.forEach((el: HTMLInputElement) => {
        el.focus()
        el.blur()
      });
    }

    close (): void {
      (<any>this.$refs.fileBox).close();
    }

    handleSubmit (): void {
      const data: FormData = new FormData();
      const title: string = this.title;
      const logo: Blob = this.file.files[0];
      const link: string = checkLink(this.link);

      this.loading = true;

      data.append('title', title);
      data.append('link', link);
      data.append('logo', logo);

      checkFile (logo)
        .then(this.sendData(data))
        .catch(err => {
          const errText: string = 'The file exceeds the allowed size';

          this.$emit('warning', errText);
          this.loading = false;
        });
    }

    sendData (data: object): () => void {
      return () => {
        Axios
          .post('/api/sponsors/create', data)
          .then(this.handleAjaxLoad)
          .catch(this.handleAjaxError)
      }
    }

    handleAjaxLoad (response: AxiosResponse): void {
      this.loading = false;

      const { data } = response;
      const { sponsor, err } = data;

      if (err) {
        throw err;
      }

      this.$emit('notify', 'Data has been successfully saved');
      this.close()

      this.$root.$emit('sponsor-add', sponsor);
      this.clear();
    }

    handleAjaxError (err: Error): void {
      const errText: string = err.message;

      console.error(errText);

      this.loading = false;

      this.$emit('warning', errText);
    }

    mounted () {
      const readOnlyInputs = this.$el.querySelector('[readonly]');

      if (!readOnlyInputs) return;

      readOnlyInputs.removeAttribute('readonly');
    }
  }

  export default FileBoxComponent;
</script>

<style lang="sass">
  .file-box
    border-radius: 2px
    background: #fff
    overflow: hidden
    width: 340px

    .dialog-content
      padding: 12px 24px

    &__loader
      left: calc(50% - 25px)
      position: absolute
      bottom: -70px
      height: 50px
      width: 50px
      margin: 0
</style>
