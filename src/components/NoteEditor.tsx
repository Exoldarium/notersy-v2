import styled from 'styled-components';
import { EditorContent, useEditor } from '@tiptap/react';
import CharacterCount from '@tiptap/extension-character-count';
import HardBreak from '@tiptap/extension-hard-break';
import StarterKit from '@tiptap/starter-kit';

import { parseToNumber } from '../utils/parseData';

const NoteEditorStyles = styled.div`
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0.2rem;
    border: 1px solid black;
    border-radius: 3px;
    p {
      margin: 0;
    }
  }
`;

const NoteEditor = () => {
  // const [state, setState] = useState('');
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
      // grabs the text, on change event
      // setState(editor.getText());
      console.log(JSON.stringify(editor.getJSON()));
    },
  });

  if (!editor) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const characterCount = parseToNumber(editor.storage.characterCount.characters());

  return (
    <NoteEditorStyles>
      <div>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet</button>
      </div>
      <EditorContent editor={editor} />
      <div>
        {characterCount}/1500
      </div>
    </NoteEditorStyles>
  );
};

export default NoteEditor;