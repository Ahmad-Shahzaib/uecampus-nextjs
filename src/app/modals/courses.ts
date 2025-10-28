import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICourse extends Document {
  title: string;
  description: string;
  image: string;
  link: string;
}

const CourseSchema = new Schema<ICourse>(
  {
    title: String,
    description: String,
    image: String,
    link: String,
  },
  { timestamps: true }
);

export default (mongoose.models.Course as Model<ICourse>) ||
  mongoose.model<ICourse>("Course", CourseSchema);
