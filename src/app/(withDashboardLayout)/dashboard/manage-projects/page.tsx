"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Loader2, PencilIcon, Trash2Icon } from "lucide-react"
import { DeleteProject, getAllProject } from "@/Services/Projects"
import type { TBlog } from "@/types"
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

const ManageProjectPage = () => {
  const [projects, setProjects] = useState<{ data: TBlog[] }>({ data: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  //   console.log(user);
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true)
        const projectsData = await getAllProject()
        setProjects(projectsData)
      } catch (err) {
        setError("Failed to load projects")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleDelete = async (id: string) => {
    // console.log(id);

    const data = { id: id }

    try {
      setIsDeleting(true)
      const result = await DeleteProject(data)

      if (result?.success) {
        toast.success(result.message || "Project deleted successfully")
      } else {
        toast.error(result?.message || "Failed to delete project")
      }
      setProjects((prevProjects) => ({
        ...prevProjects,
        data: prevProjects.data.filter((blog) => blog._id !== id),
      }))
    } catch (error) {
      toast.error("An error occurred while deleting the project")
      console.log(error);
    } finally {
      setIsDeleting(false)
    }
  }


  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle>Manage Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-6 text-destructive">{error}</div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projects.data && projects.data.length > 0 ? (
                    projects.data.map((project: TBlog) => (
                      <TableRow key={project?._id}>
                        <TableCell>
                          <div className="w-24 h-24 rounded-md overflow-hidden">
                            <Image
                              src={project.image || "/placeholder.svg"}
                              alt={project.title || "Project image"}
                              width={96}
                              height={96}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{project?.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button asChild variant="outline" size="sm">
                              <Link href={`/dashboard/update-project/${project?._id}`}>
                                <PencilIcon className="h-4 w-4 mr-1" />
                                Update
                              </Link>
                            </Button>
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
                                    This action cannot be undone. This will permanently delete the project.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(project?._id)}
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
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-6">
                        No projects found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default ManageProjectPage
