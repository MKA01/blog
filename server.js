let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let ObjectID = mongodb.ObjectID;

let POSTS_COLLECTION = "posts";

let app = express();
app.use(bodyParser.json());

// Create link to Angular build directory
let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool in your app.
let db;

// Connect to the database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  db = client.db();
  console.log("Database connection ready");

  // Initialize the app.
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
  });
});

// POSTS API ROUTES BELOW

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/*  "/api/posts"
 *    GET: finds all posts
 *    POST: creates a new post
 */

app.get("/api/posts", function (req, res) {
  db.collection(POSTS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get posts.");
    } else {
      res.status(200).json(docs);
    }
  });
});

app.post("/api/posts", function (req, res) {
  let newPost = req.body;
  newPost.createDate = new Date();

  if (!req.body.title) {
    handleError(res, "Invalid user input", "Must provide a title.", 400);
  } else {
    db.collection(POSTS_COLLECTION).insertOne(newPost, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new post.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/*  "/api/posts/:id"
 *    GET: find post by id
 *    PUT: update post by id
 *    DELETE: deletes post by id
 */

app.get("/api/posts/:id", function (req, res) {
  db.collection(POSTS_COLLECTION).findOne({_id: new ObjectID(req.params.id)}, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get post");
    } else {
      res.status(200).json(doc);
    }
  });
});

app.put("/api/posts/:id", function (req, res) {
  let updatePost = req.body;
  delete updatePost._id;

  db.collection(POSTS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updatePost, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update post");
    } else {
      updatePost._id = req.params.id;
      res.status(200).json(updatePost);
    }
  });
});

app.delete("/api/posts/:id", function (req, res) {
  db.collection(POSTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete post");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
