let express = require("express");
let bodyParser = require("body-parser");
let mongodb = require("mongodb");
let cors = require("cors");
let ObjectID = mongodb.ObjectID;

let POSTS_COLLECTION = "posts";
let USERS_COLLECTION = "users";
let COMMENTS_COLLECTION = "comments";

let app = express();
app.use(cors());
app.use(bodyParser.json());

let distDir = __dirname + "/dist/";
app.use(express.static(distDir));

let db;

/**
 * Connect to the database before starting the application server
 */
mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  db = client.db();
  console.log("Database connection ready");

  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log("App now running on port", port);
  });
});

/**
 * Generic error handler used by all endpoints.
 */
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

/**
 * GET: finds all posts
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

/**
 * POST: create a new post
 */
app.post("/api/posts", function (req, res) {
  let newPost = req.body;
  newPost.createDate = new Date().toLocaleString();

  if (!req.body.title) {
    handleError(res, "Invalid comment input", "Must provide a title.", 400);
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

/**
 * GET: find post by id
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

/**
 * PUT: update post by id
 */
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

/**
 * DELETE: delete post by id
 */
app.delete("/api/posts/:id", function (req, res) {
  db.collection(POSTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete post");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

/**
 * GET: find all users
 */
app.get("/api/users", function (req, res) {
  db.collection(USERS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/**
 * POST: create new user
 */
app.post("/api/users", function (req, res) {
  let newUser = req.body;
  newUser.registerDate = new Date().toLocaleString();
  newUser.supervisor = false;

  if (!req.body.username && !req.body.password) {
    handleError(res, "Invalid user input", "Must provide a username and password.", 400);
  } else {
    db.collection(USERS_COLLECTION).insertOne(newUser, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new user.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/**
 * PUT: update user by id
 */
app.put("/api/users/:id", function (req, res) {
  let updateUser = req.body;
  delete updateUser._id;

  db.collection(USERS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateUser, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateUser._id = req.params.id;
      res.status(200).json(updateUser);
    }
  });
});

/**
 * DELETE: delete user by id
 */
app.delete("/api/users/:id", function (req, res) {
  db.collection(USERS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});


/**
 * GET: finds all comments
 */
app.get("/api/comments", function (req, res) {
  db.collection(COMMENTS_COLLECTION).find({}).toArray(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get comments.");
    } else {
      res.status(200).json(docs);
    }
  });
});

/**
 * POST: create a new comment
 */
app.post("/api/comments", function (req, res) {
  let newComment = req.body;
  newComment.createDate = new Date().toLocaleString();

  if (!req.body.description) {
    handleError(res, "Invalid comment input", "Must provide a description.", 400);
  } else {
    db.collection(COMMENTS_COLLECTION).insertOne(newComment, function (err, doc) {
      if (err) {
        handleError(res, err.message, "Failed to create new comment.");
      } else {
        res.status(201).json(doc.ops[0]);
      }
    });
  }
});

/**
 * PUT: update comment by id
 */
app.put("/api/comments/:id", function (req, res) {
  let updateComment = req.body;
  delete updateComment._id;

  db.collection(COMMENTS_COLLECTION).replaceOne({_id: new ObjectID(req.params.id)}, updateComment, function (err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update comment");
    } else {
      updateComment._id = req.params.id;
      res.status(200).json(updateComment);
    }
  });
});

/**
 * DELETE: delete comment by id
 */
app.delete("/api/comments/:id", function (req, res) {
  db.collection(COMMENTS_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function (err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete comment");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});
