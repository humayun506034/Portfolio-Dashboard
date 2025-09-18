import React, { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import Heading from "@tiptap/extension-heading";
import { Button } from "../ui/button";

interface TiptapEditorProps {
  value: string;
  onChange: (content: string) => void;
}

const MenuBar: React.FC<{ editor: ReturnType<typeof useEditor> | null }> = ({
  editor,
}) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-3 border-b pb-2">
      <Button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        H2
      </Button>
      <Button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={
          editor.isActive("paragraph")
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Paragraph
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={
          editor.isActive("bold")
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Bold
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={
          editor.isActive("italic")
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Italic
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={
          editor.isActive("strike")
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Strike
      </Button>
      <Button
        onClick={() => editor.chain().focus().toggleHighlight().run()}
        className={
          editor.isActive("highlight")
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Highlight
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" })
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Left
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Center
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Right
      </Button>
      <Button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" })
            ? "bg-blue-500 text-white px-2 rounded"
            : "px-2 rounded hover:bg-gray-200"
        }
      >
        Justify
      </Button>
    </div>
  );
};

const TiptapEditor: React.FC<TiptapEditorProps> = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false, // ✅ disable the default heading
      }),
      Heading.configure({
        levels: [2], // ✅ allow only H2
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  // Sync external value changes (important for edit mode)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, false);
    }
  }, [value, editor]);

  return (
    <div className="border rounded p-2 min-h-[150px]">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default TiptapEditor;
