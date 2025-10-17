// import RichTextEditor from "@/components/rich-text-editor";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
// import { useState } from "react";

export default function CreatePost() {
  /*  interface LoadedDocumentData {
    html: string;
    lastSavedAt: string | null;
  } */
  /*  const [post, setPost] = useState("");

  const changeListener = (content: string) => {
    setPost(content);
    // console.log(content);
  }; */

  return (
    <div>
      {/* <RichTextEditor content={post} onChange={changeListener} /> */}
      <SimpleEditor />
    </div>
  );
}
