import { HashRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './components/BlogPost'

function App(): React.ReactElement {
  return (
    // Because GitHub pages does not support single page app routing,
    // we use HashRouter to enable client-side routing with hash-based URLs.
    // Otherwise we run into 404 errors when refreshing or directly accessing nested routes.
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App
