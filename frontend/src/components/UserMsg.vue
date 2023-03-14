<script>
import { eventBus } from "../services/event-bus.service.js";
export default {
  data() {
    return {
      msg: { txt: "", type: "success", timeout: null },
      gTimeout: null
    };
  },
  created() {
    eventBus.on("show-msg", this.showMsg);
  },
  methods: {
    showMsg(msg) {
        console.log('msg', msg)
      this.msg = msg;
      clearTimeout(this.gTimeout);
      this.gTimeout = setTimeout(
        () => (this.msg.txt = ""),
        this.msg.timeout || 1500
      );
    }
  }
};
</script>
<template>
  <section :class="msg.type" v-if="msg.txt" class="user-msg">
    {{ msg.txt }}
    <button @click="msg.txt = ''">X</button>
  </section>
</template>