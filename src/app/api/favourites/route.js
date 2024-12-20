import { connectMongoDB } from "@/lib/mongodb";
import Favourite from "@/models/favourite";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, movieId, moviePoster, movieTitle } = await request.json();

    await connectMongoDB();

    const existingFavorite = await Favourite.findOne({ email, movieId });
    if (existingFavorite) {
      console.log("This movie is already in your favorites.");
      return NextResponse.json(
        { message: "This movie is already in your favorites." },
        { status: 404 } // Conflict
      );
    }

    await Favourite.create({ email, movieId, moviePoster, movieTitle });
    return NextResponse.json(
      { message: "Movie added to favorites!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/favourites:", error);
    return NextResponse.json(
      { message: "Failed to add movie to favorites." },
      { status: 500 }
    );
  }
}

export async function GET(request) {
    try {
      const email = request.nextUrl.searchParams.get("email"); // Retrieve the email from query params
      await connectMongoDB();
  
      if (!email) {
        return NextResponse.json(
          { message: "Email is required." },
          { status: 400 }
        );
      }
      const favouritesData = await Favourite.find({ email });
      return NextResponse.json({ favouritesData }, { status: 200 });
    } catch (error) {
      console.error("Error in GET /api/favourites:", error);
      return NextResponse.json(
        { message: "Failed to fetch favorites." },
        { status: 500 }
      );
    }
  }
  
  export async function DELETE(request) {
    try {
      const email = request.nextUrl.searchParams.get("email"); // Retrieve email
      const movieId = request.nextUrl.searchParams.get("movieId"); // Retrieve movieId
  
      if (!email || !movieId) {
        return NextResponse.json(
          { message: "Email and movieId are required." },
          { status: 400 }
        );
      }
  
      await connectMongoDB();
      const deleted = await Favourite.deleteOne({ email, movieId }); // Match both email and movieId
  
      if (!deleted.deletedCount) {
        return NextResponse.json({ message: "Movie not found" }, { status: 404 });
      }
  
      return NextResponse.json(
        { message: "Movie removed successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error deleting movie:", error);
      return NextResponse.json(
        { message: "Failed to delete movie." },
        { status: 500 }
      );
    }
  }