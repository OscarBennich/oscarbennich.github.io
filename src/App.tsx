import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Posts from './pages/Posts'
import Post from './components/Post'
import NotFound from './pages/NotFound'

function App(): React.ReactElement {
  return (
    // Because GitHub pages does not support single page app routing,
    // we use HashRouter to enable client-side routing with hash-based URLs.
    // Otherwise we run into 404 errors when refreshing or directly accessing nested routes.
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="posts" element={<Posts />} />
          <Route path="posts/:slug" element={<Post />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
