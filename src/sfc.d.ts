declare module "*.vue" {
  import Vue from 'vue'
  export default Vue
}

declare module 'vue/types/vue' {
  interface VueConstructor<V extends Vue> {
    install: Function;
    $utils: any;
  }

  interface Vue {
    $utils: any;
  }
}