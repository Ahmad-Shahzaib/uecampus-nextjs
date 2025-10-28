import mongoose, { Schema, Document, Model } from "mongoose";

export interface IFaq extends Document {
  question: string;
  answer: string;
}

const FaqSchema = new Schema<IFaq>(
  {
    question: String,
    answer: String,
  },
  { timestamps: true }
);

export default (mongoose.models.Faq as Model<IFaq>) ||
  mongoose.model<IFaq>("Faq", FaqSchema);
