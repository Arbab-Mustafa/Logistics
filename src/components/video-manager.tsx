"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Pencil, Trash } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

// Define the Video item type
interface VideoItem {
  id: number
  title: string
  url: string
  description?: string
  createdAt?: string
  updatedAt?: string
}

export default function VideoManager() {
  const [videoItems, setVideoItems] = useState<VideoItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<VideoItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock fetch function since we only have the update endpoint
  const fetchVideoItems = async () => {
    // In a real app, you would fetch from an API endpoint
    // For demo purposes, we'll use localStorage to persist data
    try {
      const storedItems = localStorage.getItem("videoItems")
      if (storedItems) {
        setVideoItems(JSON.parse(storedItems))
      }
    } catch (error) {
      console.error("Error fetching video items:", error)
      toast({
        title: "Error",
        description: "Failed to load video items",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchVideoItems()
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("videoItems", JSON.stringify(videoItems))
  }, [videoItems])

  const handleCreate = async (newItem: Omit<VideoItem, "id">) => {
    setLoading(true)
    try {
      // Generate a new ID (in a real app, this would come from the backend)
      const newId = videoItems.length > 0 ? Math.max(...videoItems.map((item) => item.id)) + 1 : 1

      const createdItem = {
        ...newItem,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setVideoItems([...videoItems, createdItem])
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Video item created successfully",
      })
    } catch (error) {
      console.error("Error creating video item:", error)
      toast({
        title: "Error",
        description: "Failed to create video item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updatedItem: VideoItem) => {
    setLoading(true)
    try {
      // Call the update API
      const response = await fetch("/updates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedItem.id.toString(),
          modelType: "Video",
          data: {
            title: updatedItem.title,
            url: updatedItem.url,
            description: updatedItem.description,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update video item")
      }

      // Update the local state
      setVideoItems(
        videoItems.map((item) =>
          item.id === updatedItem.id ? { ...updatedItem, updatedAt: new Date().toISOString() } : item,
        ),
      )

      setIsEditDialogOpen(false)
      setSelectedItem(null)

      toast({
        title: "Success",
        description: "Video item updated successfully",
      })
    } catch (error) {
      console.error("Error updating video item:", error)
      toast({
        title: "Error",
        description: "Failed to update video item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    setLoading(true)
    try {
      // In a real app, you would call a delete API endpoint
      // For demo purposes, we'll just update the local state
      setVideoItems(videoItems.filter((item) => item.id !== id))

      toast({
        title: "Success",
        description: "Video item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting video item:", error)
      toast({
        title: "Error",
        description: "Failed to delete video item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Video</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Video</DialogTitle>
              <DialogDescription>Add a new video item to your collection.</DialogDescription>
            </DialogHeader>
            <CreateVideoForm onSubmit={handleCreate} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {videoItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No video items found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {videoItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video w-full overflow-hidden rounded-md">
                  <iframe src={item.url} title={item.title} className="h-full w-full" allowFullScreen />
                </div>
                {item.description && (
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog
                  open={isEditDialogOpen && selectedItem?.id === item.id}
                  onOpenChange={(open) => {
                    setIsEditDialogOpen(open)
                    if (!open) setSelectedItem(null)
                  }}
                >
                  <DialogTrigger asChild>
                    <Button  onClick={() => setSelectedItem(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Video</DialogTitle>
                      <DialogDescription>Make changes to your video item.</DialogDescription>
                    </DialogHeader>
                    {selectedItem && <EditVideoForm item={selectedItem} onSubmit={handleUpdate} loading={loading} />}
                  </DialogContent>
                </Dialog>
                <Button  onClick={() => handleDelete(item.id)}>
                  <Trash className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

interface CreateVideoFormProps {
  onSubmit: (data: Omit<VideoItem, "id">) => void
  loading: boolean
}

function CreateVideoForm({ onSubmit, loading }: CreateVideoFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, url, description })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="url">Video URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create
        </Button>
      </DialogFooter>
    </form>
  )
}

interface EditVideoFormProps {
  item: VideoItem
  onSubmit: (data: VideoItem) => void
  loading: boolean
}

function EditVideoForm({ item, onSubmit, loading }: EditVideoFormProps) {
  const [title, setTitle] = useState(item.title)
  const [url, setUrl] = useState(item.url)
  const [description, setDescription] = useState(item.description || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...item, title, url, description })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="edit-title">Title</Label>
          <Input
            id="edit-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="edit-url">Video URL</Label>
          <Input
            id="edit-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.youtube.com/embed/..."
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="edit-description">Description</Label>
          <Textarea
            id="edit-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            rows={3}
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save Changes
        </Button>
      </DialogFooter>
    </form>
  )
}
