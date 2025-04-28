"use client";
import  { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SidebarProvider } from "@/components/ui/sidebar";
import { User, Save, Camera, X, Mail, Phone, MapPin, Globe, Twitter, Instagram, UserCheck, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { SessionProvider, useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from 'next/image';
import React from 'react';

// Expanded profile data type to match extended features
type ProfileData = {
  name: string;
  email: string;
  url?: string; // url for profilePic
  phone?: string;
  location?: string;
  website?: string;
  twitter?: string;
  instagram?: string;
  bio?: string;
};

const ProfileContent = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log("Profile", profile);
  }, [profile]);
  // Use next-auth session
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email ?? "";

  // Fetch profile data
  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      // Redirect to login if no session
      router.push('/login');
      return;
    }

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`/api/profile?email=${encodeURIComponent(userEmail)}`);
        if (!res.ok) throw new Error('Failed to fetch profile');
        const data = await res.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile data");
        // Set default profile values if fetch fails
        setProfile({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          url: session?.user?.image || "",
          phone: "",
          location: "",
          website: "",
          twitter: "",
          instagram: "",
          bio: ""
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail, session, status, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!profile) return;
    const { name, value } = e.target;
    setProfile(prev => prev ? { ...prev, [name]: value } : prev);
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      // Real API call to update profile
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });
      
      if (!res.ok) throw new Error('Failed to update profile');
      
      setIsEditing(false);
      setShowSavedMessage(true);
      toast.success('Profile updated successfully');
      
      setTimeout(() => {
        setShowSavedMessage(false);
      }, 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create FormData for image upload
    const formData = new FormData();
    formData.append('image', file);
    formData.append('email', userEmail);
    
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Failed to upload image');
      
      const data = await res.json();
      setProfile(prev => prev ? { ...prev, url: data.url } : prev);
      toast.success('Profile picture updated');
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload profile picture");
    }
  };

  // Loading state
  if (isLoading || status === 'loading') {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#0A0A0A] items-center justify-center">
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 text-green-500 animate-spin" />
            <span className="text-white mt-4">Loading profile...</span>
          </div>
        </div>
      </SidebarProvider>
    );
  }
  //Debug: log profile whenever it changes


  if (!profile) {
    return (
      <SidebarProvider>
        <div className="min-h-screen flex w-full bg-[#0A0A0A] items-center justify-center">
          <span className="text-white">No profile found</span>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-[#0A0A0A]">
        {/* Sidebar */} 
        <aside className="w-64 bg-[#1A1A1A] p-4 hidden md:block">
          <div className="flex items-center gap-2 mb-8">
          
                        <Image src={"/logo.jpg"} height={50} width={50} alt='text' className="h-6 w-6 text-green-500" />
            <h1 className="text-xl font-bold text-white">TJR</h1>
          </div>
          
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-all duration-200">
              Dashboard
            </Link>
            <Link href="/dashboard/orders" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-all duration-200">
              Orders
            </Link>
            <Link href="/dashboard/analytics" className="flex w-full items-center px-3 py-2 text-gray-300 hover:text-green-500 hover:bg-green-500/10 rounded-md transition-all duration-200">
              Analytics
            </Link>
            <Link href="/dashboard/profile" className="flex w-full items-center px-3 py-2 text-green-500 bg-green-500/10 rounded-md transition-all duration-200 font-medium">
              <UserCheck className="h-4 w-4 mr-2" /> Profile
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#0A0A0A]">
          <div className="flex justify-between items-center mb-8">
            <motion.h2 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              My Profile
            </motion.h2>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => isEditing ? handleSaveProfile() : setIsEditing(true)}
              disabled={isSaving}
              className={`px-4 py-2 rounded-md transition-all duration-200 flex items-center ${
                isEditing 
                  ? 'bg-green-500 text-white hover:bg-green-600' 
                  : 'border border-green-500 text-green-500 hover:bg-green-500/20'
              }`}
            >
              {isEditing ? (
                isSaving ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" /> Save Changes
                  </>
                )
              ) : (
                'Edit Profile'
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {showSavedMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg flex items-center z-50"
              >
                <UserCheck className="h-4 w-4 mr-2" /> Profile updated successfully!
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Profile Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="md:col-span-1"
            >
              <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl">
                <div className="flex flex-col items-center mb-6 relative">
                  <div className="relative group cursor-pointer">
                    {profile.url ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                      
                        src={profile.url}
                        alt="Profile"
                        className="h-24 w-24 rounded-full object-cover bg-green-500 ring-4 ring-[#121212]"
                      />
                    ) : (
                      <motion.div 
                        whileHover={{ scale: 1.05 }}
                        className="bg-green-500 h-24 w-24 rounded-full flex items-center justify-center ring-4 ring-[#121212]"
                      >
                        <User className="h-12 w-12 text-white" />
                      </motion.div>
                    )}
                    
                    {isEditing && (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                          <Camera className="h-6 w-6 text-white" />
                        </div>
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                      </>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-white mt-4">{profile.name}</h3>
                  <p className="text-gray-400 text-sm">{profile.email}</p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-300">
                    <Mail className="h-4 w-4 mr-2 text-green-500" />
                    <span>{profile.email}</span>
                  </div>
                  {profile.phone && (
                    <div className="flex items-center text-gray-300">
                      <Phone className="h-4 w-4 mr-2 text-green-500" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                  {profile.location && (
                    <div className="flex items-center text-gray-300">
                      <MapPin className="h-4 w-4 mr-2 text-green-500" />
                      <span>{profile.location}</span>
                    </div>
                  )}
                  {profile.website && (
                    <div className="flex items-center text-gray-300">
                      <Globe className="h-4 w-4 mr-2 text-green-500" />
                      <span>{profile.website}</span>
                    </div>
                  )}
                  {profile.twitter && (
                    <div className="flex items-center text-gray-300">
                      <Twitter className="h-4 w-4 mr-2 text-green-500" />
                      <span>{profile.twitter}</span>
                    </div>
                  )}
                  {profile.instagram && (
                    <div className="flex items-center text-gray-300">
                      <Instagram className="h-4 w-4 mr-2 text-green-500" />
                      <span>{profile.instagram}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Edit Form */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="md:col-span-2"
            >
              <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white mb-6">Profile Information</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-400">Full Name</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.name}
                      name="name"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Email</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.email}
                      name="email"
                      onChange={handleInputChange}
                      disabled={true} // Email usually cannot be changed
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Phone</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.phone || ""}
                      name="phone"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter your phone number" : "Not provided"}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Location</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.location || ""}
                      name="location"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Enter your location" : "Not provided"}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label className="text-gray-400">Bio</Label>
                    <Textarea
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200 h-32 resize-none`}
                      value={profile.bio || ""}
                      name="bio"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "Tell us about yourself..." : "No bio provided"}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Website</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.website || ""}
                      name="website"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "e.g. example.com" : "Not provided"}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Twitter</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.twitter || ""}
                      name="twitter"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "e.g. @username" : "Not provided"}
                    />
                  </div>
                  
                  <div>
                    <Label className="text-gray-400">Instagram</Label>
                    <Input
                      className={`bg-black/30 border ${isEditing ? 'border-gray-700 focus:border-green-500' : 'border-transparent'} text-white mt-2 transition-all duration-200`}
                      value={profile.instagram || ""}
                      name="instagram"
                      onChange={handleInputChange}
                      disabled={!isEditing}
                      placeholder={isEditing ? "e.g. @username" : "Not provided"}
                    />
                  </div>
                </div>
                
                {isEditing && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-end gap-4 mt-6"
                  >
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      className="border border-gray-600 text-gray-300 hover:bg-gray-700"
                      disabled={isSaving}
                    >
                      <X className="h-4 w-4 mr-2" /> Cancel
                    </Button>
                    <Button 
                      onClick={handleSaveProfile}
                      className="bg-green-500 text-white hover:bg-green-600"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" /> Save Changes
                        </>
                      )}
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
      
          </div>
      
        </main>
      </div>

    </SidebarProvider>
  );
};

const Profile = () => (
  <SessionProvider>
    <ProfileContent />
  </SessionProvider>
);

export default Profile;