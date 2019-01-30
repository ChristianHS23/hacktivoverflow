<template>
  <v-app id="inspire">
    <v-navigation-drawer
      :clipped="$vuetify.breakpoint.lgAndUp"
      v-model="drawer"
      fixed
      app
      v-if="check.isLogin"
    >
      <v-list dense>
        <template>
          

          <v-list-tile @click="dialog = false" to="/">
            <v-list-tile-action>
              <v-icon>contacts</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                Asked
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>

          <v-list-group
            v-if="list"
            v-model="list.model"
            :prepend-icon="list.model ? list.icon : list['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  Need Help?
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile
              @click="dialog = false"
              to="/ask"
            >

              <v-list-tile-action >
                <v-icon>add</v-icon>
              </v-list-tile-action>
              <!-- <router-link to="/ask" tag="button"> -->
              <v-list-tile-content>
                <v-list-tile-title>
                  Create New Question
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>

        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <router-link to="/" tag="button">
          <span class="hidden-sm-and-down">Stalker Overflow</span>
        </router-link>
      </v-toolbar-title>
      <v-text-field
        flat
        solo-inverted
        hide-details
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
      <v-spacer></v-spacer>

      <v-btn icon to="/">
        <v-icon>home</v-icon>
      </v-btn>

        <register v-if="check.isNotLogin" />
        <login v-if="check.isNotLogin"/>

        <v-btn
        v-if="check.isLogin"
        flat
        dark
        @click="logout"
        >
        Logout
        </v-btn>

    </v-toolbar>
    <v-content>
          <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import register from '@/components/register.vue'
import login from '@/components/login.vue'
import { mapState } from 'vuex'

export default {
  data: () => ({
    drawer: null,
    list : {
        icon: 'keyboard_arrow_up',
        'icon-alt': 'keyboard_arrow_down',
        text: 'Need Help?',
        model: true,
      }
  }),
  computed: mapState([
    'check'
  ]),
  components: {
    register,
    login
  },
  props: {
    source: String
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$store.dispatch('checkLogin')
    }
  },
  created () {
    this.$store.dispatch('checkLogin')
  }
}
</script>
