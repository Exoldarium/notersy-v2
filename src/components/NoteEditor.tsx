import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorStyles } from './styles/NoteEditorStyles';
import { addNewNote } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { BaseCategoryEntry } from '../types';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';

interface Props {
  singleCategory: BaseCategoryEntry;
}

// TODO:
// add different headers and paragraph options into a dropdown menu

export const NoteEditor = ({ singleCategory }: Props) => {
  const [noteContent, setNoteContent] = useState('');
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const editorActive = useAppSelector(({ editorActive }) => {
    return editorActive;
  });
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false
      })
    ],
    content: '',
    onUpdate({ editor }) {
      // grab the text and sanitize the inputs
      const clean = DOMPurify.sanitize(editor.getHTML());
      setNoteContent(clean);
    }
  });

  useEffect(() => {
    // listen for visibility change (popup window closing)
    const addNoteOnVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && noteContent) {
        const updatedCategory: BaseCategoryEntry = {
          ...singleCategory,
          dateModified: getDate(),
          unixTimeModified: Date.now()
        };

        void dispatch(addNewNote(categories, updatedCategory, noteContent));
        dispatch(setEditorActive(false));
      }
    };

    document.addEventListener('visibilitychange', addNoteOnVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', addNoteOnVisibilityChange);
    };
  });

  const addNewNoteOnClick = () => {
    void dispatch(addNewNote(categories, singleCategory, noteContent));
    dispatch(setEditorActive(false));
  };

  const closeEditorOnClick = () => dispatch(setEditorActive(false));

  if (!editor) {
    return null;
  }

  if (editorActive) {
    editor.commands.focus();
  }

  return (
    <EditorStyles>
      <div>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          Bullet
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          Heading
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          Undo
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          Redo
        </button>
        <button
          type="button"
          onClick={addNewNoteOnClick}
          disabled={editor.getHTML() === '<p></p>'}
        >
          Add note
        </button>
        <button
          type="button"
          onClick={closeEditorOnClick}
        >
          Cancel
        </button>
      </div>
      <EditorContent editor={editor} />
    </EditorStyles>
  );
};