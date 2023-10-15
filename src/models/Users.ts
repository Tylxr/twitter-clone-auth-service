import { compareSync, hashSync } from "bcryptjs";
import { Schema, model } from "mongoose";
import { IUserDocument } from "src/types";

// Schema
const userSchema: Schema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
});

// Hooks
userSchema.pre("save", function (next) {
	if (this.isModified("password")) {
		this.password = hashSync(this.password);
	}
	next();
});

// Options
userSchema.set("toJSON", {
	virtuals: true,
	transform: (_, obj: IUserDocument) => {
		delete obj.password;
		return obj;
	},
});
userSchema.set("toObject", {
	virtuals: true,
	transform: (_, obj: IUserDocument) => {
		delete obj.Password;
		return obj;
	},
});

// Methods
userSchema.methods.comparePasswords = function (this: IUserDocument, password: string): boolean {
	return compareSync(password, this.Password);
};

// Indexes
// TODO

export default model("User", userSchema);
