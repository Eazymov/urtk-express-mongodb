<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import Api from 'Api';

  @Component
  class Sidebar extends Vue {
    public sections: Array<Section> = [];
    public promptCallback: () => void = () => {};

    getData (): void {
      Api.Section.get()
        .then(this.handleDataLoad)
        .catch(console.error);
    }

    handleDataLoad (data: Section[]): void {
      this.sections = data
    }

    handleDelete (_id: string): void {
      this.promptCallback = () => {
        this.$root.$emit('section-delete', _id);

        Api.Section
          .delete(_id)
          .catch(console.error);
      }

      (<any>this.$refs.prompt).$children[0].open();
    }

    deleteSection (_id: string): void {
      const sections = this.sections;
      const index = sections.findIndex(el => el._id === _id);

      if (!index) return;

      sections.splice(index, 1);
    }

    addSection (obj: Section): void {
      this.sections.push(obj);
    }

    handleHide (_id: string): void {
      const section = this.sections.find(el => el._id === _id);

      if (!section) return;

      const copy = { ...section };

      copy.visible = +copy.visible ? 0 : 1;

      delete copy.articles;

      this.$root.$emit('section-update', copy);

      Api.Section
        .update(copy)
        .catch(console.error);
    }

    updateSection (obj: Section): void {
      const sections = this.sections;
      const index = sections.findIndex(el => el._id === obj._id);
      const section = sections[index];

      if (!section) return;

      Object
        .keys(section)
        .forEach((key: string) => {
          if (obj[key] !== undefined)
            section[key] = obj[key];
        });

      this.$set(sections, index, section);
    }

    created () {
      const root = this.$root;

      this.getData();

      root.$on('section-delete', this.deleteSection);
      root.$on('section-create', this.addSection);
      root.$on('section-update', this.updateSection);
    }
  }

  export default Sidebar;
</script>

<style lang="sass" src="./style"></style>
