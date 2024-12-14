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
import WebtoonChaptersPage from '../pages/WebtoonChaptersPage';
import WebtoonReaderPage from '../pages/WebtoonReaderPage';
import WebtoonPage from "../pages/WebtoonPage";
import MosquePage from "../pages/MosquePage";
import UserDetailsPage from "../components/section/mosque/UserDetailsPage";
import LogisticsPage from "../components/section/mosque/LogisticsPage";

export const publicRoutes = [
  { path: '/component', component: <ComponentPage /> },
  { path: '/medium', component: <MediumPage /> },
  { path: '/module', component: <ModulePage /> },
  { path: '/module/ocr', component: <OCRPage /> },
  { path: '/mosque', component: <MosquePage /> },
  { path: '/mosque/users', component: <UserDetailsPage /> },
  { path: '/mosque/logistic', component: <LogisticsPage /> },
//  { path: '/module/calendar', component: <CalendarPage /> },
];

export const protectedRoutes = [
  { path: '/profile', component: <ProfilePage /> },
  { path: '/settings', component: <SettingPage /> },
  { path: '/space', component: <SpacePage /> },
  { path: '/storage', component: <StoragePage /> },
  { path: '/openapi', component: <OpenApiPage /> },
  { path: '/webtoon', component: <WebtoonPage /> },
  { path: '/series/:title/chapters', component: <WebtoonChaptersPage /> },
  { path: '/series/:title/:chapter', component: <WebtoonReaderPage /> },
];