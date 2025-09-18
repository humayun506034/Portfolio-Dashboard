
import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllProject } from "@/Services/Projects"
import { TProject } from "@/types"
import ProjectUpdateFrom from "@/components/shared/ProjectUpdateForm"

export const metadata: Metadata = {
  title: "Update Project",
  description: "Update your project details",
}


interface PageProps {
  params: Promise<{
    projectId: string;
  }>;
}

const UpdateProject = async ({ params }: PageProps) => {
  const { projectId } =await params

  try {
    const projects = await getAllProject()

    const matchProject = projects?.data?.find((project: TProject) => project._id === projectId)

    if (!matchProject) {
      notFound()
    }


    

    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Update Project</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectUpdateFrom projectData={matchProject} />
          </CardContent>
        </Card>
      </div>
    )
  } catch (error) {
    console.error("Error fetching project:", error)
    return (
      <div className="container mx-auto py-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-destructive">Failed to load project data. Please try again later.</p>
          </CardContent>
        </Card>
      </div>
    )
  }
}

export default UpdateProject
