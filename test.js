function create(user, callback) {
  const bcrypt = require("bcrypt");
  const MongoClient = require("mongodb").MongoClient;
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(
    "mongodb+srv://Wanling:" +
      configuration.MANGO_PASSWORD +
      "@cluster0.0wi5e.mongodb.net/final_blog?retryWrites=true&w=majority",
    options
  );

  client.connect(function (err) {
    if (err) return callback(err);

    const db = client.db("final_blog");
    const users = db.collection("users");

    users.findOne({ email: user.email }, function (err, withSameMail) {
      if (err || withSameMail) {
        client.close();
        return callback(err || new Error("the user already exists"));
      }

      bcrypt.hash(user.password, 10, function (err, hash) {
        if (err) {
          client.close();
          return callback(err);
        }

        user.password = hash;
        user.email_verified = false;
        users.insert(user, function (err, inserted) {
          client.close();

          if (err) return callback(err);
          callback(null);
        });
      });
    });
  });
}
