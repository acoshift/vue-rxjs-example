import axios from 'axios'
import { Observable } from 'rxjs'

const API_URL = 'https://api.github.com'

const http = axios.create({
  baseURL: API_URL
})

const get = (url, config) => Observable
  .fromPromise(http.get(url, config))
  .map((resp) => resp.data)

export const search = (q, page) => get('/search/repositories', { params: { q, sort: 'stars', page } })
