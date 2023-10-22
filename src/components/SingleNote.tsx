import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { NoteEditorStyles } from './styles/NoteEditorStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setChecboxChecked } from '../reducers/checkboxReducer';

interface Props {
  note: BaseNoteEntry;
  singleCategory: BaseCategoryEntry;
  editable: boolean;
  setIsClicked: Dispatch<SetStateAction<string>>;
}

export const SingleNote = ({
  note,
  editable,
  setIsClicked,
  singleCategory
}: Props) => {
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

  console.log(noteContent, editable);

  // sets editor editable property
  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable, dispatch]);

  const updateNoteOnClick = () => {
    const noteToEdit: BaseNoteEntry = {
      ...note,
      content: noteContent,
    };

    void dispatch(updateExistingNote(categories, singleCategory, noteToEdit));
    setIsClicked('');
  };

  const getCheckedIdOnClick = (
    e: React.MouseEvent<HTMLInputElement>
  ) => dispatch(setChecboxChecked(e, checkbox));

  const cancelEditOnClick = () => {
    setIsClicked('');
    editor?.commands.setContent(note.content);
  };

  if (!editor) return null;

  return (
    <NoteEditorStyles>
      <div style={{ display: editable ? 'flex' : 'none' }}>
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
          onClick={cancelEditOnClick}
        >
          Cancel
        </button>
      </div>
      <EditorContent editor={editor} id={note.id} onClick={() => setIsClicked(note.id)} />
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