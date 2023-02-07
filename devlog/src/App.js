import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import ArticleList from './pages/ArticleList/ArticleList';
import SingleArticle from './pages/SingleArticle/SingleArticle';
import { Login } from './components/Login/Login';
import AddArticle from './components/AddArticle/AddArticle';
import MyArticles from './pages/MyArticles/MyArticles';
import RequireAuth from './components/RequireAuth/RequireAuth';
import UpdateArticle from './components/UpdateArticle/UpdateArticle';
import NotFound from './components/NotFound/NotFound';
import UserProfile from './components/UserProfile/UserProfile';
import AuthorArticles from './components/AuthorArticles/AuthorArticles';
import Dashboard from './components/Dashboard/Dashboard';

// import RequireAuth from './components/RequireAuth/RequireAuth';
// import app from './Firebase/Firebase.init';
// import { getAuth } from 'firebase/auth';

// const auth = getAuth(app);

// rafce - to build react component
// alt + esc - for suggestions
function App() {
	return (
			<Router>
				<Routes>
					<Route path='/' element={<Home />} />
					<Route path='/home' element={<Home />} />

					<Route path='/article-list' element={<ArticleList />} />

					<Route
						path='/add-article'
						element={
							<RequireAuth>
								<AddArticle />
							</RequireAuth>
						}
					/>

					<Route
						path='/my-articles/'
						element={
							<RequireAuth>
								<MyArticles />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<Login />} />

					<Route
						path='/article-list/:id'
						element={<SingleArticle />}
					/>
					<Route
						path='/article-list/:id'
						element={<SingleArticle />}
					/>
					<Route
						path='/author-articles/:email'
						element={<AuthorArticles></AuthorArticles>}
					/>
					<Route
						path='/update-article/:id'
						element={<UpdateArticle />}
					/>
					<Route
						path='/user-profile'
						element={<RequireAuth><UserProfile></UserProfile></RequireAuth>}
					/>
					<Route
						path='/dashboard/*'
						element={<RequireAuth><Dashboard></Dashboard></RequireAuth>}
					/>
					{/* <Route path='*' element={<NotFound />} /> */}
				</Routes>
			</Router>
	);
}

export default App;
