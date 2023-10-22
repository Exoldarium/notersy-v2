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
// save data every time the user clicks a different button, try to use a mouseOut event for mousing out of popup
// TODO: 
// read this an update everything using the info https://tiptap.dev/guide/output#rendering
// we could make each of the notes be rendered through the editor component, each of the notes will be a single editor instance
// apply isEditable accordingly and other methods from the link
// the editor that is used for adding a new note will be a separate one with empty content

export const NoteEditor = ({ singleCategory }: Props) => {
  const [noteContent, setNoteContent] = useState('');
  const categories = useAppSelector(({ categories }) => {
    return categories;
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

  if (!editor) {
    return null;
  }

  const addNewNoteOnClick = () => {
    void dispatch(addNewNote(categories, singleCategory, noteContent));
    dispatch(setEditorActive(false));
  };

  const closeEditorOnClick = () => dispatch(setEditorActive(false));

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