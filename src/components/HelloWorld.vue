<!-- <script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)

</script> -->

<template>
  <h1 ref="title">
    {{ msg }}
  </h1>

  <div class="card">
    <button
      type="button"
      @click="count++"
    >
      count is {{ count }}
    </button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test HMR
    </p>
  </div>

  <p>
    Check out
    <a
      href="https://vuejs.org/guide/quick-start.html#local"
      target="_blank"
    >create-vue</a>, the official Vue + Vite
    starter
  </p>
  <p>
    Install
    <a
      href="https://github.com/vuejs/language-tools"
      target="_blank"
    >Volar</a>
    in your IDE for a better DX
  </p>
  <p class="read-the-docs">
    Click on the Vite and Vue logos to learn more
  </p>
</template>

<script lang="ts">
import { PropType, defineComponent, onMounted, ref } from 'vue'

interface User {
  name: string,
  age: number
}

export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    },
    abc: {
      type: Number,
      required: true
    },
    obj: {
      type: Object as PropType<User>,
      default: () => { }
    }
  },
  setup: (props) => {
    const count = ref(0)
    console.log(props.msg)
    console.log(props.obj)

    const foo = ref<{
      a: number,
      b: string
    } | null>(null)

    foo.value = {
      a: 1,
      b: 'hello'
    }

    onMounted(() => {
      console.log(title.value)
    })

    const title = ref<HTMLHeadElement | null>(null)

    return {
      count,
      title
    }
  }
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
