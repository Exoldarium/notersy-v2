import CharacterCount from '@tiptap/extension-character-count';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useState } from 'react';
import styled from 'styled-components';
import { parseToNumber } from '../utils/parseData';
import HardBreak from '@tiptap/extension-hard-break';

const TipTapStyles = styled.div`
  .tiptap {
    min-height: 100px;
    height: fit-content;
    padding: 0;
    border: 1px solid black;
    border-radius: 3px;
    p {
      margin: 0;
    }
  }
`;

const Tiptap = () => {
  const [state, setState] = useState('');
  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount.configure({
        limit: 1500,
      }),
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => {
              if (this.editor.isActive('orderedList') || this.editor.isActive('bulletList')) {
                return this.editor.chain().createParagraphNear().run();
              }
              return this.editor.commands.setHardBreak();
            },
          };
        },
      })
    ],
    content: "<div><p>Hello</p></div>",
    onUpdate({ editor }) {
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
    <TipTapStyles>
      <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
      <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
      <button onClick={() => editor.chain().focus().toggleBulletList().run()}>Bullet</button>
      <EditorContent editor={editor} />
      <div>
        {characterCount}/1500
      </div>
      {/* <FloatingMenu editor={editor}>This is the floating menu</FloatingMenu>
        <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu> */}
    </TipTapStyles>
  );
};

export default Tiptap;