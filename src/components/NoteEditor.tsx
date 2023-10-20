import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import StarterKit from '@tiptap/starter-kit';

import { NoteEditorStyles } from './styles/NoteEditorStyles';

import { addNewNote, updateExistingNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { BaseCategoryEntry } from '../types';
import { parseToNumber } from '../utils/parseData';

interface Props {
  singleCategory: BaseCategoryEntry;
}

// TODO:
// add different headers and paragraph options into a dropdown menu
// TODO:
// save data every time the user clicks a different button, try to use a mouseOut event for mousing out of popup

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

  const noteToBeEdited = singleCategory.notes.find(note => note.edit);

  useEffect(() => {
    // if note is set to be edited, add the existing content
    if (noteToBeEdited) {
      const clean = DOMPurify.sanitize(noteToBeEdited.content);
      editor?.commands.setContent(clean);
      setNoteContent(clean);
    }
  }, [noteToBeEdited, editor]);

  if (!editor) {
    return null;
  }

  const addNewNoteOnClick = () => {
    // check if the note is being edited
    if (noteToBeEdited) {
      // update the note, set the edit property to false
      const noteToEdit = {
        ...noteToBeEdited,
        content: noteContent,
        edit: false
      };

      void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
      dispatch(setEditorActive(false)); // close editor
    } else {
      // if the note is not being edited then it's a new note
      void dispatch(addNewNote(categories, singleCategory, noteContent));
      dispatch(setEditorActive(false));
    }
  };

  const closeEditorOnClick = () => {
    // if there is a note that is set to be edited, set edit to false
    // prevents a note.edit property staying true even if cancel button is clicked
    if (noteToBeEdited) {
      const noteToEdit = {
        ...noteToBeEdited,
        edit: false
      };

      void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
      dispatch(setEditorActive(false));
    }

    dispatch(setEditorActive(false));
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
        <button
          type="button"
          onClick={closeEditorOnClick}
        >
          Cancel
        </button>
      </div>
      <EditorContent editor={editor} />
      <div>
        {characterCount}/1500
      </div>
    </NoteEditorStyles>
  );
};