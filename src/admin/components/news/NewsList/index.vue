<template lang="pug" src="./template"></template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  import { Action } from 'vuex-class';

  import Api from 'Api';

  @Component
  class Newslist extends Vue {
    public news: News[] = [];
    public sort: string = 'pubdate';
    public filter: string = 'title';
    public filterQuery: string = '';
    public reversed: boolean = false;
    public columns = {
        'id': '_id',
        'Pubdate': 'pubdate',
        'Updated': 'updated',
        'Title': 'title',
    };
    public loading: boolean = true;
    public promptCallback: () => void = () => {};

    @Action private notify: (text: string) => void;

    public get filteredNews () {
      const filter: string = this.filter;
      const query: string = this.filterQuery.toLowerCase();
      const news: News[] = this.sortedNews;

      if (query)
        return news
          .filter(elem => elem[filter].toLowerCase().includes(query))

      return news;
    }

    private get sortedNews (): News[] {
      const sort = this.sort;

      return this.news.sort((a, b) => {
        let prev = a[sort];
        let next = b[sort];

        if (this.reversed) {
          [prev, next] = [next, prev];
        }

        return prev < next ? 1 : -1;
      })
    }

    private getData () {
      Api.News
        .get()
        .then(this.handleDataLoad)
        .catch(console.error)
    }

    private handleDataLoad (news: News[]) {
      this.loading = false;

      this.news = news;
    }

    public setSort (sort: string) {
      const reversed: boolean = this.reversed;

      this.reversed = (this.sort === sort) ? !reversed : reversed;
      this.sort = sort;
    }

    public deleteNews (_id: string) {
      this.promptCallback = () => {
        const news: News[] = this.news;
        const index: number = news.findIndex(el => el._id === _id);

        news.splice(index, 1);

        Api.News
          .delete(_id)
          .then(() => this.notify('Deleted'))
          .catch(console.error);
      }

      (<any>this.$refs.prompt).$children[0].open()
    }

    public created() {
      this.getData();
    }
  }
  
  export default Newslist;
</script>

<style lang="sass" src="./style"></style>
