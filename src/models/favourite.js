import mongoose from 'mongoose';

const favouriteSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    moviePoster: {
      type: String,
      required: true,
    },
    movieTitle: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// favouriteSchema.index({ email: 1, movieId: 1 }, { unique: true });

const Favourite = mongoose.models.Favourite || mongoose.model('Favourite', favouriteSchema);

export default Favourite;
