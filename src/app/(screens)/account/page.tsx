"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Grid, Bookmark, Settings } from "lucide-react";

const userProfile = {
  username: "jane_doe",
  fullName: "Jane Doe",
  avatarUrl: "/placeholder.svg?height=150&width=150&text=JD",
  bio: "📸 Photography enthusiast | 🌍 Travel lover | 🍳 Amateur chef",
  postsCount: 248,
  followersCount: 10500,
  followingCount: 562,
  isFollowing: false,
};

const posts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  imageUrl: `/placeholder.svg?height=300&width=300&text=Post%20${i + 1}`,
  likes: Math.floor(Math.random() * 1000),
  comments: Math.floor(Math.random() * 100),
}));

export default function InstagramProfile() {
  const [profile, setProfile] = useState(userProfile);
  const [userPosts, setUserPosts] = useState(posts);

  const handleFollowToggle = () => {
    setProfile((prev) => ({
      ...prev,
      isFollowing: !prev.isFollowing,
      followersCount: prev.isFollowing
        ? prev.followersCount - 1
        : prev.followersCount + 1,
    }));
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl ">
      <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
        <Avatar className="w-32 h-32 md:w-40 md:h-40">
          <AvatarImage src={profile.avatarUrl} alt={profile.username} />
          <AvatarFallback>
            {profile.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="md:ml-8 mt-4 md:mt-0 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center mb-4">
            <h1 className="text-2xl font-bold mr-4">{profile.username}</h1>
            <div className="flex mt-2 md:mt-0">
              <Button
                onClick={handleFollowToggle}
                variant={profile.isFollowing ? "outline" : "default"}
                className="mr-2"
              >
                {profile.isFollowing ? "Following" : "Follow"}
              </Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>
          <div className="flex justify-center md:justify-start space-x-8 mb-4">
            <span>
              <strong>{profile.postsCount}</strong> posts
            </span>
            <span>
              <strong>{profile.followersCount.toLocaleString()}</strong>{" "}
              followers
            </span>
            <span>
              <strong>{profile.followingCount.toLocaleString()}</strong>{" "}
              following
            </span>
          </div>
          <div>
            <h2 className="font-bold">{profile.fullName}</h2>
            <p className="mt-2">{profile.bio}</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">
            <Grid className="w-5 h-5 mr-2" /> Posts
          </TabsTrigger>
          <TabsTrigger value="saved">
            <Bookmark className="w-5 h-5 mr-2" /> Saved
          </TabsTrigger>
          <TabsTrigger value="tagged">
            <Settings className="w-5 h-5 mr-2" /> Tagged
          </TabsTrigger>
        </TabsList>
        <TabsContent value="posts">
          <div className="grid grid-cols-3 gap-1 md:gap-4">
            {userPosts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative group cursor-pointer rounded-lg overflow-hidden bg-white/10"
              >
                <img
                  src={post.imageUrl}
                  alt={`Post ${post.id}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                  <div className="text-white text-center">
                    <p className="flex items-center justify-center">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                      </svg>
                      {post.likes}
                    </p>
                    <p className="flex items-center justify-center mt-2">
                      <svg
                        className="w-6 h-6 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {post.comments}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <div className="text-center py-8">
            <p>Only you can see what you've saved</p>
          </div>
        </TabsContent>
        <TabsContent value="tagged">
          <div className="text-center py-8">
            <p>Photos and videos of you</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
