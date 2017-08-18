<template lang="html">
  <md-whiteframe tag="section" md-elevation="6" id='menu-sidebar'>

    <div class="menu-head">
      <router-link class="menu-head__mainpage-link" to="/" tag="h2">
        Administrator 
        <md-icon>verified_user</md-icon>
      </router-link>
      <md-button class='md-icon-button md-fab md-mini menu-head__exit-btn' href='exit.php'>
        <md-icon>close</md-icon>
        <md-tooltip md-delay="500">Exit</md-tooltip>
      </md-button>
    </div>

    <ul class="menu-list">
      <li class="menu-list__item">
        <router-link to='/homepage' class="menu-list__item__link" exact>
          <md-ink-ripple />
          <span>Homepage</span>
        </router-link>
      </li>
      <li class="menu-list__item">
        <router-link to='/sponsors' class="menu-list__item__link">
          <md-ink-ripple />
          <span>Sponsors</span>
        </router-link>
        <a class='add-btn'
           @click="$emit('fileBoxBtnClick')">
          <md-icon>playlist_add</md-icon>
          <md-tooltip md-delay="500">Add sponsor</md-tooltip>
        </a>
      </li>
      <li class="menu-list__item">
        <router-link to='/news' class="menu-list__item__link" exact>
          <md-ink-ripple />
          <span>News</span>
        </router-link>
        <router-link to='/news/create' class='add-btn' exact>
          <md-icon>playlist_add</md-icon>
          <md-tooltip md-delay="500">Add news</md-tooltip>
        </router-link>
      </li>
      <li class="menu-list__item">
        <router-link to='/articles' class="menu-list__item__link" exact>
          <md-ink-ripple />
          <span>Articles</span>
        </router-link>
        <router-link to='/articles/create' class='add-btn' exact>
          <md-icon>playlist_add</md-icon>
          <md-tooltip md-delay="500">Add article</md-tooltip>
        </router-link>
      </li>
      <li class="menu-list__item">
        <router-link to='/categories' class="menu-list__item__link" exact>
          <md-ink-ripple />
          <span>Sections</span>
        </router-link>
        <router-link to='/categories/create' class='add-btn' exact>
          <md-icon>playlist_add</md-icon>
          <md-tooltip md-delay="500">Add section</md-tooltip>
        </router-link>

        <ul class="categorie-list">
          <md-icon class="subdirectory_arrow">subdirectory_arrow_left</md-icon>
          <transition-group name="categories">
            <li v-for="categorie in categories"
                class="categorie-list__item"
                :class="{ 'visible': +categorie.visible }"
                key="categorie.id">

              <md-button class="md-icon-button md-dense hide-btn"
                         @click.native="handleHide(categorie._id)">
                <md-icon>{{ +categorie.visible ? 'visibility' : 'visibility_off' }}</md-icon>
                <md-tooltip md-delay="500">Hide section</md-tooltip>
              </md-button>

              <md-button :href="`#/categories/${categorie._id}/edit`"
                         class="md-raised md-icon-button md-dense edit-btn">
                <md-icon class="md-light md-20">edit</md-icon>
                <md-tooltip md-delay="500">Edit</md-tooltip>
              </md-button>

              <md-button class="md-raised md-icon-button md-dense del-btn"
                         @click.native="handleDelete(categorie._id)">

                <md-icon>delete_forever</md-icon>
                <md-tooltip md-delay="500">Delete</md-tooltip>
              </md-button>

              <router-link :to="{ path: `/categories/${categorie._id}` }"
                           class="categorie-list__item__link"
                           exact>
                {{ categorie.title }}
              </router-link>

            </li>
          </transition-group>
        </ul>
      </li>
    </ul>

    <prompt ref="prompt"
            :callback="promptCallback"
            text="Are you sure to delete this section?" />

  </md-whiteframe>
</template>

