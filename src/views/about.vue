<template>
  <div class="about">
    <!--<h1>This is an about page</h1>-->
    <div>Test task for V-Jet Group</div>
    <div class="candidate">candidate</div>
    <div>Alexander Lyakhov</div>
  </div>
</template>

<style lang="scss" scoped>
.about {
  color: $text-200;
  background: $bg-800;
  text-align: center;
  padding: .75rem;

  div {
    font-size: 1.25rem;
    padding: .5rem 0;

    &.candidate {
      font-size: 1rem;
    }
  }
}
</style>
