/* eslint-disable prettier/prettier */
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true,
    },
    // age: Number,
  },
  setup(props) {
    return () => {
      return <div>tsx页面 {props.msg} </div>;
    };
  },
});
