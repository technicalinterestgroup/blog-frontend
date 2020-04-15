import Vue from 'vue'
import Router from 'vue-router'
import {LoadingBar} from 'view-design'
import Index from '@/components/index/Index'

// 公共区域
// import CommonHeader from '@/components/header/CommonHeader';
import SimpleHeader from '@/components/header/SimpleHeader/SimpleHeader'
import CommonFooter from '@/components/footer/CommonFooter'
// 首页
import IndexeContent from '@/components/content/IndexContent'
import BlogContent from '@/components/content/BlogContent'
import AskContent from '@/components/content/AskContent'
import AddAskContent from '@/components/content/AddAskContent'
import HomeContent from '@/components/content/HomeContent'
import ArticleContent from '@/components/content/ArticleContent'
import AskDetailContent from '@/components/content/AskDetailContent'

import BookNoteContent from '@/components/content/BookNoteContent'
import BookContent from '@/components/content/BookContent'
import ArticleListContent from '@/components/content/ArticleListContent'
import BookListContent from '@/components/content/BookListContent'
import TimeLineContent from '@/components/content/TimeLineContent'
import SearchResultContent from '@/components/content/SearchResultContent'
import ArchiveContent from '@/components/content/ArchiveContent'
import Login from '@/components/login/Login'
import Register from '@/components/register/Register'
import MyHomeContent from '@/components/content/MyHomeContent'
import MyCenterContent from '@/components/content/MyCenterContent'
import MyAccountContent from '@/components/content/MyAccountContent'
import MyBlogContent from '@/components/content/MyBlogContent'
import MyNoticeContent from '@/components/content/MyNoticeContent'
import WebNoticeContent from '@/components/content/WebNoticeContent'

import UserInfo from '@/components/views/System/UserInfo'
import PassWord from '@/components/views/System/PassWord'
import Email from '@/components/views/System/Email'
import ArticleAddOrUpdate from '@/components/views/System/ArticleAddOrUpdate'
import Category from '@/components/views/System/Category'
import BlogSet from '@/components/views/System/BlogSet'
import CollectTable from '@/components/views/System/CollectTable'
import LikeTable from '@/components/views/Notice/LikeTable'
import CommentTable from '@/components/views/Notice/CommentTable'
import Focus from '@/components/views/System/Focus'
import Fans from '@/components/views/System/Fans'

import test from '@/components/content/test'

const [routerPush, routerReplace] = [Router.prototype.push, Router.prototype.replace]
Router.prototype.push = function push (location) {
  return routerPush.call(this, location)
  // .catch(error => error)
}
Router.prototype.replace = function replace (location) {
  return routerReplace.call(this, location)
  // .catch(error => error)
}

Vue.use(Router)

