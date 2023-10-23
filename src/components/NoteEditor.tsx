import { useState } from 'react';
import DOMPurify from 'dompurify';

import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';

import { NoteEditorStyles } from './styles/NoteEditorStyles';

import { addNewNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { BaseCategoryEntry } from '../types';

interface Props {
  singleCategory: BaseCategoryEntry;
}

// TODO:
// add different headers and paragraph options into a dropdown menu
// TODO:
// add a separate key in storage that will store unfinished note content
// if the user clicks out of the popup (note is still active), grab that content and add it to note

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
      }),
      CharacterCount.configure({
        limit: 1500,
      }),
    ],
    content: '',
    onUpdate({ editor }) {
      // grab the text and sanitize the inputs
      const clean = DOMPurify.sanitize(editor.getHTML());
      setNoteContent(clean);
    }
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
    <NoteEditorStyles>
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
    </NoteEditorStyles>
  );
};