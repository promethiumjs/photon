import { html, ref, createRef, adaptEffect } from "promethium-js";
import "./app.css";
import ipc from "../ipc";

const App = () => {
  const input = createRef();
  const output = createRef();

  adaptEffect(() => {
    ipc.on("open", () => {
      output.value.innerHTML += "Status: Connected\n";

      ipc.on("message", (payload) => {
        output.value.innerHTML += "Server: " + payload.x + "\n";
      });
    });
  });

  const send = () => {
    ipc.emit("message", {
      mess: input.value.value,
      arr: [1, 4],
      val: {
        two: 2,
      },
    });
    input.value.value = "";
  };

  return () => html`<div class="app">
    <span>Hello Proton</span>
    <div class="ipc-test">
      <input type="text" id="input" ${ref(input)} />
      <button @click=${send}>Send</button>
      <pre id="output" ${ref(output)}></pre>
    </div>
  </div> `;
};

export default App;