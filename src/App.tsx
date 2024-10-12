import { useState, useEffect } from 'react'
import './App.css'
import { marked } from 'marked';
import markedCodePreview from 'marked-code-preview';


marked.setOptions({
  gfm: true, // Enable GitHub flavored markdown
  breaks: true, // Enable line breaks in markdown
});


function Editor({value,sendEvent}){
  return(
    <div className='editor'>
      <h2>Editor</h2>
      <textarea value={value} name="editor-text" id="editor" onChange={sendEvent}></textarea>
    </div>
  )
}

function Previewer({markdown}){

  let m = marked.use(markedCodePreview).parse(markdown);        
  // marked.parse(markdown,{gfm: true, breaks:true});
  console.log(m)
  return(
      <div id="preview" dangerouslySetInnerHTML={{ __html: m }} />
  )
}

function App() {
  const [markdownText, setMarkdownText] = useState('')
  useEffect(()=>{
    const markdown = 
`# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuffw:

Heres some code, \`\`\`<div></div>\`\`\`, between 3 backticks.

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
      - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)

\`\`\`html code
function anotherExample(firstLine, lastLine) {
  if (firstLine == lastLine ) {
    return multiLineCode;
  }
}
\`\`\`
`;


    setMarkdownText(markdown)
  }, [])

  const changeMarkdown = (event) =>{
      setMarkdownText(event.target.value);
  }
  return (
    <>
      <div id="container">
        <h1>Markdown previewer</h1>
        <div id='review_editor'>
          <Editor value={markdownText} sendEvent={changeMarkdown}/>
          <Previewer markdown={markdownText} />
          </div>
        </div>
    </>
  )
}

export default App