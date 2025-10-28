import mongoose, { Schema, Document, Model } from "mongoose";

export interface IHero extends Document {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  backgroundImage: string;
}

const HeroSchema = new Schema<IHero>(
  {
    title: String,
    subtitle: String,
    buttonText: String,
    buttonLink: String,
    backgroundImage: String,
  },
  { timestamps: true }
);

export default (mongoose.models.Hero as Model<IHero>) ||
  mongoose.model<IHero>("Hero", HeroSchema);
