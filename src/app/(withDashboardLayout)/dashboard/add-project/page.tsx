"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { addProject } from "@/Services/Projects";

interface ProjectFormData {
  title: string;
  live_link: string;
  client_link: string;
  server_link: string;
  short_description: string;
  long_description: string;
  technology: string;
  image: FileList;
}

export default function AddProject() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectFormData>();

  const [loading, setLoading] = useState(false);

//   console.log(user);
  const onSubmit = async (data: ProjectFormData) => {
    try {
      setLoading(true);
      const image = data.image[0];
      const newFormData = new FormData();
      newFormData.append("file", image);
      newFormData.append("upload_preset", "humayunkabir");

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dn7oeugls/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const imageUrl = response.data.secure_url;

      const projectData = {
        title: data.title,
        live_link: data.live_link,
        client_link: data.client_link,
        server_link: data.server_link,
        short_description: data.short_description,
        long_description: data.long_description,
        technology: data.technology,
        image: imageUrl,
      };

    //   console.log({ projectData });
       const res = await addProject(projectData);
      // console.log(res);
      if (res?.success) {
        toast.success(res.message, {
          // id: toastId,
          duration: 2000,
        });
      }

      reset();

      setLoading(false);
    } catch (error) {
      toast.error("Failed to add project");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }



  return (
    <div className="container mx-auto py-6">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter project title"
                {...register("title", { required: "Title is required" })}
              />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="live_link">Live Link</Label>
                <Input
                  id="live_link"
                  type="url"
                  placeholder="Enter project live link"
                  {...register("live_link", {
                    required: "Live link is required",
                  })}
                />
                {errors.live_link && (
                  <p className="text-sm text-destructive">
                    {errors.live_link.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="client_link">Frontend Code Link</Label>
                <Input
                  id="client_link"
                  type="url"
                  placeholder="Enter frontend repository link"
                  {...register("client_link", {
                    required: "Frontend code link is required",
                  })}
                />
                {errors.client_link && (
                  <p className="text-sm text-destructive">
                    {errors.client_link.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="server_link">Backend Code Link</Label>
                <Input
                  id="server_link"
                  type="url"
                  placeholder="Enter backend repository link"
                  {...register("server_link", {
                    required: "Backend code link is required",
                  })}
                />
                {errors.server_link && (
                  <p className="text-sm text-destructive">
                    {errors.server_link.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="short_description">Short Description</Label>
              <Textarea
                id="short_description"
                placeholder="Write your project short description..."
                className="min-h-[120px]"
                {...register("short_description", {
                  required: "Short description is required",
                  maxLength: {
                    value: 420,
                    message: "Short description cannot exceed 420 characters",
                  },
                })}
              />
              {errors.short_description && (
                <p className="text-sm text-destructive">
                  {errors.short_description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="long_description">Long Description</Label>
              <Textarea
                id="long_description"
                placeholder="Write your project long description..."
                className="min-h-[160px]"
                {...register("long_description", {
                  required: "Long description is required",
                  maxLength: {
                    value: 1250,
                    message: "Long description cannot exceed 1250 characters",
                  },
                })}
              />
              {errors.long_description && (
                <p className="text-sm text-destructive">
                  {errors.long_description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="technology">Technology</Label>
              <Input
                id="technology"
                placeholder="👉 Enter technologies used (e.g., React, Node.js, MongoDB). Separate each with a comma."
                {...register("technology", {
                  required: "Technology is required",
                })}
              />
              {errors.technology && (
                <p className="text-sm text-destructive">
                  {errors.technology.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Project Image</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                {...register("image", {
                  required: "Project image is required",
                })}
              />
              {errors.image && (
                <p className="text-sm text-destructive">
                  {errors.image.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Adding Project...
                </>
              ) : (
                "Add Project"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
