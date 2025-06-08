/* eslint-disable @typescript-eslint/no-unused-vars */
// src/Tiptap.tsx
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";

interface IRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
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

const RichTextEditor = ({ content, onChange }: IRichTextEditorProps) => {
  const editor = useEditor({
    extensions,
    content: content,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-mg bg-slate-50 py-2 px-3",
      },
    },
    onUpdate({ editor }) {
      // console.log(editor.getHTML());
      onChange(editor.getHTML());
    },
  });

  return (
    <div>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
