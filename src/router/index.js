import Vue from 'vue'
import Router from 'vue-router'
import wsng from '@/page/login'
import list from '@/page/demo/list/list.vue'


import home from '@/page/index/homePage.vue'
import index from '@/page/index/index.vue'

import music from '@/components/music/music.vue'

import lyric from '@/page/demo/lyric.vue'
import irlytest from '@/components/irlytest/irlytest'
import refresh from '@/components/page/refresh.vue'
import pigeonhole from '@/page/header/pigeonhole.vue'
import articles from '@/components/article/articles.vue'
import comments from '@/components/article/comments.vue'
import logbook from '@/components/logbook/logbook.vue'

import markdown from '@/components/markdown/markdown.vue'
import books from '@/components/books/mybooks.vue'

import clickhouseData from '@/components/clickhouse/clickhouseData.vue'

import logctx from '@/components/laboratory/logctx.vue'


Vue.use(Router)

//在路由跳转的时候同一个路由多次添加是不被允许的
//重写路由的push方法
const VueRouterPush = Router.prototype.push
Router.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/logctx',
      name: 'logctx',
      component: logctx
    },
    {
      path: '/clickhouse',
      name: 'clickhouse',
      component: clickhouseData
    },
    {
      path: '/markdown',
      name: 'markdown',
      component: markdown
    },
    {
      path: '/music',
      name: 'music',
      component: music
    },
    {
      path: '/books',
      name: 'books',
      component: books
    },
    {
      path: '/logbook',
      name: 'logbook',
      component: logbook
    },
    {
      path: '/article',
      name: 'article',
      component: articles
    },
    {
      path: '/comments',
      name: 'comments',
      component: comments
    },
    {
      path: '/pigeonhole',
      name: 'pigeonhole',
      component: pigeonhole
    },
    {
      path: '/refresh',
      name: 'refresh',
      component: refresh
    },
    {
      path: '/irlytest',
      name: 'irlytest',
      component: irlytest
    },
    {
      path: '/page',
      // name: 'header.vue',
      name:'homePage.vue',
      // component: header
      component: home
    }
    ,
    {
      path: '/list',
      name: 'list.vue',
      component: list
    }
  ]
})
