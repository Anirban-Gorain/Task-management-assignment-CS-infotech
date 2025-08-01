import React from "react";
import { Link } from "react-router-dom";
import { MdLockOutline } from "react-icons/md";

export const UnauthorizedAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        <div className="flex justify-center mb-4">
          <MdLockOutline className="text-red-500 text-6xl" />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Unauthorized Access
        </h2>
        <p className="text-gray-600 mb-6">
          You don’t have permission to view this page.
        </p>
      </div>
    </div>
  );
};
