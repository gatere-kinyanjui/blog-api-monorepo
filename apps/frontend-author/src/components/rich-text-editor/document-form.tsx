import React, { useState, type FormEvent } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// --- Interface Definitions ---

// Interface for data expected from the initial document load API
/* interface LoadedDocumentData {
  html: string;
  lastSavedAt: string | null;
} */

// Interface for the form data to be submitted
interface FormData {
  content: string; // Only content remains
}

// Interface for the response when saving the full document
interface SaveDocumentResponse {
  message: string;
  document?: {
    // Optional document detail, assuming backend might return it
    id: string;
    title?: string; // Title might still be returned, but not input
    status?: string; // Status might still be returned, but not input
    content: string;
    createdAt: string;
  };
}

// --- DocumentForm Component ---
const DocumentForm: React.FC = () => {
  // State for form fields - only content remains
  const [content, setContent] = useState<string>(""); // Holds Tiptap's HTML content

  // Initialize Tiptap editor
  const editor = useEditor({
    extensions: [StarterKit],
    content: content, // Initialize editor with current content state
    onUpdate: ({ editor }) => {
      // Update content state whenever the editor's content changes
      setContent(editor.getHTML());
    },
  });

  // Callback function for form submission - WITHOUT useCallback
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Construct the data payload for the backend - only content is sent
    const formData: FormData = {
      content, // The rich text content from Tiptap
    };

    console.log("Form data to submit:", formData);

    try {
      // Send the form data to your custom backend endpoint
      const response = await fetch(
        "http://localhost:3001/api/save-full-document",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // Add any authentication headers if required by your backend
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data: SaveDocumentResponse = await response.json();
        alert(
          `Form submitted successfully! Backend response: ${JSON.stringify(data.message)}`
        );
        // Reset form fields after successful submission
        setContent("");
        editor?.commands.clearContent(); // Clear the Tiptap editor content
      } else {
        const errorData: { message?: string } = await response.json(); // Type for error response
        alert(`Failed to submit form: ${errorData.message || "Unknown error"}`);
      }
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
      alert("An error occurred while trying to submit the form.");
    }
  }; // No dependency array as it's not wrapped in useCallback

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        border: "1px solid #eee",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h2 style={{ marginBottom: "20px", textAlign: "center", color: "#333" }}>
        Create New Document
      </h2>

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
          Content:
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
      >
        Submit Document
      </button>
    </form>
  );
};

export default DocumentForm;
