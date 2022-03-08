

export default function Log(){
    return(
        <>
        <script defer src="./index.js"></script>
        <link rel="stylesheet" href="my-demo.css" />

        <section id="login" className="panel">
        <div className="row">
          <label id="labelLogin"
            >1. Click the button to log into
            <span id="solid_identity_provider"
              >...provided by the JavaScript code...</span
            >:
          </label>
          <button name="btnLogin" id="btnLogin">Login</button>
          <p id="labelStatus" className="labelStatus"></p>
        </div>
      </section>
      <div id="read" className="panel">
       <div className="row">
         <form id="writeForm">
           <label id="writelabel">2. Write your name: </label>
           <input
             type="text"
             id="input_name"
             name="name"
             placeholder="Your name here"
           />
           <button type="submit">
             Write to Profile
           </button>
         </form>
       </div>

       <dl className="display">
         <dt>Writing status:&nbsp</dt>
         <dd id="labelWriteStatus" className="labelStatus">...not written yet...</dd>
       </dl>
     </div>

     <div id="read" className="panel">
       <div className="row">
         <form id="readForm">
           <label id="readlabel" >
               3. Read back name (anyone's!) from their WebID:
           </label>
           <input
             type="url"
             id="webID"
             name="webID"
             placeholder="...not logged in yet - but enter any WebID to read from its profile..."
           />
           <button type="submit" name="btnRead" id="btnRead">
             Read Profile
           </button>
         </form>
       </div>
       <dl className="display">
         <dt>Formatted Name (FN) read from Pod:&nbsp</dt>
         <dd id="labelFN">...not read yet...</dd>
       </dl>
     </div>
     </>
    );
}