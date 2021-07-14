<script type="text/jsx">
// import { PropType } from "vue";

// interface fn {
//   (...args: any[]): any;
// }

export default {
  name: "YzlTableCell",
  props: {
    renderer: { type: Function,
     default:function(){

    } }
  },
  render(h) {
    const me = this;
    return me.renderer(h);
  }
};
</script>
