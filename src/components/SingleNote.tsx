import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { NoteEditorStyles } from './styles/NoteEditorStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setChecboxChecked } from '../reducers/checkboxReducer';
import { setNoteEditPropertyToFalse } from '../utils/helpers';

interface Props {
  note: BaseNoteEntry;
  singleCategory: BaseCategoryEntry;
}

export const SingleNote = ({ note, singleCategory }: Props) => {
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
    editable: note.edit,
    content: note.content,
    onUpdate({ editor }) {
      // grab the text and sanitize the inputs
      const clean = DOMPurify.sanitize(editor.getHTML());
      setNoteContent(clean);
    }
  });

  useEffect(() => {
    // sets editor editable property and focuses the editor
    if (note.edit) {
      editor?.commands.focus();
    }

    editor?.setEditable(note.edit);
  }, [editor, note]);

  const updateNoteOnClick = () => {
    const noteToEdit: BaseNoteEntry = {
      ...note,
      content: noteContent,
      edit: false
    };

    void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
  };

  const getCheckedIdOnClick = (e: React.MouseEvent<HTMLInputElement>) =>
    dispatch(setChecboxChecked(e, checkbox));

  const setEditNoteOnClick = () => {
    const categoryWithUpdatedNotes = setNoteEditPropertyToFalse(singleCategory);

    const updatedCategory = {
      ...categoryWithUpdatedNotes,
      editor: false,
    };
    const updatedNote = {
      ...note,
      edit: true
    };

    void dispatch(updateExistingNote(categories, updatedCategory, updatedNote));
  };

  const cancelEditNoteOnClick = () => {
    const editedNote: BaseNoteEntry = {
      ...note,
      edit: false
    };

    void dispatch(updateExistingNote(categories, singleCategory, editedNote));
    editor?.commands.setContent(note.content);
  };

  if (!editor) return null;

  return (
    <NoteEditorStyles>
      <div style={{ display: note.edit ? 'flex' : 'none' }}>
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
      <form>
        <input
          type="checkbox"
          id={note.id}
          name="checked"
          onClick={getCheckedIdOnClick}
        />
      </form>
    </NoteEditorStyles>
  );
};