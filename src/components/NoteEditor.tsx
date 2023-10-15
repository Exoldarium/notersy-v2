import { useState } from 'react';
import DOMPurify from 'dompurify';

import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import HardBreak from '@tiptap/extension-hard-break';
import StarterKit from '@tiptap/starter-kit';

import { useAppDispatch } from '../hooks/useReduxTypes';
import { parseToNumber } from '../utils/parseData';
import NoteEditorStyles from './styles/NoteEditorStyles';
import { BaseCategoryEntry } from '../types';
import { addNewNote } from '../reducers/categoryReducer';
import { setEditorActive } from '../reducers/editorActiveReducer';

interface Props {
  singleCategory: BaseCategoryEntry;
}

const NoteEditor = ({ singleCategory }: Props) => {
  const [newNote, setNewNote] = useState('');
  const dispatch = useAppDispatch();
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // starter kit hardbreak is disabled so that it doesn't create conflict with the HardBreak extension
        hardBreak: false
      }),
      CharacterCount.configure({
        limit: 1500,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              // sets hard break, no line break on enter
              // doesn't create new paragraph when a list is used
              if (this.editor.isActive('orderedList') || this.editor.isActive('bulletList')) {
                return this.editor.chain().createParagraphNear().run();
              }
              return this.editor.commands.setHardBreak();
            },
          };
        },
      })
    ],
    content: `
      <div>
        <p></p>
      </div>
    `,
    onUpdate({ editor }) {
      // grab the text and sanitize the inputs
      const clean = DOMPurify.sanitize(editor.getHTML());
      setNewNote(clean);
    },
  });

  if (!editor) {
    return null;
  }

  const addNewNoteOnClick = () => {
    // send a new note and close the editor
    void dispatch(addNewNote(singleCategory, newNote));
    void dispatch(setEditorActive(false));
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

export default NoteEditor;