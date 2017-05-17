<template>
  <div>
    <h3>{{ title }} <span v-if="data && !loading">({{ data.total_count }} results)</span></h3>
    <h2 v-show="typing">Stop typing to search...</h2>
    <h2 v-show="loading">Loading...</h2>
    <h5 v-if="data && !loading">
      <a class="button" @click="back">Back</a> {{ page }} / {{ totalPage }} <a class="button" @click="next">Next</a>
    </h5>
    <p v-if="error">{{ error }}</p>
    <table class="u-full-width" v-if="data && !loading">
      <thead>
        <tr>
          <th>Name</th>
          <th>Owner</th>
          <th>Star</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="x in data.items">
          <th><a :href="x.html_url" target="_blank">{{ x.name }}</a></th>
          <th><a :href="x.owner.html_url" target="_blank">{{ x.owner.login }}</a></th>
          <th>{{ x.stargazers_count }}</th>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as API from '@/services/api'
import { Observable } from 'rxjs'

export default {
  name: 'result',
  props: {
    q: String
  },
  data () {
    return {
      title: '',
      typing: false,
      loading: false,
      page: 1,
      error: ''
    }
  },
  subscriptions () {
    const $q = this.$watchAsObservable('q', { immediate: true })
      .pluck('newValue')
      .do(() => { this.typing = true })
      .debounceTime(1500)
      .do(() => { this.typing = false })
      .filter((q) => !!q)
      .do(() => { this.page = 1 }) // reset page if query changed

    const $page = this.$watchAsObservable('page', { immediate: true })
      .pluck('newValue')

    return {
      data: Observable.combineLatest($q, $page, (q, page) => ({ q, page }))
        .do(() => { this.err = '' })
        .do(() => { this.loading = true })
        .do(({ q }) => { this.title = q })
        .flatMap(({ q, page }) => API.search(q, page)
          .catch((err) => {
            this.error = err.message || 'something went wrong :P'
            return Observable.of(null)
          }))
        .do(() => { this.loading = false })
    }
  },
  computed: {
    totalPage () {
      if (!this.data) return 0
      const len = this.data.items && this.data.items.length || 1
      return Math.ceil(this.data.total_count / len)
    }
  },
  methods: {
    back () {
      if (this.page > 1) --this.page
    },
    next () {
      if (this.page < this.totalPage) ++this.page
    }
  }
}
</script>
