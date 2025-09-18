"use client"

import { DeleteBlog, getAllBlog } from "@/Services/Blogs"
import type { TBlog } from "@/types"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Trash2Icon } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"

const ManageBlogPage = () => {
  const [blogs, setBlogs] = useState<{ data: TBlog[] } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogsData = await getAllBlog()
        setBlogs(blogsData)
      } catch (error) {
        toast.error("Failed to fetch blogs")
        console.log(error);
      } finally {
        setIsLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const handleDelete = async (id: string) => {
    const data = { id: id }

    try {
      setIsDeleting(true)
      const result = await DeleteBlog(data)

      if (result?.success) {
        toast.success(result.message || "Blog deleted successfully")
        // Update the blogs list after successful deletion
        setBlogs((prevBlogs) => {
          if (!prevBlogs) return null
          return {
            ...prevBlogs,
            data: prevBlogs.data.filter((blog) => blog._id !== id),
          }
        })
      } else {
        toast.error(result?.message || "Failed to delete blog")
      }
    } catch (error) {
      toast.error("An error occurred while deleting the blog")
      console.log(error);
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Card className="w-full shadow-md">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">Manage Your Blogs</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse">Loading blogs...</div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="w-[200px]">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                
                {blogs?.data?.map((blog: TBlog) => (
                  <TableRow key={blog?._id}>
                    <TableCell>
                      <div className="h-24 w-24 rounded-md overflow-hidden">
                        <Image
                          src={blog.image || "/placeholder.svg"}
                          alt={blog.title}
                          width={96}
                          height={96}
                          className="object-cover w-full h-full"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{blog?.title}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                       
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="sm">
                              <Trash2Icon className="h-4 w-4 mr-1" />
                              Delete
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(blog?._id)}
                                disabled={isDeleting}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                {isDeleting ? "Deleting..." : "Delete"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ManageBlogPage
