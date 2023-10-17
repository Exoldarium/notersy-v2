import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';

import { NoteEditorStyles } from './styles/NoteEditorStyles';

import { addNewNote, updateExistingNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { setEditorOnNote } from '../reducers/editorOnNoteReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { BaseCategoryEntry } from '../types';
import { parseToNumber } from '../utils/parseData';

interface Props {
  singleCategory: BaseCategoryEntry;
}

// TODO:
// add different headers and paragraph options into a dropdown menu
// TODO:
// set the edited content to a different storage key so that the data persists even if the popup is closed

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

  const editNote = singleCategory.notes.find(note => note.edit);

  useEffect(() => {
    // if note is set to be edited, add the existing content
    if (editNote) {
      const clean = DOMPurify.sanitize(editNote.content);
      editor?.commands.setContent(clean);
      setNoteContent(clean);
    }
  }, [editNote, editor]);

  if (!editor) {
    return null;
  }

  const addNewNoteOnClick = () => {
    // check if the note is set to be edited
    if (editNote) {
      // if it is add the new content and set the edit property to false
      const noteToEdit = {
        ...editNote,
        content: noteContent,
        edit: false
      };

      void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
      dispatch(setEditorActive(false)); // close editor
      dispatch(setEditorOnNote(false)); // set note edit state to false
    } else {
      // else send a new note and close the editor
      void dispatch(addNewNote(categories, singleCategory, noteContent));
      dispatch(setEditorActive(false));
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const characterCount = parseToNumber(editor.storage.characterCount.characters());

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
      </div>
      <EditorContent editor={editor} />
      <div>
        {characterCount}/1500
      </div>
    </NoteEditorStyles>
  );
};