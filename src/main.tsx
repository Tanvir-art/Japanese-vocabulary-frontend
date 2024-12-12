import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login.tsx'
import Signup from './pages/Signup.tsx'
import AdminPanel from './pages/admin/adminPanel.tsx'
import AdminHome from './pages/admin/adminHome.tsx'
import UserManagement from './pages/admin/UserManagement.tsx'
import ManageLessons from './pages/admin/ManageLesson.tsx'
import ManageVocabularies from './pages/admin/ManageVocabulary.tsx'
import HomePage from './pages/User/Homepage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx'
import LessonPage from './pages/User/LessonPage.tsx'

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: "/lessons",
        element: <ProtectedRoute role="user"> <LessonPage /> </ProtectedRoute>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <AdminPanel />
    ,
    children: [
      {
        path: '/dashboard',
        element: <ProtectedRoute role="admin"> <AdminHome /> </ProtectedRoute>
      },
      {
        path: '/dashboard/usersManagement',
        element: <UserManagement />
      },
      {
        path: '/dashboard/manageLessons',
        element: <ManageLessons />
      },
      {
        path: '/dashboard/vocabularyManagement',
        element: <ManageVocabularies />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />

    </Provider>
  </StrictMode>
)
