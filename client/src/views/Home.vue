<template>
  <div id="Home">
    <div v-for="(question, i) in questions" :key="i">
      <questionCard  :question="question" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import questionCard from '@/components/questionCard.vue'
export default {
  computed: mapState([
    'questions'
  ]),
  components: {
    questionCard
  },
  created() {
    this.$store.dispatch('getQuestion')
  },
}
</script>
