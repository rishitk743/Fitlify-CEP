import React, { useState } from "react";

const FitlifyApp = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [exerciseProgress, setExerciseProgress] = useState(60);
  const [dietProgress, setDietProgress] = useState(40);
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "Rahul Sharma",
    age: 24,
    weight: 72,
    height: 175,
    bmi: 23.5,
    goal: "Build Lean Muscle",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const calculateBMI = (weight, height) => {
    const hInMeters = height / 100;
    return (weight / (hInMeters * hInMeters)).toFixed(1);
  };

  const saveUserInfo = () => {
    setUserInfo({
      ...userInfo,
      bmi: calculateBMI(userInfo.weight, userInfo.height),
    });
    setIsEditing(false);
  };

  const [posts, setPosts] = useState([
    { id: 1, user: "Aman", content: "Completed my morning run today!", type: "text" },
    { id: 2, user: "Priya", content: "Tried a new salad recipe!", type: "text" },
  ]);

  const [stories, setStories] = useState([
    { id: 1, user: "Ravi", content: "Early morning yoga session!", type: "text" },
    { id: 2, user: "Sneha", content: "Completed 10k steps today!", type: "text" },
  ]);

  const [newPost, setNewPost] = useState("");
  const [newImage, setNewImage] = useState(null);
  const [newStory, setNewStory] = useState("");
  const [newStoryFile, setNewStoryFile] = useState(null);
  const [activeStory, setActiveStory] = useState(null);

  const addPost = (type = "text") => {
    if (type === "text" && newPost.trim() === "") return;
    if (type === "image" && !newImage) return;

    const post = {
      id: posts.length + 1,
      user: "You",
      content: type === "text" ? newPost : URL.createObjectURL(newImage),
      type,
    };
    setPosts([post, ...posts]);
    setNewPost("");
    setNewImage(null);
  };

  const addStory = (type = "text") => {
    if (type === "text" && newStory.trim() === "") return;
    if (type !== "text" && !newStoryFile) return;

    const story = {
      id: stories.length + 1,
      user: "You",
      content: type === "text" ? newStory : URL.createObjectURL(newStoryFile),
      type,
    };
    setStories([story, ...stories]);
    setNewStory("");
    setNewStoryFile(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      {/* Tabs */}
      <div className="flex justify-center mb-6 border-b border-gray-300 dark:border-gray-600">
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "dashboard" ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 font-semibold ${activeTab === "community" ? "border-b-2 border-blue-500 text-blue-500 dark:text-blue-400" : "text-gray-700 dark:text-gray-300"}`}
          onClick={() => setActiveTab("community")}
        >
          Community
        </button>
      </div>

      {/* Dashboard */}
      {activeTab === "dashboard" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Personalized Dashboard</h2>

          {/* User Info */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-lg">User Information</h3>
              {!isEditing ? (
                <button className="px-3 py-1 border rounded border-blue-500 text-blue-500 dark:text-blue-400" onClick={() => setIsEditing(true)}>Edit</button>
              ) : (
                <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={saveUserInfo}>Save</button>
              )}
            </div>
            {!isEditing ? (
              <div className="space-y-1">
                <p>Name: {userInfo.name}</p>
                <p>Age: {userInfo.age}</p>
                <p>Weight: {userInfo.weight} kg</p>
                <p>Height: {userInfo.height} cm</p>
                <p>BMI: {userInfo.bmi}</p>
                <p>Goal: {userInfo.goal}</p>
              </div>
            ) : (
              <div className="space-y-2">
                <input className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200" name="name" value={userInfo.name} onChange={handleInputChange} placeholder="Name" />
                <input className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200" type="number" name="age" value={userInfo.age} onChange={handleInputChange} placeholder="Age" />
                <input className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200" type="number" name="weight" value={userInfo.weight} onChange={handleInputChange} placeholder="Weight (kg)" />
                <input className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200" type="number" name="height" value={userInfo.height} onChange={handleInputChange} placeholder="Height (cm)" />
                <input className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200" name="goal" value={userInfo.goal} onChange={handleInputChange} placeholder="Goal" />
              </div>
            )}
          </div>

          {/* Exercise */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">Today's Exercise</h3>
            <p>30 mins of HIIT</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 mt-2">
              <div className="bg-blue-500 h-3 rounded" style={{ width: `${exerciseProgress}%` }}></div>
            </div>
            <p className="text-sm mt-1">{exerciseProgress}% completed</p>
          </div>

          {/* Diet */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4">
            <h3 className="font-semibold mb-2">Today's Diet</h3>
            <p>Balanced meals with proteins, carbs, and veggies</p>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded h-3 mt-2">
              <div className="bg-green-500 h-3 rounded" style={{ width: `${dietProgress}%` }}></div>
            </div>
            <p className="text-sm mt-1">{dietProgress}% completed</p>
          </div>

          {/* Suggestions */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4">
            <h3 className="font-semibold mb-2">Personalized Suggestions</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Drink 2.5L of water</li>
              <li>Take 5-min walk breaks</li>
              <li>Sleep at least 7–8 hours</li>
            </ul>
          </div>
        </div>
      )}

      {/* Community */}
      {activeTab === "community" && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Community Feed</h2>

          {/* Stories */}
          <div className="flex gap-4 overflow-x-auto mb-4">
            {stories.map((story) => (
              <div key={story.id} onClick={() => setActiveStory(story)} className="flex flex-col items-center cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center font-bold text-lg text-gray-700 dark:text-gray-200">
                  {story.user[0]}
                </div>
                <p className="text-sm mt-1">{story.user}</p>
              </div>
            ))}
          </div>

          {/* New Post */}
          <div className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-4 space-y-2">
            <textarea
              className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200"
              rows={3}
              placeholder="Share your progress..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} className="dark:text-gray-200"/>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => addPost("text")}>Text Post</button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => addPost("image")}>Image Post</button>
            </div>

            <textarea
              className="border p-2 rounded w-full dark:bg-gray-700 dark:text-gray-200"
              rows={2}
              placeholder="Add a story..."
              value={newStory}
              onChange={(e) => setNewStory(e.target.value)}
            />
            <input type="file" accept="image/*,video/*" onChange={(e) => setNewStoryFile(e.target.files[0])} className="dark:text-gray-200"/>
            <button className="px-3 py-1 border border-blue-500 text-blue-500 dark:text-blue-400 rounded mt-1" onClick={() => addStory(newStoryFile ? "media" : "text")}>
              Add Story
            </button>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-white dark:bg-gray-800 shadow rounded p-4 mb-2">
              <p className="font-semibold">{post.user}</p>
              {post.type === "text" ? (
                <p>{post.content}</p>
              ) : (
                <img src={post.content} alt="post" className="w-full rounded mt-2" />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Story Modal */}
      {activeStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded p-4 w-full max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-700 dark:text-gray-300" onClick={() => setActiveStory(null)}>✕</button>
            <h3 className="font-semibold mb-2">{activeStory.user}</h3>
            {activeStory.type === "text" ? (
              <p>{activeStory.content}</p>
            ) : (
              <img src={activeStory.content} alt="story" className="w-full rounded" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FitlifyApp;
