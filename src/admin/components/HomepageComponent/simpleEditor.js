const Editor = {
  commands: [
    {
      name: 'removeFormat',
      action () {
        document.execCommand('removeFormat');
      }
    }, {
      name: 'bold',
      action () {
        document.execCommand('bold');
      }
    }, {
      name: 'italic',
      action () {
        document.execCommand('italic');
      }
    }, {
      name: 'underline',
      action () {
        document.execCommand('underline');
      }
    }, {
      name: 'subscript',
      action () {
        document.execCommand('subscript');
      }
    }, {
      name: 'superscript',
      action () {
        document.execCommand('superscript');
      }
    }
  ]
}

export default Editor;