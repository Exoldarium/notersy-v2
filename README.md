# Notersy
A small chrome extension that allows users to add, create, update and delete notes, group them in categories. The notes are saved in Chrome's local storage so they can be accesed at any time.

## Main Features

- Create, delete and update categories and organize your notes however you wish

- Add selected text from a webpage using the context menu

- Create custom notes and format them using the in-built rich text editor

- Notes are saved automatically so that you can always continue where you left off

## Installation

- [Google Chrome](https://chromewebstore.google.com/detail/notersy/ffpmjnpjajlkfaidlonjegneehmccaja)
- [Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/kmakjohiodknfghojeadaalgilbnndha)

You can also install it on your own from [Github Releases](https://github.com/Exoldarium/notersy-v2/releases). Bear in mind that while extension might work in other browsers, Chrome and Edge are the only supported browsers at the moment.

## Contributing

### Donate

If you are enjoying my work and would like to support me [you can buy me a coffee!](https://ko-fi.com/dusan36845)

### Contributing code

If you have a fix for any of the bugs feel free to submit a PR, as long as it doesn't affect the functionality. 

#### Requirments

- Latest Node stable release.

#### Development

- ``npm install`` to install the dependencies
- ``npm run dev`` to run developer mode
- ``npm run lint`` to check the style
- ``npm run test`` testing
- ``npm run build`` builds the extension, you can add it to your browser manually

#### Building

- ``npm install`` to install the dependencies
- ``npm run build``builds the extension. The build will be the ``/dist`` folder. You can add the unpacked extension to your browser manually. You will have to enable developer mode in your browser.

## About

Notersy v2 is the updated version of an extension i built for my CS50x final project. I decided to re-do the extension with some of the knowledge i have gained in the previous couple of months and use some of the technologies that i have been practicing. The core of the extension is still the same as v1 Notersy and it has all the same functions. The UI is a bit more intuitive and it gives users more control over how the notes are displayed and created. In v1 Notersy i created my own rich text editor and it was a very valuable learning experience but here i decided to use Tiptap as it offers more functionality and it is obviously more refined. 

## Technologies used

I'm using React.js and TypeScript, Redux for state management, Vitest for testing and Styled components for styling.
Rich text editor is done using [Tiptap](https://tiptap.dev/).
The extension is bundled using [Vite](https://vitejs.dev/) and [CRXJS](https://crxjs.dev/vite-plugin/).
