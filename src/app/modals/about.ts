import mongoose, { Schema, Document, Model } from "mongoose";

export interface IAbout extends Document {
  title: string;
  description: string;
  image: string;
}

const AboutSchema = new Schema<IAbout>(
  {
    title: String,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default (mongoose.models.About as Model<IAbout>) ||
  mongoose.model<IAbout>("About", AboutSchema);
