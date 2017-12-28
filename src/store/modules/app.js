import {otherRouter, appRouter} from '@/router/router';

const app = {
    state: {
        menuList: [],
        routers: [
            otherRouter,
            ...appRouter
        ],
        currentPageName: '',
        currentPath: [
            {
                title: '首页',
                path: '',
                name: 'home_index'
            }
        ], // 面包屑数组
        openedSubmenuArr: [],
        tagsList: [...otherRouter.children],
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        cachePage: [],
        dontCache: ['text-editor', 'artical-publish'] // 在这里定义你不想要缓存的页面的name属性值(参见路由配置router.js)
    },
    mutations: {
        initCachepage (state) {
            if (localStorage.cachePage) {
                state.cachePage = JSON.parse(localStorage.cachePage);
            }
        },
        setTagsList (state, list) {
            console.log('tags')
            console.log(list)
            state.tagsList.push(...list);
        },
        updateMenulist (state) {
            state.menuList = appRouter;
        },
        setCurrentPath (state, pathArr) {
            state.currentPath = pathArr;
        },    
        addOpenSubmenu (state, name) {
            let hasThisName = false;
            let isEmpty = false;
            if (name.length === 0) {
                isEmpty = true;
            }
            if (state.openedSubmenuArr.indexOf(name) > -1) {
                hasThisName = true;
            }
            if (!hasThisName && !isEmpty) {
                state.openedSubmenuArr.push(name);
            }
        },
        setCurrentPageName (state, name) {
            state.currentPageName = name;
        },
        setOpenedList (state) {
            state.pageOpenedList = localStorage.pageOpenedList ? JSON.parse(localStorage.pageOpenedList) : [otherRouter.children[0]];
        },
        increateTag (state, tagObj) {
            // todo
            // if (!Util.oneOf(tagObj.name, state.dontCache)) {
            //     console.log('ww')
            //     state.cachePage.push(tagObj.name);
            //     console.log('xx')
            //     localStorage.cachePage = JSON.stringify(state.cachePage);
            // }
            state.pageOpenedList.push(tagObj);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
        pageOpenedList (state, get) {
            let openedPage = state.pageOpenedList[get.index];
            if (get.argu) {
                openedPage.argu = get.argu;
            }
            if (get.query) {
                openedPage.query = get.query;
            }
            state.pageOpenedList.splice(get.index, 1, openedPage);
            localStorage.pageOpenedList = JSON.stringify(state.pageOpenedList);
        },
    }
};

export default app;
