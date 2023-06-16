
<script>
export default {
  methods: {
    redireccion(id) {
      switch (id) {
        case 1:
          this.$router.push({ name: 'barraNave_clie' });
          break;
        case 2:
          this.$router.push({ name: 'page2' });
          break;
        case 3:
          this.$router.push({ name: 'page3' });
          break;
        case 4:
          this.$router.push({ name: 'barraNave_cc' });
          break;
        case 5:
          this.$router.push({name: 'SucursalBarra'});
          break;
        default:
          break;
      }
    }
  }
};
</script>
