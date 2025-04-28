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

// Define the Text item type
interface TextItem {
  id: number
  title: string
  content: string
  createdAt?: string
  updatedAt?: string
}

export default function TextManager() {
  const [textItems, setTextItems] = useState<TextItem[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState<TextItem | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const { toast } = useToast()

  // Mock fetch function since we only have the update endpoint
  const fetchTextItems = async () => {
    // In a real app, you would fetch from an API endpoint
    // For demo purposes, we'll use localStorage to persist data
    try {
      const storedItems = localStorage.getItem("textItems")
      if (storedItems) {
        setTextItems(JSON.parse(storedItems))
      }
    } catch (error) {
      console.error("Error fetching text items:", error)
      toast({
        title: "Error",
        description: "Failed to load text items",
        variant: "destructive",
      })
    }
  }

  useEffect(() => {
    fetchTextItems()
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("textItems", JSON.stringify(textItems))
  }, [textItems])

  const handleCreate = async (newItem: Omit<TextItem, "id">) => {
    setLoading(true)
    try {
      // Generate a new ID (in a real app, this would come from the backend)
      const newId = textItems.length > 0 ? Math.max(...textItems.map((item) => item.id)) + 1 : 1

      const createdItem = {
        ...newItem,
        id: newId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      setTextItems([...textItems, createdItem])
      setIsCreateDialogOpen(false)

      toast({
        title: "Success",
        description: "Text item created successfully",
      })
    } catch (error) {
      console.error("Error creating text item:", error)
      toast({
        title: "Error",
        description: "Failed to create text item",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdate = async (updatedItem: TextItem) => {
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
          modelType: "Text",
          data: {
            title: updatedItem.title,
            content: updatedItem.content,
          },
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update text item")
      }

      // Update the local state
      setTextItems(
        textItems.map((item) =>
          item.id === updatedItem.id ? { ...updatedItem, updatedAt: new Date().toISOString() } : item,
        ),
      )

      setIsEditDialogOpen(false)
      setSelectedItem(null)

      toast({
        title: "Success",
        description: "Text item updated successfully",
      })
    } catch (error) {
      console.error("Error updating text item:", error)
      toast({
        title: "Error",
        description: "Failed to update text item",
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
      setTextItems(textItems.filter((item) => item.id !== id))

      toast({
        title: "Success",
        description: "Text item deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting text item:", error)
      toast({
        title: "Error",
        description: "Failed to delete text item",
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
            <Button>Create New Text</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Text</DialogTitle>
              <DialogDescription>Add a new text item to your collection.</DialogDescription>
            </DialogHeader>
            <CreateTextForm onSubmit={handleCreate} loading={loading} />
          </DialogContent>
        </Dialog>
      </div>

      {textItems.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No text items found. Create your first one!</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {textItems.map((item) => (
            <Card key={item.id}>
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{item.content}</p>
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
                    <Button   onClick={() => setSelectedItem(item)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Text</DialogTitle>
                      <DialogDescription>Make changes to your text item.</DialogDescription>
                    </DialogHeader>
                    {selectedItem && <EditTextForm item={selectedItem} onSubmit={handleUpdate} loading={loading} />}
                  </DialogContent>
                </Dialog>
                <Button   onClick={() => handleDelete(item.id)}>
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

interface CreateTextFormProps {
  onSubmit: (data: Omit<TextItem, "id">) => void
  loading: boolean
}

function CreateTextForm({ onSubmit, loading }: CreateTextFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, content })
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
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
            rows={5}
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

interface EditTextFormProps {
  item: TextItem
  onSubmit: (data: TextItem) => void
  loading: boolean
}

function EditTextForm({ item, onSubmit, loading }: EditTextFormProps) {
  const [title, setTitle] = useState(item.title)
  const [content, setContent] = useState(item.content)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ ...item, title, content })
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
          <Label htmlFor="edit-content">Content</Label>
          <Textarea
            id="edit-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Enter content"
            required
            rows={5}
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
