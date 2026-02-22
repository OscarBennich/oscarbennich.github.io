import { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const Posts = lazy(() => import('./pages/Posts'))
const Post = lazy(() => import('./components/Post'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App(): React.ReactElement {
  return (
    // Because GitHub pages does not support single page app routing,
    // we use HashRouter to enable client-side routing with hash-based URLs.
    // Otherwise we run into 404 errors when refreshing or directly accessing nested routes.
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Suspense><Home /></Suspense>} />
          <Route path="about" element={<Suspense><About /></Suspense>} />
          <Route path="posts" element={<Suspense><Posts /></Suspense>} />
          <Route path="posts/:slug" element={<Suspense><Post /></Suspense>} />
          <Route path="*" element={<Suspense><NotFound /></Suspense>} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
