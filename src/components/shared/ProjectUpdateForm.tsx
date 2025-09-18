
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UpdateProject } from "@/Services/Projects";
import type { TProject } from "@/types";

interface ProjectFormData {
  title: string;
  short_description: string;
  long_description: string;
  live_link: string;
  client_link: string;
  server_link: string;
}

interface ProjectUpdateFormProps {
  projectData: TProject;
}

export default function ProjectUpdateForm({
  projectData,
}: ProjectUpdateFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    defaultValues: {
      title: projectData?.title,
      short_description: projectData?.short_description,
      long_description: projectData?.long_description,
      live_link: projectData?.live_link,
      client_link: projectData?.client_link,
      server_link: projectData?.server_link,
    },
  });

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);

      const projectUpdateData = {
        projectId: projectData._id,
        projectInfo: {
          title: data.title,
          short_description: data.short_description,
          long_description: data.long_description,
          live_link: data.live_link,
          client_link: data.client_link,
          server_link: data.server_link,
        },
      };

      const result = await UpdateProject(projectUpdateData);

      if (result?.success) {
        toast.success("Project updated successfully", { duration: 2000 });
        router.refresh();
        router.push("/dashboard/manage-projects");
      } else {
        toast.error(result?.message || "Failed to update project", {
          duration: 2000,
        });
      }
    } catch (error) {
      toast.error("An error occurred while updating the project", {
        duration: 2000,
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="container mx-auto py-6">
      <Card className="w-full shadow-md">
        <CardHeader className="border-b bg-muted/50">
          <CardTitle>Update Your Project</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
              <p className="text-sm text-muted-foreground">
                Updating project...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-base font-medium">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter project title"
                  className="focus-visible:ring-primary"
                  {...register("title", { required: "Title is required" })}
                />
                {errors.title && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="live_link" className="text-base font-medium">
                    Live Link
                  </Label>
                  <Input
                    id="live_link"
                    type="url"
                    placeholder="Enter project live link"
                    className="focus-visible:ring-primary"
                    {...register("live_link", {
                      required: "Live link is required",
                    })}
                  />
                  {errors.live_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.live_link.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="client_link"
                    className="text-base font-medium"
                  >
                    Frontend Code Link
                  </Label>
                  <Input
                    id="client_link"
                    type="url"
                    placeholder="Enter frontend repository link"
                    className="focus-visible:ring-primary"
                    {...register("client_link", {
                      required: "Frontend code link is required",
                    })}
                  />
                  {errors.client_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.client_link.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="server_link"
                    className="text-base font-medium"
                  >
                    Backend Code Link
                  </Label>
                  <Input
                    id="server_link"
                    type="url"
                    placeholder="Enter backend repository link"
                    className="focus-visible:ring-primary"
                    {...register("server_link", {
                      required: "Backend code link is required",
                    })}
                  />
                  {errors.server_link && (
                    <p className="text-sm text-destructive mt-1">
                      {errors.server_link.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="short_description"
                  className="text-base font-medium"
                >
                  Short Description
                </Label>
                <Textarea
                  id="short_description"
                  placeholder="Write your project short description..."
                  className="min-h-[120px] resize-y focus-visible:ring-primary"
                  {...register("short_description", {
                    required: "Short description is required",
                    maxLength: {
                      value: 720,
                      message: "Short description cannot exceed 720 characters",
                    },
                  })}
                />
                {errors.short_description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.short_description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum 720 characters. Current:{" "}
                  {projectData?.short_description?.length || 0}
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="long_description"
                  className="text-base font-medium"
                >
                  Long Description
                </Label>
                <Textarea
                  id="long_description"
                  placeholder="Write your project long description..."
                  className="min-h-[200px] resize-y focus-visible:ring-primary"
                  {...register("long_description", {
                    required: "Long description is required",
                    maxLength: {
                      value: 2200,
                      message: "Long description cannot exceed 2200 characters",
                    },
                  })}
                />
                {errors.long_description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.long_description.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum 2200 characters. Current:{" "}
                  {projectData?.long_description?.length || 0}
                </p>
              </div>

              <div className="flex justify-end gap-4 pt-4 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/dashboard/manage-projects")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Project"
                  )}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
