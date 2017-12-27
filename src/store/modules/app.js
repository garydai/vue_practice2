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
    },
    mutations: {
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
    }
};

export default app;
