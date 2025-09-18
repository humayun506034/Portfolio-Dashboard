"use client";
import TiptapEditor from "@/components/shared/TiptapEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addBlog } from "@/Services/Blogs";
import { Blog } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
  image: FileList;
}

export default function AddBlog() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);

  // console.log("data=>",data);
  // console.log(user);

  const [form, setForm] = useState<Partial<Blog>>({
    content: "",
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    // console.log(data);

    const { title } = data;

    try {
      setLoading(true);
      const image = data.image[0]; // Ensure this is correct
      const newFormData = new FormData();
      newFormData.append("file", image); // Add the image file
      newFormData.append("upload_preset", "humayunkabir"); // Your upload preset
      newFormData.append("cloud_name", "dn7oeugls"); // Not necessary for the request

      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dn7oeugls/image/upload",
        newFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log("Image uploade =>",response);
      const imageUrl = response.data.secure_url;

      // console.log(imageUrl);

      const blogData = {
        title,
        content: form.content,
        image: imageUrl,
      };

      // console.log(blogData);
      const res = await addBlog(blogData);
      // console.log(res);
      if (res?.success) {
        toast.success(res.message, {
          // id: toastId,
          duration: 2000,
        });
        router.push("/dashboard/manage-blogs");
      }

      reset();

      setLoading(false);
    } catch (error) {
      console.log(error);
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
    <div className="min-h-screen">
      <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen">
        {/* Left Side - Profile Card */}

        {/* Right Side - Content */}
        <div className="w-full mx-auto space-y-6 h-screen rounded-3xl">
          {/* Add Blog Post Section */}
          <div className=" h-screen ">
            <h3 className=" text-lg font-semibold mb-4 lg:px-8 px-3 pt-4">
              Add New Blog Post
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="min-h-screen   lg:px-8 px-3 rounded-3xl"
            >
              <div className="space-y-5">
                <div>
                  <Label>Title</Label>
                  <Input
                    type="text"
                    className="w-full   rounded-lg px-4 py-2 mt-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter blog title"
                    {...register("title", { required: true })}
                  />
                </div>

                {/* Short Description */}
                <div>
                 
                  <div className="space-y-2">
                    <Label>Content</Label>

                    <TiptapEditor
                      value={form.content || ""}
                      onChange={(newContent) =>
                        setForm((prev) => ({ ...prev, content: newContent }))
                      }
                    />

                    {errors.short_description && (
                      <p className="text-red-500 text-sm">
                        {errors.short_description.message}
                      </p>
                    )}
                  </div>
                  {/* Long Description */}

                  {/* Image */}
                  <div className="space-y-2">
                    <Label htmlFor="image">Blog Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      {...register("image", {
                        required: "Blog image is required",
                      })}
                    />
                    {errors.image && (
                      <p className="text-sm text-destructive">
                        {errors.image.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-8 lg:mb-4 mb-2">
                <Button type="submit">Publish Blog</Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
