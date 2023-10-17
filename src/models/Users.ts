import bcrypt, { compareSync, hashSync } from "bcryptjs";
import mongoose, { Schema, model } from "mongoose";
import { IUserMongooseModel, UserMongooseDocument } from "../types";

// Schema
const userSchema: Schema = new Schema<UserMongooseDocument, IUserMongooseModel>({
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
	transform: (_, obj: UserMongooseDocument) => {
		delete obj.password;
		return obj;
	},
});
userSchema.set("toObject", {
	virtuals: true,
	transform: (_, obj: UserMongooseDocument) => {
		delete obj.password;
		return obj;
	},
});

// Statics

userSchema.static("getByUsername", async function (username: string) {
	return await this.findOne({ username });
});

// Indexes
userSchema.index({ username: 1 });

export default model<UserMongooseDocument, IUserMongooseModel>("User", userSchema);