let router = new Router({
  mode: 'history',
  // 测试部署
  base: 'test',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          name: 'index',
          components: {
            header: SimpleHeader,
            content: IndexeContent,
            footer: CommonFooter
          },
          meta: {
            title: '首页 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'login',
          name: 'Login',
          components: {
            header: SimpleHeader,
            content: Login,
            footer: CommonFooter
          },
          meta: {
            title: '登录 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'register',
          name: 'Register',
          components: {
            header: SimpleHeader,
            content: Register,
            footer: CommonFooter
          },
          meta: {
            title: '注册 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'blog',
          name: 'Blog',
          components: {
            header: SimpleHeader,
            content: BlogContent,
            footer: CommonFooter
          },
          meta: {
            title: '博客 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'ask',
          name: 'Ask',
          components: {
            header: SimpleHeader,
            content: AskContent,
            footer: CommonFooter
          },
          meta: {
            title: '问答列表 | Blog 创建你自己的博客'
          }
        },
        {
          path: 'question',
          name: 'Question',
          components: {
            header: SimpleHeader,
            content: AddAskContent,
            footer: CommonFooter
          },
          meta: {
            title: '提问 | Blog 创建你自己的博客'
          }
        },
        {
          path: ':userName/ask/:askId',
          name: 'AskDetail',
          components: {
            header: SimpleHeader,
            content: AskDetailContent,
            footer: CommonFooter
          },
          meta: {
            title: '问答 | Blog 创建你自己的博客'
          }
        },
        {
          path: 'resources',
          name: 'Resources',
          components: {
            header: SimpleHeader,
            content: test,
            footer: CommonFooter
          },
          meta: {
            title: '资源 | Blog 创建你自己的博客'
          }
        },
        {
          path: ':userName',
          name: 'home',
          components: {
            header: SimpleHeader,
            content: HomeContent,
            footer: CommonFooter
          }
        },
        {
          path: ':userName/article/:articleId',
          name: 'article',
          components: {
            header: SimpleHeader,
            content: ArticleContent,
            footer: CommonFooter
          }
        },
        {
          path: 'so/search',
          name: 'search',
          components: {
            header: SimpleHeader,
            content: SearchResultContent,
            footer: CommonFooter
          },
          meta: {
            title: '搜索 | VBlog 创建你自己的博客'
          }
        },
        {
          path: ':userName/archive/:period',
          name: 'archive',
          components: {
            header: SimpleHeader,
            content: ArchiveContent,
            footer: CommonFooter
          },
          meta: {
            title: '博文归档 | VBlog 创建你自己的博客'
          }
        },
        {
          path: ':userName/home',
          name: 'myHome',
          components: {
            header: SimpleHeader,
            content: MyHomeContent,
            footer: CommonFooter
          }
        },
        {
          path: 'articles/category/:id',
          name: 'articles/category',
          components: {
            header: SimpleHeader,
            content: ArticleListContent,
            footer: CommonFooter
          },
          meta: {
            title: '博文列表 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'bookNote/:bookNoteId',
          name: 'bookNote',
          components: {
            header: SimpleHeader,
            content: BookNoteContent,
            footer: CommonFooter
          }
        },
        {
          path: 'book/:bookId',
          name: 'book',
          components: {
            header: SimpleHeader,
            content: BookContent,
            footer: CommonFooter
          }
        },
        {
          path: 'books',
          name: 'books',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'books/category/:id',
          name: 'books/category',
          components: {
            header: SimpleHeader,
            content: BookListContent,
            footer: CommonFooter
          },
          meta: {
            title: '阅读 | VBlog 创建你自己的博客'
          }
        },
        {
          path: 'timeline',
          name: 'timeline',
          components: {
            header: SimpleHeader,
            content: TimeLineContent,
            footer: CommonFooter
          },
          meta: {
            title: '时间轴 | VBlog 创建你自己的博客'
          }
        },
        // 消息通知
        {
          path: ':userName/notice',
          name: 'notice',
          redirect: ':userName/notice/like',
          components: {
            header: SimpleHeader,
            content: MyNoticeContent,
            footer: CommonFooter
          },
          children: [
            {
              path: 'like',
              name: 'like',
              component: LikeTable,
              meta: {
                title: '点赞通知 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'comment',
              name: 'comment',
              component: CommentTable,
              meta: {
                title: '评论通知 | VBlog 创建你自己的博客'
              }
            }
          ]

        },
        // 个人中心
        {
          path: ':userName/center',
          name: 'center',
          redirect: ':userName/center/userinfo',
          components: {
            header: SimpleHeader,
            content: MyCenterContent,
            footer: CommonFooter
          },
          children: [
            {
              path: 'userinfo',
              name: 'userinfo',
              component: UserInfo,
              meta: {
                title: '个人信息 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'collect',
              name: 'collect',
              component: CollectTable,
              meta: {
                title: '我的收藏 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'focus',
              name: 'focus',
              component: Focus,
              meta: {
                title: '我的关注 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'fans',
              name: 'fans',
              component: Fans,
              meta: {
                title: '我的粉丝 | VBlog 创建你自己的博客'
              }
            }
          ]

        },
        // 账号管理
        {
          path: ':userName/account',
          name: 'account',
          redirect: ':userName/account/password',
          components: {
            header: SimpleHeader,
            content: MyAccountContent,
            footer: CommonFooter
          },
          children: [
            {
              path: 'password',
              name: 'password',
              component: PassWord,
              meta: {
                title: '修改密码 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'email',
              name: 'email',
              component: Email,
              meta: {
                title: '修改邮箱 | VBlog 创建你自己的博客'
              }
            }
          ]

        },
        // 博客管理
        {
          path: ':userName/blog',
          name: 'myBlog',
          redirect: ':userName/blog/edit',
          components: {
            header: SimpleHeader,
            content: MyBlogContent,
            footer: CommonFooter
          },
          children: [
            {
              path: 'edit',
              name: 'edit',
              component: ArticleAddOrUpdate,
              meta: {
                title: '博客编辑 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'category',
              name: 'category',
              component: Category,
              meta: {
                title: '博客分类 | VBlog 创建你自己的博客'
              }
            },
            {
              path: 'blogSet',
              name: 'blogSet',
              component: BlogSet,
              meta: {
                title: '博客设置 | VBlog 创建你自己的博客'
              }
            }
          ]

        },
        {
          path: 'notice/:noticeId',
          name: 'webNotice',
          components: {
            header: SimpleHeader,
            content: WebNoticeContent,
            footer: CommonFooter
          }
        }
      ]
    }
  ]
})

// 配置加载进度条
LoadingBar.config({
  color: '#5cb85c',
  failedColor: '#f0ad4e',
  height: 2
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to, from, next) => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
