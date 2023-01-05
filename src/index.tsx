/* eslint-disable */
import { defineComponent } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import NewPage from "./components/newPage";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div>
          <img src={require("./assets/logo.png")} alt="" />
          <HelloWorld age={2} msg="12345" />
          <NewPage msg="123" />
        </div>
      );
    };
  },
});
