"use client";
import RitchTextEditor from "@/components/ritch-text-editor";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [post, setPost] = useState("");
  const onChange = (content: string) => {
    setPost(content);
    // console.log(content);
  };

  const addBlog = (post:string) => {
    console.log(post);
  };
  return (
    <div className="max-w-3xl mx-auto">
      <RitchTextEditor content={post} onChange={onChange} />
      <div className="flex items-center justify-center my-4">
        <Button onClick={() => addBlog(post)}>Add Blog</Button>
      </div>
    </div>
  );
}
