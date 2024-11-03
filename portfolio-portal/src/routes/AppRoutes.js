// Public Pages
import ComponentPage from '../pages/ComponentPage';
import MediumPage from '../pages/MediumPage';
import ModulePage from '../pages/ModulePage';
import OCRPage from '../pages/OCRPage';

// Protected Pages
import ProfilePage from '../pages/ProfilePage';
import SettingPage from '../pages/SettingPage';
import SpacePage from '../pages/SpacePage';
import StoragePage from '../pages/StoragePage';
import OpenApiPage from '../pages/OpenApiPage';
import BlogPage from '../pages/BlogPage';
import WebtoonChaptersPage from '../pages/WebtoonChaptersPage';
import WebtoonReaderPage from '../pages/WebtoonReaderPage';

export const publicRoutes = [
  { path: '/component', component: <ComponentPage /> },
  { path: '/medium', component: <MediumPage /> },
  { path: '/module', component: <ModulePage /> },
  { path: '/module/ocr', component: <OCRPage /> },
//  { path: '/module/calendar', component: <CalendarPage /> },
];

export const protectedRoutes = [
  { path: '/profile', component: <ProfilePage /> },
  { path: '/settings', component: <SettingPage /> },
  { path: '/space', component: <SpacePage /> },
  { path: '/storage', component: <StoragePage /> },
  { path: '/openapi', component: <OpenApiPage /> },
  { path: '/blog', component: <BlogPage /> },
  { path: '/series/:title/chapters', component: <WebtoonChaptersPage /> },
  { path: '/series/:title/:chapter', component: <WebtoonReaderPage /> },
];