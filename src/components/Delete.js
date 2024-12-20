"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const Delete = ({ movieId }) => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleRemove = async () => {
    try {
      if (!session?.user?.email) {
        console.error("User email not found");
        return;
      }

      const res = await fetch(
        `http://localhost:3000/api/favourites?email=${session.user.email}&movieId=${movieId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        console.log("Movie removed successfully");
      } else {
        console.error("Failed to remove movie");
      }
      console.log(`Deleting movie with ID: ${movieId}`);
      setIsModalOpen(false); // Close the modal after successful delete
    } catch (error) {
      console.error("Error removing movie:", error);
    }
  };

  return (
    <div>
      <div
        className="flex justify-center border border-gray-500 border-opacity-35 cursor-pointer"
        onClick={() => setIsModalOpen(true)} // Open the modal
      >
        <h1 className="text-gray-500 p-1.5">Remove</h1>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-black border border-gray-500 border-opacity-35 rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-white/70">
              Are you sure you want to delete this item?
            </h2>
            <p className="text-gray-500 mt-2">This action cannot be undo !!</p>
            <div className="mt-6 flex justify-end space-x-4">
              {/* Cancel Button */}
              <button
                className="px-4 py-2 text-gray-500 border border-gray-600 rounded-lg hover:bg-white/70 hover:text-black"
                onClick={() => setIsModalOpen(false)} // Close the modal
              >
                Cancel
              </button>
              {/* Delete Button */}
              <button
                className="px-4 py-2 bg-red-600 bg-opacity-60 text-white/80 rounded-lg hover:bg-red-600"
                onClick={handleRemove}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Delete;
