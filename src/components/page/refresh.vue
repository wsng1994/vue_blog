<template>
</template>

<script>
  export default {
    name: "refresh",
    beforeCreate(){
      this.$router.push(this.$route.query.path)
    },
  };

</script>

<style>
</style>
