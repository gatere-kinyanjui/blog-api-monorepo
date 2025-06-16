/* eslint-disable @typescript-eslint/no-unused-vars */

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "../ui/button";
import { useState, type FormEvent } from "react";

interface IRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

interface IFormData {
  postContent: string;
}

// define your extension array
const extensions = [
  StarterKit.configure({
    bulletList: {
      HTMLAttributes: {
        class: "list-disc ml-3",
      },
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal ml-3",
      },
    },
  }),
  TextAlign.configure({
    types: ["heading", "paragraph"],
  }),
  Highlight,
];

const initialContent = "<p>Hello World!</p>";

const RichTextEditor = () => {
  const [postContent, setPostContent] = useState("");

  // initialize Tiptap editor
  const editor = useEditor({
    extensions,
    content: postContent,

    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-mg bg-slate-50 py-2 px-3",
      },
    },

    onUpdate({ editor }) {
      setPostContent(editor.getHTML());
    },
  });

  // callback fn for form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);

    // data payload for backend
    const formData: IFormData = {
      postContent,
    };
    console.log("Form data to submit to backend: ", formData);

    try {
      const response = await fetch("", {
        method: "",
        headers: {
          "Content-Typer": "applicaton/json",
          // Add any authentication headers if required by your backend
        },
        body: JSON.stringify(formData),
      });
    } catch (error: unknown) {
      console.error("RTE error submitting data to backend: ", error);
    }
  };

  return (
    <form>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
      <Button
        className="mt-2 w-[50%] flex justify-center items-center"
        // onClick={}
      >
        Save
      </Button>
    </form>
  );
};

export default RichTextEditor;
