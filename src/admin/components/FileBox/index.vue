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
  import { Action, Subscribe } from 'Admin/store';
  import Api from 'Api';

  import { prepareLink, checkImage } from 'Utils/workWithFiles';
  import {
    NOTIFY,
    WARNING,
    OPEN_FILE_BOX,
  } from 'Admin/constants/actionTypes';
  import { MAX_IMG_RES } from 'Admin/constants/config';

  @Component
  class FileBoxComponent extends Vue {
    public loading: boolean = false;
    public title: string = '';
    public link: string = '';
    public filename: string = '';

    @Action(NOTIFY)
    private notify: (params: { text: string }) => void;

    @Action(WARNING)
    private showWarning: (params: { text: string }) => void;
    
    @Subscribe(OPEN_FILE_BOX)
    public show (): void {
      const fileBox = this.$refs.fileBox;

      (<any>fileBox).open();
    }

    get file(): HTMLInputElement {
      return (<any>this).$el.querySelector('[type="file"]');
    }

    private clear (): void {
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

    private close (): void {
      this.clear();
      (<any>this.$refs.fileBox).close();
    }

    public async handleSubmit () {
      const data: FormData = new FormData();
      const title: string = this.title;
      const link: string = prepareLink(this.link);
      const [logo] = (<any>this).file.files;

      this.loading = true;

      data.append('title', title);
      data.append('link', link);
      data.append('logo', logo);

      const fileIsValid: boolean = await checkImage(logo, MAX_IMG_RES);

      if (!fileIsValid) {
        this.showWarning({
          text: 'Image exceeds the maximum allowed resolution',
        });
        this.loading = false;
      }

      Api.Sponsor
        .add(data)
        .then(this.handleAjaxLoad)
        .catch(this.handleAjaxError);
    }

    private handleAjaxLoad (sponsor: Sponsor): void {
      this.loading = false;

      this.notify({
        text: 'Data has been successfully saved',
      });
      this.close();

      this.$root.$emit('sponsor-add', sponsor);
    }

    private handleAjaxError (err: Error): void {
      this.loading = false;
      this.showWarning({
        text: err.message,
      });
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
