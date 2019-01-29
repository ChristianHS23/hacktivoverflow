<template>
    <div id="login">
        <v-btn
        flat
        dark
        @click="dialog = !dialog"
        >
        Login
        </v-btn>

        <!-- Modal -->
        <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title
            class="grey lighten-4 py-4 title"
            >
            Login
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    prepend-icon="mail"
                    placeholder="Email"
                    v-model="user.email"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    v-model="user.password"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :type="show1 ? 'text' : 'password'"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                    prepend-icon="lock"
                    placeholder="Password"
                ></v-text-field>
                </v-flex>
            </v-layout>
            </v-container>
            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat color="primary" @click="loginUser">Login</v-btn>
            <v-btn flat @click="dialog = false">Cancel </v-btn>
            </v-card-actions>
        </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
  data () {
    return {
      show1: false,
      dialog: false,
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    loginUser () {
      this.$store.dispatch('loginUser', this.user)
      .then(() =>{
          this.user.email = ''
          this.user.password = ''
          this.dialog = false
      })
      .catch(err => {
          console.log(err)
      })
    }
  }
}
</script>

<style>

</style>
