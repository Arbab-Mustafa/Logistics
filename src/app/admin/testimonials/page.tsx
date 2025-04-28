// src/app/admin/content/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
  Tabs, TabsContent, TabsList, TabsTrigger
} from "@/components/ui/tabs";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2, Edit, Star, Video, FileText } from "lucide-react";
import { Navbarx } from "@/components/nav2bar";


interface Testimonial {
  id: number;
  author: string;
  role?: string;
  company?: string;
  content: string;
  rating: number;
  image?: string;
  featured: boolean;
  createdAt: string;
}

interface VideoContent {
  id: number;
  title: string;
  description: string;
  url: string;
  thumbnail?: string;
  category: string;
  duration: number;
  featured: boolean;
  createdAt: string;
}

export default function ContentManagement() {
  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isAddTestimonialOpen, setIsAddTestimonialOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [newTestimonial, setNewTestimonial] = useState<Partial<Testimonial>>({
    author: "",
    role: "",
    company: "",
    content: "",
    rating: 5,
    image: "",
    featured: false
  });
  
  // Videos state
  const [videos, setVideos] = useState<VideoContent[]>([]);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoContent | null>(null);
  const [newVideo, setNewVideo] = useState<Partial<VideoContent>>({
    title: "",
    description: "",
    url: "",
    thumbnail: "",
    category: "tutorial",
    duration: 0,
    featured: false
  });
  
  // Loading states
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [loadingVideos, setLoadingVideos] = useState(true);

  // Fetch testimonials
  const fetchTestimonials = async () => {
    setLoadingTestimonials(true);
    try {
      const response = await fetch('/api/admin/testimonials');
      const data = await response.json();
      
      if (response.ok) {
        setTestimonials(data);
      } else {
        console.error("Failed to fetch testimonials:", data.error);
      }
    } catch (error) {
      console.error("Error fetching testimonials:", error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  // Fetch videos
  const fetchVideos = async () => {
    setLoadingVideos(true);
    try {
      const response = await fetch('/api/admin/videos');
      const data = await response.json();
      
      if (response.ok) {
        setVideos(data);
      } else {
        console.error("Failed to fetch videos:", data.error);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoadingVideos(false);
    }
  };

  // Handle testimonial form input changes
  const handleTestimonialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewTestimonial({
      ...newTestimonial,
      [name]: type === "number" ? parseFloat(value) : value
    });
  };

  // Handle testimonial rating change
  const handleRatingChange = (value: string) => {
    setNewTestimonial({
      ...newTestimonial,
      rating: parseInt(value)
    });
  };

  // Handle testimonial featured toggle
  const handleTestimonialFeaturedToggle = () => {
    setNewTestimonial({
      ...newTestimonial,
      featured: !newTestimonial.featured
    });
  };

  // Handle testimonial form submission
  const handleSubmitTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = editingTestimonial 
        ? `/api/admin/testimonials/${editingTestimonial.id}` 
        : '/api/admin/testimonials';
      
      const method = editingTestimonial ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newTestimonial)
      });
      
      if (response.ok) {
        fetchTestimonials();
        setIsAddTestimonialOpen(false);
        setEditingTestimonial(null);
        setNewTestimonial({
          author: "",
          role: "",
          company: "",
          content: "",
          rating: 5,
          image: "",
          featured: false
        });
      } else {
        const error = await response.json();
        alert(`Failed to ${editingTestimonial ? 'update' : 'add'} testimonial: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error ${editingTestimonial ? 'updating' : 'adding'} testimonial:`, error);
      alert(`Failed to ${editingTestimonial ? 'update' : 'add'} testimonial`);
    }
  };

  // Delete testimonial
  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchTestimonials();
      } else {
        const error = await response.json();
        alert(`Failed to delete testimonial: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      alert("Failed to delete testimonial");
    }
  };

  // Edit testimonial
  const handleEditTestimonial = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setNewTestimonial({
      author: testimonial.author,
      role: testimonial.role || "",
      company: testimonial.company || "",
      content: testimonial.content,
      rating: testimonial.rating,
      image: testimonial.image || "",
      featured: testimonial.featured
    });
    setIsAddTestimonialOpen(true);
  };

  // Toggle testimonial featured status
  const handleToggleTestimonialFeatured = async (id: number, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !featured })
      });
      
      if (response.ok) {
        fetchTestimonials();
      } else {
        const error = await response.json();
        alert(`Failed to update testimonial status: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating testimonial status:", error);
      alert("Failed to update testimonial status");
    }
  };

  // Video management functions
  const handleVideoInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setNewVideo({
      ...newVideo,
      [name]: type === "number" ? parseFloat(value) : value
    });
  };

  const handleVideoCategoryChange = (value: string) => {
    setNewVideo({
      ...newVideo,
      category: value
    });
  };

  const handleVideoFeaturedToggle = () => {
    setNewVideo({
      ...newVideo,
      featured: !newVideo.featured
    });
  };

  const handleSubmitVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const endpoint = editingVideo 
        ? `/api/admin/videos/${editingVideo.id}` 
        : '/api/admin/videos';
      
      const method = editingVideo ? 'PUT' : 'POST';
      
      const response = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newVideo)
      });
      
      if (response.ok) {
        fetchVideos();
        setIsAddVideoOpen(false);
        setEditingVideo(null);
        setNewVideo({
          title: "",
          description: "",
          url: "",
          thumbnail: "",
          category: "tutorial",
          duration: 0,
          featured: false
        });
      } else {
        const error = await response.json();
        alert(`Failed to ${editingVideo ? 'update' : 'add'} video: ${error.message}`);
      }
    } catch (error) {
      console.error(`Error ${editingVideo ? 'updating' : 'adding'} video:`, error);
      alert(`Failed to ${editingVideo ? 'update' : 'add'} video`);
    }
  };

  const handleDeleteVideo = async (id: number) => {
    if (!confirm("Are you sure you want to delete this video?")) return;
    
    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        fetchVideos();
      } else {
        const error = await response.json();
        alert(`Failed to delete video: ${error.message}`);
      }
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video");
    }
  };

  const handleEditVideo = (video: VideoContent) => {
    setEditingVideo(video);
    setNewVideo({
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail || "",
      category: video.category,
      duration: video.duration,
      featured: video.featured
    });
    setIsAddVideoOpen(true);
  };

  const handleToggleVideoFeatured = async (id: number, featured: boolean) => {
    try {
      const response = await fetch(`/api/admin/videos/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ featured: !featured })
      });
      
      if (response.ok) {
        fetchVideos();
      } else {
        const error = await response.json();
        alert(`Failed to update video status: ${error.message}`);
      }
    } catch (error) {
      console.error("Error updating video status:", error);
      alert("Failed to update video status");
    }
  };

  // Format duration from seconds to MM:SS
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Parse duration from MM:SS to seconds
  const parseDuration = (duration: string) => {
    const [minutes, seconds] = duration.split(':').map(Number);
    return (minutes * 60) + (seconds || 0);
  };

  // Load data on component mount
  useEffect(() => {
    fetchTestimonials();
    fetchVideos();
  }, []);

  return (
    
      <div>
        <Navbarx />
        <h1 className="text-3xl font-bold mb-6">Content Management</h1>
        
        <Tabs defaultValue="testimonials" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <Star className="w-4 h-4" /> Testimonials
            </TabsTrigger>
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Video className="w-4 h-4" /> Videos
            </TabsTrigger>
          </TabsList>
          
          {/* Testimonials Tab */}
          <TabsContent value="testimonials">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Testimonials</h2>
              <Dialog open={isAddTestimonialOpen} onOpenChange={setIsAddTestimonialOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Testimonial
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingTestimonial ? "Edit Testimonial" : "Add New Testimonial"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitTestimonial} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="author">Author Name *</Label>
                      <Input 
                        id="author"
                        name="author"
                        value={newTestimonial.author}
                        onChange={handleTestimonialInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role"
                        name="role"
                        value={newTestimonial.role}
                        onChange={handleTestimonialInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company"
                        name="company"
                        value={newTestimonial.company}
                        onChange={handleTestimonialInputChange}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="content">Testimonial Content *</Label>
                      <Textarea 
                        id="content"
                        name="content"
                        value={newTestimonial.content}
                        onChange={handleTestimonialInputChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="rating">Rating</Label>
                      <Select 
                        value={newTestimonial.rating?.toString()} 
                        onValueChange={handleRatingChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 Star</SelectItem>
                          <SelectItem value="2">2 Stars</SelectItem>
                          <SelectItem value="3">3 Stars</SelectItem>
                          <SelectItem value="4">4 Stars</SelectItem>
                          <SelectItem value="5">5 Stars</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="image">Profile Image URL</Label>
                      <Input 
                        id="image"
                        name="image"
                        value={newTestimonial.image}
                        onChange={handleTestimonialInputChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newTestimonial.featured}
                        onChange={handleTestimonialFeaturedToggle}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="featured">Feature this testimonial</Label>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        type="button" 
                    
                        onClick={() => {
                          setIsAddTestimonialOpen(false);
                          setEditingTestimonial(null);
                          setNewTestimonial({
                            author: "",
                            role: "",
                            company: "",
                            content: "",
                            rating: 5,
                            image: "",
                            featured: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingTestimonial ? "Update" : "Add"} Testimonial
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {loadingTestimonials ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-16 bg-muted rounded-lg">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No testimonials yet</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Add your first testimonial to display on your website
                </p>
                <Button 
                  onClick={() => setIsAddTestimonialOpen(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" /> Add Testimonial
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id}>
                    <CardHeader className="flex flex-row items-start justify-between pb-2">
                      <div>
                        <CardTitle className="text-lg flex items-center gap-2">
                          {testimonial.author}
                          {testimonial.featured && (
                            <Badge variant="secondary" className="ml-2">Featured</Badge>
                          )}
                        </CardTitle>
                        {(testimonial.role || testimonial.company) && (
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}{testimonial.role && testimonial.company ? ", " : ""}{testimonial.company}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{testimonial.content}</p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button
                       
               
                        onClick={() => handleToggleTestimonialFeatured(testimonial.id, testimonial.featured)}
                      >
                        {testimonial.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                     
                          onClick={() => handleEditTestimonial(testimonial)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                     
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteTestimonial(testimonial.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          {/* Videos Tab */}
          <TabsContent value="videos">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Videos</h2>
              <Dialog open={isAddVideoOpen} onOpenChange={setIsAddVideoOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Add Video
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>
                      {editingVideo ? "Edit Video" : "Add New Video"}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmitVideo} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Video Title *</Label>
                      <Input 
                        id="title"
                        name="title"
                        value={newVideo.title}
                        onChange={handleVideoInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={newVideo.description}
                        onChange={handleVideoInputChange}
                        rows={3}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="url">Video URL *</Label>
                      <Input 
                        id="url"
                        name="url"
                        value={newVideo.url}
                        onChange={handleVideoInputChange}
                        placeholder="https://youtube.com/watch?v=..."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="thumbnail">Thumbnail URL</Label>
                      <Input 
                        id="thumbnail"
                        name="thumbnail"
                        value={newVideo.thumbnail}
                        onChange={handleVideoInputChange}
                        placeholder="https://example.com/thumbnail.jpg"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select 
                        value={newVideo.category} 
                        onValueChange={handleVideoCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tutorial">Tutorial</SelectItem>
                          <SelectItem value="demo">Demo</SelectItem>
                          <SelectItem value="testimonial">Video Testimonial</SelectItem>
                          <SelectItem value="webinar">Webinar</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration (MM:SS) *</Label>
                      <Input 
                        id="duration"
                        name="duration"
                        value={formatDuration(newVideo.duration || 0)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setNewVideo({
                            ...newVideo,
                            duration: parseDuration(value)
                          });
                        }}
                        placeholder="5:30"
                        required
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="videoFeatured"
                        checked={newVideo.featured}
                        onChange={handleVideoFeaturedToggle}
                        className="h-4 w-4"
                      />
                      <Label htmlFor="videoFeatured">Feature this video</Label>
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-4">
                      <Button 
                        type="button" 
                    
                        onClick={() => {
                          setIsAddVideoOpen(false);
                          setEditingVideo(null);
                          setNewVideo({
                            title: "",
                            description: "",
                            url: "",
                            thumbnail: "",
                            category: "tutorial",
                            duration: 0,
                            featured: false
                          });
                        }}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">
                        {editingVideo ? "Update" : "Add"} Video
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
            
            {loadingVideos ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : videos.length === 0 ? (
              <div className="text-center py-16 bg-muted rounded-lg">
                <Video className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">No videos yet</h3>
                <p className="text-muted-foreground mt-1 mb-4">
                  Add your first video to display on your website
                </p>
                <Button 
                  onClick={() => setIsAddVideoOpen(true)}
                  className="flex items-center gap-2 mx-auto"
                >
                  <Plus className="w-4 h-4" /> Add Video
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {videos.map((video) => (
                  <Card key={video.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      {video.thumbnail ? (
                        <img 
                          src={video.thumbnail} 
                          alt={video.title} 
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Video className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                        {formatDuration(video.duration)}
                      </div>
                      {video.featured && (
                        <Badge className="absolute top-2 left-2">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{video.title}</CardTitle>
                      <Badge variant="outline" className="mt-1 w-fit">
                        {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                      </Badge>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {video.description || "No description provided"}
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button
                       
               
                        onClick={() => handleToggleVideoFeatured(video.id, video.featured)}
                      >
                        {video.featured ? "Unfeature" : "Feature"}
                      </Button>
                      <div className="flex space-x-2">
                        <Button
                     
                          onClick={() => handleEditVideo(video)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                     
                          className="text-destructive hover:bg-destructive/10"
                          onClick={() => handleDeleteVideo(video.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
  
  );
}