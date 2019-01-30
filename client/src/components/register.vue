<template>
    <div id="register">
        <v-btn
        flat
        dark
        @click="dialog = !dialog">
            Register
        </v-btn>

        <!-- Modal -->
        <v-dialog v-model="dialog" width="800px">
        <v-card>
            <v-card-title
            class="grey lighten-4 py-4 title"
            >
            Sign Up For Free
            </v-card-title>
            <v-container grid-list-sm class="pa-4">
            <v-layout row wrap>
                <v-flex xs12 align-center justify-space-between>
                <v-layout align-center>
                    <v-avatar size="40px" class="mr-3">
                    <img
                        src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                        alt=""
                    >
                    </v-avatar>
                    <v-text-field
                        v-model="user.username"
                        :rules="[rules.required, rules.counter]"
                        placeholder="Username"
                    ></v-text-field>
                </v-layout>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    prepend-icon="mail"
                    placeholder="Email"
                    :rules="[rules.required, rules.email]"
                    v-model="user.email"
                ></v-text-field>
                </v-flex>
                <v-flex xs12>
                <v-text-field
                    v-model="user.password"
                    :append-icon="show1 ? 'visibility_off' : 'visibility'"
                    :rules="[rules.required, rules.min]"
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
            <v-btn flat color="primary" @click="registerUser">Register</v-btn>
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
        password: '',
        username: ''
      },
      rules: {
        required: value => !!value || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        counter: value => value.length <= 20 || 'Max 20 characters'
      }
    }
  },
  methods: {
    registerUser () {
      this.$store.dispatch('registerUser', this.user)
        .then(() => {
          this.user.email = ''
          this.user.password = ''
          this.user.username = ''
          this.dialog = false
        })
        .catch(() => {
          this.user.email = ''
          this.user.password = ''
          this.user.username = ''
        })
    }
  }
}
</script>

<style>

</style>
