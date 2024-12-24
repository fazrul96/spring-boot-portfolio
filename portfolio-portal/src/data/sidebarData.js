import {
    ROUTE_COMPONENT,
    ROUTE_HOME,
    ROUTE_MEDIUM,
    ROUTE_MODULE,
    ROUTE_MOSQUE,
    ROUTE_OPENAPI,
    ROUTE_STORAGE,
    ROUTE_WEBTOON
} from '../constants/AppRoutes';
import {SIDEBAR_ICONS, SIDEBAR_TEXT} from '../constants/SidebarConstants';

export const publicSidebarItems = [
    { text: SIDEBAR_TEXT.public.dashboard, icon: SIDEBAR_ICONS.dashboard, route: ROUTE_HOME },
    { text: SIDEBAR_TEXT.public.medium, icon: SIDEBAR_ICONS.medium, route: ROUTE_MEDIUM },
    {
        text: SIDEBAR_TEXT.public.module,
        icon: SIDEBAR_ICONS.module,
        route: ROUTE_MODULE,
        children: [
            { text: SIDEBAR_TEXT.public.component, icon: SIDEBAR_ICONS.component, route: ROUTE_COMPONENT },
            { text: SIDEBAR_TEXT.public.mosque, icon: SIDEBAR_ICONS.mosque, route: ROUTE_MOSQUE },
        ],
    },
];

export const privateSidebarItems = [
    { text: SIDEBAR_TEXT.private.webtoon, icon: SIDEBAR_ICONS.webtoon, route: ROUTE_WEBTOON },
    { text: SIDEBAR_TEXT.private.storage, icon: SIDEBAR_ICONS.storage, route: ROUTE_STORAGE },
    { text: SIDEBAR_TEXT.private.openapi, icon: SIDEBAR_ICONS.openapi, route: ROUTE_OPENAPI },
];