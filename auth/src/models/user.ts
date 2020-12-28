import mongoose from 'mongoose';

// An interface that decribes the properties
// required to create new user
interface UserAttr {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

// An interface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//IMP we will not user new User but use buildUser function to make effective use of TS
userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
