<template>
  <div v-if="visible" :id="id" :class="styles.control.root" :data-has-suggestion="hasSuggestion"
    :data-suggestion-state="suggestionState" :data-show-suggestion="showSuggestion">
    <label :for="id + '-input'" :class="[styles.control.label, required ? styles.control.required : '']">
      {{ label }}
      <span v-if="showAsterisk" :class="styles.control.asterisk">*</span>
    </label>
    <div :class="styles.control.wrapper">
      <slot></slot>
    </div>
    <div v-if="showSuggestion" class="suggestion-container" data-suggestion-ui="true"
      :data-suggestion-value="suggestion">
      <span class="suggestion-value">{{ suggestion }}</span>
      <div class="suggestion-actions">
        <button @click="onAcceptSuggestion" class="suggestion-accept" data-suggestion-action="accept"></button>
        <button @click="onRejectSuggestion" class="suggestion-reject" data-suggestion-action="reject"></button>
      </div>
    </div>
    <div :class="errors ? styles.control.error : styles.control.description">
      {{ errors ? errors : showDescription ? description : null }}
    </div>
  </div>
</template>

<script lang="ts">
import { isDescriptionHidden } from '@flextract/json-forms-core';
import { defineComponent, PropType } from 'vue';
import { Styles } from '../styles';
import { Options } from '../util';
import { debugWrapper } from '../../../vue/src/suggestionsDebug';

export default defineComponent({
  name: 'ControlWrapper',
  props: {
    id: {
      required: true,
      type: String,
    },
    description: {
      required: false as const,
      type: String,
      default: undefined,
    },
    errors: {
      required: false as const,
      type: String,
      default: undefined,
    },
    label: {
      required: false as const,
      type: String,
      default: undefined,
    },
    appliedOptions: {
      required: false as const,
      type: Object as PropType<Options>,
      default: undefined,
    },
    visible: {
      required: false as const,
      type: Boolean,
      default: true,
    },
    required: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    isFocused: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    styles: {
      required: true,
      type: Object as PropType<Styles>,
    },
    suggestion: {
      required: false as const,
      type: [String, Number, Boolean, Array, Object] as PropType<any>,
      default: undefined,
    },
    hasSuggestion: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    showSuggestion: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    suggestionState: {
      required: false as const,
      type: String as PropType<'pending' | 'accepted' | 'rejected'>,
      default: 'pending',
    },
    onAcceptSuggestion: {
      required: false as const,
      type: Function as PropType<() => void>,
      default: undefined,
    },
    onRejectSuggestion: {
      required: false as const,
      type: Function as PropType<() => void>,
      default: undefined,
    },
  },
  computed: {
    showDescription(): boolean {
      return !isDescriptionHidden(
        this.visible,
        this.description,
        this.isFocused,
        !!this.appliedOptions?.showUnfocusedDescription
      );
    },
    showAsterisk(): boolean {
      return this.required && !this.appliedOptions?.hideRequiredAsterisk;
    },
  },
  watch: {
    showSuggestion: {
      handler() {
        debugWrapper(
          this.id,
          this.hasSuggestion,
          this.showSuggestion,
          this.suggestionState,
          this.suggestion
        );
      },
      immediate: true,
    },
  },
});
</script>
