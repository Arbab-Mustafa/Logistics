"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TextManager from "@/components/text-manager"
import ImageManager from "@/components/image-component"
import VideoManager from "@/components/video-manager"

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Content Management System</h1>

      <Tabs defaultValue="text" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="text">Text Content</TabsTrigger>
          <TabsTrigger value="image">Image Content</TabsTrigger>
          <TabsTrigger value="video">Video Content</TabsTrigger>
        </TabsList>

        <TabsContent value="text">
          <Card>
            <CardHeader>
              <CardTitle>Text Management</CardTitle>
              <CardDescription>Create, view, update, and delete text content.</CardDescription>
            </CardHeader>
            <CardContent>
              <TextManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="image">
          <Card>
            <CardHeader>
              <CardTitle>Image Management</CardTitle>
              <CardDescription>Create, view, update, and delete image content.</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video Management</CardTitle>
              <CardDescription>Create, view, update, and delete video content.</CardDescription>
            </CardHeader>
            <CardContent>
              <VideoManager />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
