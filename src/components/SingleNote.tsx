import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { BaseCategoryEntry, BaseNoteEntry } from '../types';
import { NoteEditorStyles } from './styles/NoteEditorStyles';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { updateExistingNote } from '../reducers/categoryReducer';
import { setChecboxChecked, updateCheckedId } from '../reducers/checkboxReducer';
import { setClickedNote } from '../reducers/clickedNoteReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';
import * as Icon from 'react-bootstrap-icons';

interface Props {
  note: BaseNoteEntry;
  singleCategory: BaseCategoryEntry;
  editable: boolean;
}

export const SingleNote = ({ note, singleCategory, editable }: Props) => {
  const [noteContent, setNoteContent] = useState('');
  const categories = useAppSelector(({ categories }) => {
    return categories;
  });
  const checkbox = useAppSelector(({ checkbox }) => {
    return checkbox;
  });
  const clickedNote = useAppSelector(({ clickedNote }) => {
    return clickedNote;
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
      if (document.visibilityState === 'hidden' && editable) {
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

    if (clickedNote) {
      dispatch(setClickedNote(''));
    } else if (editorActive) {
      dispatch(setEditorActive(false));
    }
  };

  const setEditNoteOnClick = () => {
    dispatch(setClickedNote(note.id));

    if (editorActive) {
      dispatch(setEditorActive(false));
    } else if (checkbox[0]) {
      dispatch(updateCheckedId([]));
    }
  };

  const cancelEditNoteOnClick = () => {
    if (clickedNote) {
      dispatch(setClickedNote(''));
    }

    editor?.commands.setContent(note.content);
  };

  if (!editor) return null;

  return (
    <NoteEditorStyles $editable={editable}>
      <form>
        {!editable && !clickedNote &&
          <input
            type="checkbox"
            id={note.id}
            name="checked"
            onClick={getCheckedIdOnClick}
          />
        }
      </form>
      <div className="noteEditorButtons">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <Icon.TypeBold />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <Icon.TypeItalic />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          disabled={
            !editor.can()
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <Icon.ListTask />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading') ? 'is-active' : ''}
        >
          H
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Icon.ArrowCounterclockwise />
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Icon.ArrowClockwise />
        </button>
        <button
          type="button"
          onClick={updateNoteOnClick}
          disabled={editor.getHTML() === '<p></p>'}
        >
          <Icon.CheckLg />
        </button>
        <button
          type="button"
          onClick={cancelEditNoteOnClick}
        >
          <Icon.XLg />
        </button>
      </div>
      <EditorContent editor={editor} id={note.id} onClick={setEditNoteOnClick} />
      {note.url &&
        <a
          style={{
            paddingLeft: '0.5rem',
            fontWeight: 'bold',
            textDecoration: 'none',
            color: 'black'
          }}
          href={note.url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {new URL(note.url).hostname}
        </a>
      }
    </NoteEditorStyles>
  );
};