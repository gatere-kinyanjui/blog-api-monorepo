import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import { Button } from "../ui/button";
import { useState, type ChangeEvent } from "react";

/* interface IRichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
} */

interface IFormData {
  title: string;
  content: string;
  published: boolean;
  author_id: number | string;
}

/* interface ISaveDocumentResponse {
  message: string;
  document?: {
    // Optional document detail, assuming backend might return it
    id: number;
    title?: string; // Title might still be returned, but not input
    published?: boolean; // Status might still be returned, but not input
    content: string;
    createdAt: Date;
    updatedAt: Date;
  };
} */

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

/* const hardCodedFormData = {
  title: "post uno",
  content: "post uno content",
  published: true,
  author_id: 909,
}; */

const RichTextEditor = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState<number | "">("");
  const [published, setPublished] = useState(false);

  // initialize Tiptap editor
  const editor = useEditor({
    extensions,
    content: content,

    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-mg bg-slate-50 py-2 px-3",
      },
    },

    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  // callback fn for fetching data
  const fetchPosts = async () => {
    await fetch("http://localhost:8000/posts/")
      .then((res) => res.json())
      .then((data: []) => {
        if (data.length == 0) {
          console.log("NO POSTS HAVE BEEN FOUND");
        } else {
          console.log("SUCCESS FETCHING POSTS: ", data);
        }
      })
      .catch((err) => {
        console.log("ERROR FETCHING POSTS: ", err);
      });
  };

  const postPost = async () => {
    const formData: IFormData = {
      title: title,
      content: content,
      published: published,
      author_id: authorId,
    };

    await fetch("http://localhost:8000/posts/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) {
          console.log("A fetch error occured");
          return;
        }

        return res.json();
      })

      .then((data) => {
        console.log("SUCCESS POSTING POST: ", data);
      })

      .catch((error) => {
        console.log("ERROR POSTING POST: ", error.message);
      });
  };

  // callback fn for form submission
  // const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   // Ensure authorId is a number before submitting
  //   if (typeof authorId !== "number") {
  //     alert("Author ID must be a number.");
  //     return;
  //   }

  //   // data payload for backend
  //   const formData: IFormData = {
  //     title: title,
  //     content: content,
  //     authorId: authorId,
  //     published: published,
  //   };
  //   console.log("Form data to submit to backend: ", formData);

  //   // TODO: LOOK INTO AXIOS AND REACT QUERY..!!!

  //   try {
  //     const response = await fetch("http://localhost:8000/posts/", {
  //       method: "POST",
  //       headers: {
  //         // Accept: "application/json",
  //         "Content-Typer": "applicaton/json",
  //         // Add any authentication headers if required by your backend
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       alert(
  //         `Post submitted successfully! Backend response: ${JSON.stringify(data.message)}`
  //       );

  //       setTitle("");
  //       setContent("");
  //       setAuthorId(""); // Reset to empty string for input field
  //       setPublished(false);

  //       editor?.commands.clearContent(); //clear tiptap editor
  //     } else {
  //       const errorData: { message?: string; error?: string } =
  //         await response.json();
  //       alert(`Failed to submit post: ${errorData.error || "Unknown error"}`);
  //     }
  //   } catch (error: unknown) {
  //     console.log("RTE error submitting data to backend: ", error);
  //     alert("Error occured while trying to submit post");
  //   }
  // };

  return (
    // <form onSubmit={handleFormSubmit}>
    //   <MenuBar editor={editor} />
    //   <EditorContent editor={editor} />
    //   <Button
    //     type="submit"
    //     className="mt-2 w-[50%] flex justify-center items-center"
    //     // onClick={}
    //   >
    //     Save
    //   </Button>
    // </form>
    <>
      <Button
        type="submit"
        className="mt-2 w-auto flex justify-center items-center"
        onClick={fetchPosts}
      >
        FETCH POSTS
      </Button>

      <Button
        type="submit"
        className="mt-2 w-auto flex justify-center items-center"
        onClick={postPost}
      >
        POST HARD CODED DATA
      </Button>
      <form
        // onSubmit={handleFormSubmit}
        style={{
          maxWidth: "800px",
          margin: "20px auto",
          border: "1px solid #eee",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}
        >
          Create New Post
        </h2>

        {/* Post Title Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="postTitle"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Post Title:
          </label>
          <input
            type="text"
            id="postTitle"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Author ID Input */}
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="authorId"
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Author ID:
          </label>
          <input
            type="number" // Changed input type to number
            id="authorId"
            value={authorId}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const value = e.target.value;
              setAuthorId(value === "" ? "" : Number(value)); // Handle empty string for input and convert to number
            }}
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Published Checkbox */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="checkbox"
            id="published"
            checked={published}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPublished(e.target.checked)
            }
            style={{ marginRight: "8px" }}
          />
          <label
            htmlFor="published"
            style={{ fontWeight: "bold", color: "#555" }}
          >
            Published
          </label>
        </div>

        {/* Tiptap Editor */}
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "5px",
              fontWeight: "bold",
              color: "#555",
            }}
          >
            Post Content:
          </label>
          <EditorContent
            editor={editor}
            style={{
              border: "1px solid #ccc",
              minHeight: "200px",
              padding: "10px",
              borderRadius: "4px",
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            width: "100%",
          }}
          onClick={postPost}
        >
          Create Post
        </button>
      </form>
    </>
  );
};

export default RichTextEditor;
