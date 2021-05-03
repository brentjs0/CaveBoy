<template>
  <div class="fileControl">
    <label class="fileControl__label" v-bind:for="inputId">{{
      labelText
    }}</label>
    <input
      class="fileControl__input"
      type="file"
      v-bind:id="inputId"
      v-bind:name="inputId"
      @change="onChange"
    />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  props: {
    inputId: String,
    labelText: String,
  },
})
export default class FileControl extends Vue {
  inputID!: string;
  labelText!: string;
  onChange(event: Event): void {
    if (event?.target && event.target instanceof HTMLInputElement) {
      if (event.target.files) {
        this.$emit('files-selected', event.target.files);
      }
    }
  }
}
</script>

<style lang="scss">
@use '../style/base/mixins';

.fileControl {
  &__label {
    @include mixins.button(true);
  }

  &__input {
    @include mixins.visually-hidden;
  }
}
</style>
