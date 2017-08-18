<template lang="html">

  <md-dialog ref="fileBox">
    <form class='file-box'
          @submit.prevent="handleSubmit"
          autocomplete='off'>

      <md-dialog-content class="dialog-content">
        <md-input-container>
          <label>Company's name</label>
          <md-input v-model="title" required></md-input>
          <md-icon>title</md-icon>
        </md-input-container>

        <md-input-container>
          <label>Link to site</label>
          <md-input v-model="link"></md-input>
          <md-icon>link</md-icon>
        </md-input-container>

        <md-input-container>
          <label>Logo (max size is 180х100)</label>
          <md-file v-model="filename" ref="file" accept="image/*" required></md-file>
        </md-input-container>
      </md-dialog-content>

      <md-dialog-actions>
        <md-button :disabled="loading"
                   class="md-raised md-primary"
                   type="submit">
          Save
        </md-button>
        <md-button @click.native="close"
                   :disabled="loading"
                   class="md-warn">
          Cancel
        </md-button>
      </md-dialog-actions>
    </form>

    <md-spinner md-indeterminate class="md-warn file-box__loader" v-show="loading" />
  </md-dialog>

</template>

<script>
  function checkLink(link) {
    if (link === '' || link === '#') return link;

    const httpRegex = /(http:\/\/)|(https:\/\/)/gi;

    if (httpRegex.test(link) !== true)
      return `http://${link}`;

    return link;
  }

  function checkFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = e => {
        const img = document.createElement('img');

        img.src = reader.result;
        img.onload = e => {
          const bool = img.width <= 180 && img.height <= 100;

          if (bool)
            resolve(true)
          else
            reject(false);
        }

        img.onerror = e => reject(false);
      }
      reader.onerror = e => reject(false);

      reader.readAsDataURL(file);
    })
  }

  export default {
    data: () => ({
      loading: false,
      title: '',
      link: '',
      filename: ''
    }),

    computed: {
      file() {
        return this.$refs.file.$el.children[2];
      }
    },

    methods: {
      clear() {
        this.title = '';
        this.link = '';
        this.filename = '';
        this.file.value = '';

        this.$el.querySelectorAll('input').forEach(el => {
          el.focus()
          el.blur()
        })
      },

      close() {
        this.$refs.fileBox.close()
      },

      handleSubmit() {
        const data  = new FormData();
        const title = this.title;
        const link  = checkLink(this.link);
        const logo  = this.file.files[0];

        this.loading = true;

        data.append('title', title);
        data.append('link',  link);
        data.append('logo',  logo);

        checkFile(logo)
          .then(this.sendData(data))
          .catch(err => {
            const errorText = 'The file exceeds the allowed size';

            this.$emit('warning', errorText);
            this.loading = false;
          });
      },

      sendData(data) {
        return () => {
          this.$http
            .post('/sponsors/create', data)
            .then(this.handleAjaxLoad)
            .catch(this.handleAjaxError)
        }
      },

      handleAjaxLoad(response) {
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
      },

      handleAjaxError(err) {
        const errText = err.errmsg || err.message;

        console.error(errText);

        this.loading = false;

        this.$emit('warning', errText);
      }
    },

    mounted() {
      this.$el
        .querySelector('[readonly]')
        .removeAttribute('readonly')
    }
  }
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
