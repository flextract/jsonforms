<template>
  <div v-if="visible" :id="id" :class="styles.control.root" :data-has-suggestion="hasSuggestion"
    :data-suggestion-state="suggestionState" :data-show-suggestion="showSuggestion"
    :data-suggestion-expanded="suggestionExpanded">
    <label :for="id + '-input'" :class="[styles.control.label, required ? styles.control.required : '']">
      {{ label }}
      <span v-if="showAsterisk" :class="styles.control.asterisk">*</span>
    </label>
    <div :class="styles.control.wrapper">
      <slot></slot>
    </div>
    <div v-if="showSuggestion"
      :class="['suggestion-container', suggestionExpanded ? 'suggestion-container--expanded' : 'suggestion-container--collapsed']"
      data-suggestion-ui="true"
      :data-suggestion-value="suggestion"
      :data-suggestion-expanded="suggestionExpanded">
      <span class="suggestion-value">{{ suggestion }}</span>
      <div class="suggestion-actions">
        <button @click="onAcceptSuggestion" class="suggestion-accept" data-suggestion-action="accept">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5"></path>
          </svg>
        </button>
        <button @click="onRejectSuggestion" class="suggestion-reject" data-suggestion-action="reject">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
        <button @click="onToggleSuggestionExpanded" class="suggestion-toggle" data-suggestion-action="toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
            <path d="M20 2v4"></path>
            <path d="M22 4h-4"></path>
            <circle cx="4" cy="20" r="2"></circle>
          </svg>
        </button>
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
    suggestionExpanded: {
      required: false as const,
      type: Boolean,
      default: false,
    },
    onToggleSuggestionExpanded: {
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
