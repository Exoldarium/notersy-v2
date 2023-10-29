import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { NoteEditorStyles } from './styles/NoteEditorStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setChecboxChecked } from '../reducers/checkboxReducer';
import { setClickedNote } from '../reducers/clickedNoteReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';

interface Props {
  note: BaseNoteEntry;
  singleCategory: BaseCategoryEntry;
  editable: boolean;
}

// TODO:
// add a way to copy note content

export const SingleNote = ({ note, singleCategory, editable }: Props) => {
  const [noteContent, setNoteContent] = useState('');
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });
  const dispatch = useAppDispatch();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        hardBreak: false
      }),
    ],
    editable,
    content: note.content,
    onUpdate({ editor }) {
      // grab the text and sanitize the inputs
      const clean = DOMPurify.sanitize(editor.getHTML());
      setNoteContent(clean);
    }
  });

  useEffect(() => {
    // sets editor editable property and focuses the editor
    editor?.setEditable(editable);

    if (editable) {
      editor?.commands.focus();
    }
  }, [editor, editable]);

  useEffect(() => {
    // listen for visibility change (popup window closing)
    const updateNoteOnVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        const updatedCategory: BaseCategoryEntry = {
          ...singleCategory,
          dateModified: getDate(),
          unixTimeModified: Date.now()
        };

        const noteToEdit: BaseNoteEntry = {
          ...note,
          content: noteContent,
          dateModified: getDate(),
          unixTimeModified: Date.now()
        };

        void dispatch(updateExistingNote(categories, updatedCategory, noteToEdit));
      }
    };

    document.addEventListener('visibilitychange', updateNoteOnVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', updateNoteOnVisibilityChange);
    };
  });

  const updateNoteOnClick = () => {
    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    const noteToEdit: BaseNoteEntry = {
      ...note,
      content: noteContent,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    void dispatch(updateExistingNote(categories, updatedCategory, noteToEdit));
    dispatch(setClickedNote(''));
  };

  const getCheckedIdOnClick = (
    e: React.MouseEvent<HTMLInputElement>
  ) => {
    dispatch(setChecboxChecked(e, checkbox, note.id));
    dispatch(setClickedNote(''));
  };

  const setEditNoteOnClick = () => {
    dispatch(setClickedNote(note.id));
    dispatch(setEditorActive(false));
  };

  const cancelEditNoteOnClick = () => {
    dispatch(setClickedNote(''));
    editor?.commands.setContent(note.content);
  };

  if (!editor) return null;

  return (
    <NoteEditorStyles>
      <form style={{ alignSelf: 'flex-end' }}>
        <input
          type="checkbox"
          id={note.id}
          name="checked"
          onClick={getCheckedIdOnClick}
        />
      </form>
      <div style={{ display: editable ? 'block' : 'none' }}>
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
          onClick={updateNoteOnClick}
          disabled={editor.getHTML() === '<p></p>'}
        >
          Add note
        </button>
        <button
          type="button"
          onClick={cancelEditNoteOnClick}
        >
          Cancel
        </button>
      </div>
      <EditorContent editor={editor} id={note.id} onClick={setEditNoteOnClick} />
    </NoteEditorStyles>
  );
};