import { useEffect, useRef, useState } from 'react';
import DOMPurify from 'dompurify';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { EditorStyles } from './styles/NoteEditorStyles';
import { addNewNote } from '../reducers/categoryReducer';
import { useAppDispatch, useAppSelector } from '../hooks/useReduxTypes';
import { BaseCategoryEntry } from '../types';
import { setEditorActive } from '../reducers/editorActiveReducer';
import { getDate } from '../utils/helpers';
import * as Icon from 'react-bootstrap-icons';

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
  const ref = useRef<null | HTMLDivElement>(null);

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
    const updatedCategory: BaseCategoryEntry = {
      ...singleCategory,
      dateModified: getDate(),
      unixTimeModified: Date.now()
    };

    void dispatch(addNewNote(categories, updatedCategory, noteContent));
    dispatch(setEditorActive(false));
  };

  const closeEditorOnClick = () => dispatch(setEditorActive(false));

  if (!editor) {
    return null;
  }

  if (editorActive) {
    editor.commands.focus();
    ref.current?.scrollIntoView();
  }

  return (
    <EditorStyles $editorActive={editorActive} ref={ref}>
      <div className="editorButtons">
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
          onClick={addNewNoteOnClick}
          disabled={editor.getHTML() === '<p></p>'}
        >
          <Icon.CheckLg />
        </button>
        <button
          type="button"
          onClick={closeEditorOnClick}
        >
          <Icon.XLg />
        </button>
      </div>
      <EditorContent editor={editor} />
    </EditorStyles>
  );
};