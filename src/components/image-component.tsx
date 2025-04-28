"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
import Image from "next/image"

// Define the Image item type
interface ImageItem {
  id: number
  title: string
  url: string
  alt?: string
  createdAt?: string
  updatedAt?: string
}

export default function ImageManager() {
  const [imageItems, setImageItems] = useState<ImageItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<ImageItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock fetch function since we only have the update endpoint
  const fetchImageItems = async () => {
    // In a real app, you would fetch from an API endpoint
    // For demo purposes, we'll use localStorage to persist data
    try {
      const storedItems = localStorage.getItem("imageItems")
      if (storedItems) {
        setImageItems(JSON.parse(storedItems))
      }
    } catch (error) {
      console.error("Error fetching image items:", error)
      toast({
        title: "Error",
        description: "Failed to load image items",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchImageItems()
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("imageItems", JSON.stringify(imageItems))
  }, [imageItems])

  const handleCreate = async (newItem: Omit<ImageItem, "id">) => {
    setLoading(true)
    try {
      // Generate a new ID (in a real app, this would come from the backend)
      const newId = imageItems.length > 0 ? Math.max(...imageItems.map((item) => item.id)) + 1 : 1

      const createdItem = {
        ...newItem,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setImageItems([...imageItems, createdItem])
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Image item created successfully",
      })
    } catch (error) {
      console.error("Error creating image item:", error)
      toast({
        title: "Error",
        description: "Failed to create image item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updatedItem: ImageItem) => {
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
          modelType: "Image",
          data: {
            title: updatedItem.title,
            url: updatedItem.url,
            alt: updatedItem.alt,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update image item")
      }

      // Update the local state
      setImageItems(
        imageItems.map((item) =>
          item.id === updatedItem.id ? { ...updatedItem, updatedAt: new Date().toISOString() } : item,
        ),
      )

      setIsEditDialogOpen(false)
      setSelectedItem(null)

      toast({
        title: "Success",
        description: "Image item updated successfully",
      })
    } catch (error) {
      console.error("Error updating image item:", error)
      toast({
        title: "Error",
        description: "Failed to update image item",
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
      setImageItems(imageItems.filter((item) => item.id !== id))

      toast({
        title: "Success",
        description: "Image item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting image item:", error)
      toast({
        title: "Error",
        description: "Failed to delete image item",
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
            <Button>Create New Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Image</DialogTitle>
              <DialogDescription>Add a new image item to your collection.</DialogDescription>
            </DialogHeader>
            <CreateImageForm onSubmit={handleCreate} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {imageItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No image items found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {imageItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative h-40 w-full">
                  <Image
                    src={item.url || "/placeholder.svg?height=160&width=320"}
                    alt={item.alt || item.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
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
                    <Button     onClick={() => setSelectedItem(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Image</DialogTitle>
                      <DialogDescription>Make changes to your image item.</DialogDescription>
                    </DialogHeader>
                    {selectedItem && <EditImageForm item={selectedItem} onSubmit={handleUpdate} loading={loading} />}
                  </DialogContent>
                </Dialog>
                <Button    onClick={() => handleDelete(item.id)}>
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

interface CreateImageFormProps {
  onSubmit: (data: Omit<ImageItem, "id">) => void
  loading: boolean
}

function CreateImageForm({ onSubmit, loading }: CreateImageFormProps) {
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [alt, setAlt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, url, alt })
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
          <Label htmlFor="url">Image URL</Label>
          <Input
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="alt">Alt Text</Label>
          <Input id="alt" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Image description" />
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

interface EditImageFormProps {
  item: ImageItem
  onSubmit: (data: ImageItem) => void
  loading: boolean
}

function EditImageForm({ item, onSubmit, loading }: EditImageFormProps) {
  const [title, setTitle] = useState(item.title)
  const [url, setUrl] = useState(item.url)
  const [alt, setAlt] = useState(item.alt || "")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...item, title, url, alt })
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
          <Label htmlFor="edit-url">Image URL</Label>
          <Input
            id="edit-url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="edit-alt">Alt Text</Label>
          <Input id="edit-alt" value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Image description" />
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