<script>
  export default {

    data: () => ({
      categories: [],
      promptCallback: null
    }),

    methods: {
      getData() {
        const expires = (new Date()).getTime();

        this.$http
          .get(`/categories?${expires}`)
          .then(this.handleDataLoad)
          .catch(error => console.log(error));
      },

      handleDataLoad(response) {
        const { data } = response

        if (!data.length) return;

        this.categories = data
      },

      handleDelete(_id) {
        this.promptCallback = () => {
          this.$root.$emit('categorie-delete', _id);

          this.$http
            .post('/categories/delete', { _id })
            .catch(error => console.log(error));
        }

        this.$refs.prompt.$children[0].open()
      },

      deleteCategorie(_id) {
        const categories = this.categories;
        const index = categories.findIndex(el => el._id === _id);

        categories.splice(index, 1);
      },

      addCategorie(obj) {
        this.categories.push(obj);
      },

      handleHide(id) {
        const categorie = this.categories.find(el => el.id === id);
        const copy = Object.assign({}, categorie);

        copy.visible = +copy.visible ? 0 : 1;

        delete copy.articles;

        this.$root.$emit('categorie-update', copy);

        this.$http
          .post(`../../../server_scripts/update/categorie.php`, copy)
          .catch(error => console.log(error));
      },

      updateCategorie(obj) {
        const categories = this.categories;
        const index = categories.findIndex(el => el.id === obj.id);
        const categorie = categories[index];

        if (!categorie) return;

        for (const prop in categorie) {
          if (!obj.hasOwnProperty(prop)) continue;

          if (obj[prop] !== undefined)
            categorie[prop] = obj[prop];
        }

        this.$set(categories, index, categorie);
      }
    },

    created() {
      const root = this.$root;

      this.getData();

      root.$on('categorie-delete', this.deleteCategorie);
      root.$on('categorie-create', this.addCategorie);
      root.$on('categorie-update', this.updateCategorie);
    }
  }
</script>

<style lang="sass">
  $transition: .2s
  $blue: #1976d2
  $lightBlue: #2196f3
  $green: #4caf50
  $darkGreen: #388e3c
  $red: #f44336
  $darkRed: #d32f2f
  $shadowColor: rgba(#000, .3)
  $hoverShadowColor: rgba(#000, .2)

  #App
    #menu-sidebar
      border: 1px solid $lightBlue
      left: calc(50vw - 650px)
      border-top-width: 0px
      background: #fafafa
      position: absolute
      overflow-x: hidden
      overflow-y: auto
      height: 100vh
      width: 300px
      top: 0

      .menu-head
        border-top: 10px solid $blue
        padding: 35px 0 35px 50px
        background: $lightBlue
        position: relative
        display: block
        height: 109px
        width: 100%
        &__mainpage-link
          display: inline-flex
          position: relative
          font-size: 1.5rem
          font-weight: 300
          cursor: pointer
          color: #fff
        &__exit-btn
          background-color: $blue
          transition: $transition
          position: absolute
          bottom: -20px
          right: 15px
          z-index: 1
          &:hover,
          &:focus
            background-color: $red
            transform: scale(1.2)

      .menu-list
        list-style: none
        width: 100%
        &__item
          border-bottom: 1px solid #ddd
          background-color: #fff
          position: relative
          margin: 0 auto
          width: 100%
          &__link
            background-color: transparent
            padding: 15px 15px 15px 48px
            transition: $transition
            font-family: Helvetica
            text-decoration: none
            font-size: 1.125rem
            position: relative
            overflow: hidden
            font-weight: 400
            display: block
            color: $blue
            height: 48px
            &.active span
              color: $blue
            span
              color: rgba(#000, .87)
              &:hover
                text-decoration: underline

          .add-btn
            border: 1px solid transparent
            transition: $transition
            color: rgba(#000, .87)
            text-decoration: none
            border-radius: 2px
            position: absolute
            cursor: pointer
            height: 30px
            padding: 2px
            opacity: .54
            width: 30px
            left: 9px
            top: 9px
            &:hover,
            &:focus,
            &.active
              border-color: #d3d3d3
              color: $blue
              opacity: 1

          .categorie-list
            position: relative
            border-top: none
            list-style: none
            margin: 0 auto
            .subdirectory_arrow
              transform: rotateZ(-90deg)
              color: rgba(#000, .54)
              pointer-events: none
              position: absolute
              left: 135px
              top: -30px
            &__item
              background-color: #fff
              color: rgba(#000, .54)
              position: relative
              display: block
              &.visible
                color: rgba(#000, .87)
                .hide-btn
                  opacity: 1

              .hide-btn
                color: rgba(#000, .54)
                position: absolute
                opacity: .65
                left: 28px
                top: 4px
                &:hover
                  color: rgba(#000, .87)

              &__link
                padding: 10px 0 10px 70px
                text-overflow: ellipsis
                transition: $transition
                white-space: nowrap
                font-weight: 400
                font-size: 1rem
                color: inherit
                display: block
                height: 39px
                width: 180px
                &:hover,
                &:focus,
                &.active
                  text-decoration: underline
                  color: $blue

              .edit-btn,
              .del-btn
                position: absolute
                color: #fff
                top: 3px
              .edit-btn
                background-color: $green
                right: 54px
              .del-btn
                background-color: $red
                right: 14px

    .categories-enter-active
      transition: .2s ease-out

    .categories-leave-active
      transition: .2s ease-in

    .categories-leave,
    .categories-enter-to
      height: 39px

    .categories-enter,
    .categories-leave-to
      margin-left: 300px
      opacity: 0
      height: 0
</style>
