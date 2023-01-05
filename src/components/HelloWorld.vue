<template>
  <div class="hello">
    {{ age }}
    {{ msg }}
    {{ name }}
    <button @click="addclick">按钮</button>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref } from "@vue/reactivity";
import { defineComponent, watchEffect } from "vue";

export default defineComponent({
  name: "HelloWorld",
  props: {
    msg: {
      type: String,
      required: true,
    },
    age: Number,
  },
  mounted() {
    console.log("111");
    console.log(1212);
  },
  setup() {
    let nameRef = ref("mdz");
    const userinfo = reactive({});
    const componentObj = computed(() => {
      return nameRef.value + "2";
    });

    // setInterval(() => {
    //   nameRef.value += 1;
    // }, 1000);
    watchEffect(() => {
      console.log(nameRef.value);
      console.log(componentObj.value);
    });
    const addclick = () => {
      console.log("我被点击了");
      console.log(userinfo);
    };
    return { name: nameRef, addclick };
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
