# ccfront

> Frontend project for Conference Center.

## Build Setup

``` bash
# install dependencies
# npm install
# 除非要新增包，否则加--no-save
npm install --no-save

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 目录规范

src/components下放置所有的页面组件，每个页面形成一个文件夹，页面主文件命名为Main.vue，比如
src/components/Index
src/components/Index/Main.vue
src/components/Index/ConferenceItem.vue
src/components/Index/PaperItem.vue

src/include下放置所有跨页面共享元素，可以为单文件或者文件夹，比如
src/include/NavBar.vue
src/include/Modal
src/include/Modal/Main.vue
src/include/Modal/RichTextBox.vue

static下放置静态资源，访问形式为`src="/static/a.jpg"`，如果放在src/assets下，图片会被编为base64，避免
