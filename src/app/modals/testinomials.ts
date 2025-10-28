import mongoose, { Schema, Document, Model } from "mongoose";

export interface ITestimonial extends Document {
  name: string;
  program: string;
  feedback: string;
  image: string;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: String,
    program: String,
    feedback: String,
    image: String,
  },
  { timestamps: true }
);

export default (mongoose.models.Testimonial as Model<ITestimonial>) ||
  mongoose.model<ITestimonial>("Testimonial", TestimonialSchema);
