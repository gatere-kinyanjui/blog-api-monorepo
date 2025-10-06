/* eslint-disable @typescript-eslint/no-unused-vars */

import RichTextEditor from "@/components/rich-text-editor";
import { useState } from "react";

export default function CreatePost() {
  const [post, setPost] = useState("");

  const changeListener = (content: string) => {
    setPost(content);
    // console.log(content);
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <RichTextEditor content={post} onChange={changeListener} />
    </div>
  );
}
