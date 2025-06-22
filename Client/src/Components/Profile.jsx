import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router';
import { updateUserThunk } from '../store/slices/authSlice';

const Profile = () => {
  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const user = useSelector((state) => state.auth.value);

  const [userEditedData, setUserEditedData] = useState({
    fullName: user.fullName,
    password: '',
    avatar: '',
  });

  const handelUpdate = () => {
    dispatch(updateUserThunk(userEditedData));
    setUserEditedData({
      fullName: user.fullName,
      password: '',
      avatar: '',
    });
    setEditMode(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 px-4 py-10 relative">
      {/* Cross button */}
      <Link
        to="/"
        className="absolute top-6 right-6 text-green-700 text-2xl font-bold hover:text-green-900 transition"
      >
        ×
      </Link>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-extrabold text-green-700">User Profile</h2>
          <button
            onClick={() => setEditMode(!editMode)}
            className="text-sm bg-green-600 text-white px-4 py-1.5 rounded hover:bg-green-700 transition"
          >
            {editMode ? 'Close' : 'Edit'}
          </button>
        </div>

        {/* Profile Image */}
        <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden border-4 border-green-300">
          <img
            src={
              editMode && userEditedData.avatar
                ? URL.createObjectURL(userEditedData.avatar)
                : user?.avatar
            }
            alt="Profile"
            className="w-full h-full object-cover"
          />

          {editMode && !userEditedData.avatar && (
            <label
              htmlFor="avatar"
              className="absolute inset-0 flex items-center justify-center bg-green-600 bg-opacity-70 text-white text-sm cursor-pointer"
            >
              Upload +
              <input
                type="file"
                id="avatar"
                name="image"
                onChange={(e) =>
                  setUserEditedData((prev) => ({
                    ...prev,
                    avatar: e.target.files[0],
                  }))
                }
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* Info Display */}
        {!editMode ? (
          <div className="space-y-2 text-center">
            <p className="text-lg font-semibold text-green-800">
              {user.fullName}
            </p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Enter your full name"
              value={userEditedData.fullName}
              onChange={(e) =>
                setUserEditedData((prev) => ({
                  ...prev,
                  fullName: e.target.value,
                }))
              }
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <input
              type="email"
              value={user.email}
              className="w-full border border-green-300 px-3 py-2 rounded bg-gray-100 text-gray-500"
              readOnly
            />

            <input
              type="password"
              placeholder="New Password"
              onChange={(e) =>
                setUserEditedData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
              className="w-full border border-green-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-between mt-6">
              <button
                onClick={handelUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
