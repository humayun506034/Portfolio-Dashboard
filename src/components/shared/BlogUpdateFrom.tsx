"use client";

import { TBlog } from "@/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import RitchTextEditor from "../ritch-text-editor";

interface BlogFromData {
  title: string;
  short_description: string;
  long_description: string;
}

export default function BlogUpdateFrom(blogData: Record<string, unknown>) {
  const blog = blogData?.blogData as TBlog;
  const [shortDescription, setShortDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const onChangeForShort = (content: string) => {
    setShortDescription(JSON.stringify(content));
    // console.log(content);
  };
  const onChangeForLong = (content: string) => {
    setLongDescription(JSON.stringify(content));
    // console.log(content);
  };
  const {
    register,
    handleSubmit,
    
  } = useForm<BlogFromData>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<BlogFromData> = async (data) => {
    // console.log(data);

    const { title } = data;

    try {
      setLoading(true);

      const blogData = {
        blogId: blog._id,
        blogInfo: {
          title,
          short_description: shortDescription,
          long_description: longDescription,
        },
      };

      // console.log(blogData);

      await axios.put(
        "https://blog-and-portfilio-backend.vercel.app/api/blogs/update-blog",
        blogData
      );
      // console.log(res.data);

      setLoading(false);
      toast.success("Blog Updated Successfully ..", { duration: 2000 });
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
    <div className="min-h-screen ">
      <div className="flex flex-col lg:flex-row p-4 gap-4 h-screen">
        {/* Left Side - Profile Card */}

        {/* Right Side - Content */}
        <div className="w-full mx-auto space-y-6   rounded-3xl">
          {/* Add Blog Post Section */}
          <div className="   h-screen">
            <h3 className="text-black text-lg font-semibold mb-4 lg:px-8 px-3 pt-4">
              Update Your Blog
            </h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="   lg:px-8 px-3 rounded-3xl"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-black text-sm mb-2 ">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full  text-black rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter blog title"
                    defaultValue={blog?.title}
                    {...register("title", { required: true })}
                  />
                </div>
                {/* Short Description */}
                <div>
                  <Label>Short Description</Label>

                  <div className="w-full mx-auto mt-2">
                    <RitchTextEditor
                      content={shortDescription}
                      onChange={onChangeForShort}
                    />
                  </div>
                </div>
                {/* Long Description */}
                <div>
                  <Label>Long Description</Label>
                  {/* Long Description */}
                  <div className="w-full mx-auto mt-2">
                    <RitchTextEditor
                      content={longDescription}
                      onChange={onChangeForLong}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8  mb-2 text-center ">
                <button
                  type="submit"
                  className="lg:w-1/3 w-full bg-blue-600 hover:bg-blue-700 text-black px-6 py-2  rounded-lg transition-colors"
                >
                  Update Blog
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
