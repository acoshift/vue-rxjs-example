import Vue from 'vue'
import Router from 'vue-router'
import Result from '@/components/Result'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/search',
      name: 'Search',
      component: Result,
      props: (to) => ({ q: to.query.q })
    }
  ]
})
