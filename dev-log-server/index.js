const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 4000;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

// middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

const uri = `mongodb+srv://${process.env.user}:${process.env.pass}@cluster0.tb32okz.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
async function run() {
	try {
		const database = client.db('devlogdb');
		const articlesCollection = database.collection('Articles');
		const usersCollection = database.collection('users');
		const commentCollection = database.collection('comments');
		//get all articles
		app.get('/articles', async (req, res) => {
			console.log(req.query)
			const cursor = articlesCollection.find(req.query);
			const articles = await cursor.toArray();
			res.send(articles);
		});
		// get an article by id
		app.get('/articles/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const singleArticle = await articlesCollection.findOne(query);
			res.send(singleArticle);
		});
		// get my article by author email
		app.get('/my-articles/:email', async (req, res) => {
			const email = req.params.email;
			const query = { email: `${email}` };

			try {
				const result = await articlesCollection.find(query).toArray();
				res.send(result);
			} catch (error) {
				res.status(404).json({ msg: 'error' });
			}
		});
		//add an article // POST
		app.post('/articles', async (req, res) => {
			console.log('post api called');
			req.body.votes = [];
			const article = req.body;
			try {
				const articleResult = await articlesCollection.insertOne(
					article
				);
				article._id = articleResult.insertedId;
				res.send(article);
			} catch (error) {
				res.status(404).json({ msg: 'error' });
			}
		});
		// Update an Article
		app.put('/article/:id', async (req, res) => {
			console.log('update api called');
			const id = req.params.id;
			const updatedArticle = req.body;
			const filter = { _id: ObjectId(id) };
			const options = { upsert: true };
			const updateDoc = {
				$set: {
					title: updatedArticle.title,
					description: updatedArticle.description,
					category: updatedArticle.category,
					img: updatedArticle.img,
				},
			};
			try {
				const result = await articlesCollection.updateOne(
					filter,
					updateDoc,
					options
				);
				res.json(result);
			} catch (error) {
				res.status(404).json({ msg: 'error' });
			}
		});
		// Delete an article by id
		app.delete('/article/:id', async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await articlesCollection.deleteOne(query);
			console.log('Deleted', result);
			res.json(result);
		});
		// posting user information
		app.post('/users', async (req, res) => {
			const user = req.body;
			const result = await usersCollection.insertOne(user);
			res.send(result);
		});
		// xcm
		// sending available comments for a particular article
		app.get('/comments/:articleId', async (req, res) => {
			// now getting all the comments of the feature request post

			const { articleId } = req.params;
			const cursor = commentCollection.find({
				articleId,
			});

			const comments = await cursor.toArray();

			res.send(comments);
		});
		// storing client comment
		app.post('/addcomment', async (req, res) => {
			const comment = req.body;

			const result = await commentCollection.insertOne(req.body);

			res.send(result);
		});
		// updating voteCounts
		app.put('/updatevotes', async (req, res) => {
			const { article_id, newVotes } = req.body;

			const filter = { _id: ObjectId(article_id) };

			const updateVotes = {
				$set: {
					votes: newVotes,
				},
			};

			const result = await articlesCollection.updateOne(
				filter,
				updateVotes
			);

			res.send(result);
		});

		// storing user signed in with google
		app.put('/adduser', async (req, res) => {
			const user = req.body;

			const filter = { email: user.email };
			const options = { upsert: true };
			const updateUser = { $set: user };
			const result = await usersCollection.updateOne(
				filter,
				updateUser,
				options
			);

			res.json(result);
		});
		// deleting comment from collection
		app.delete('/comment/:_id', async (req, res) => {
			const { _id } = req.params;

			const query = { _id: ObjectId(_id) };

			const result = await commentCollection.deleteOne(query);

			res.send(result);
		});
	} finally {
	}
}
run().catch(console.dir);

app.get('/', (req, res) => {
	res.send('Server for devlog running');
});

app.listen(port, () => {
	console.log(`listening at ${port}`);
});
