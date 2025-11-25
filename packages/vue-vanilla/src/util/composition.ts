import { useStyles } from '../styles';
import { computed, ref, watch } from 'vue';
import merge from 'lodash/merge';
import cloneDeep from 'lodash/cloneDeep';
import {
  composePaths,
  findUISchema,
  getFirstPrimitiveProp,
  Resolve,
} from '@jsonforms/core';
import { debugVanillaControl, debugAction } from '../../../vue/src/suggestionsDebug';

/**
 * Adds styles, isFocused, appliedOptions and onChange
 */
export const useVanillaControl = <
  I extends { control: any; handleChange: any }
>(
  input: I,
  adaptTarget: (target: any) => any = (v) => v.value
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );

  const isFocused = ref(false);
  const suggestionState = ref<'pending' | 'accepted' | 'rejected'>('pending');

  const onChange = (event: Event) => {
    input.handleChange(input.control.value.path, adaptTarget(event.target));
  };

  const controlWrapper = computed(() => {
    const { id, description, errors, label, visible, required } =
      input.control.value;
    return { id, description, errors, label, visible, required };
  });

  const onAcceptSuggestion = () => {
    const { path, suggestion } = input.control.value;
    if (suggestion !== undefined) {
      debugAction('accept', path, suggestion);
      suggestionState.value = 'accepted';
      input.handleChange(path, suggestion);
    }
  };

  const onRejectSuggestion = () => {
    const { path, suggestion } = input.control.value;
    debugAction('reject', path, suggestion);
    suggestionState.value = 'rejected';
  };

  const showSuggestion = computed(() => {
    return (
      input.control.value.hasSuggestion &&
      suggestionState.value === 'pending'
    );
  });

  // Debug log vanilla control setup and changes
  watch(
    () => ({
      path: input.control.value.path,
      hasSuggestion: input.control.value.hasSuggestion,
      suggestion: input.control.value.suggestion,
      suggestionState: suggestionState.value,
    }),
    (current) => {
      debugVanillaControl(
        current.path,
        current.hasSuggestion,
        current.suggestion,
        current.suggestionState
      );
    },
    { immediate: true }
  );

  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    isFocused,
    appliedOptions,
    controlWrapper,
    onChange,
    suggestion: computed(() => input.control.value.suggestion),
    hasSuggestion: computed(() => input.control.value.hasSuggestion),
    showSuggestion,
    suggestionState,
    onAcceptSuggestion,
    onRejectSuggestion,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useVanillaLayout = <I extends { layout: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.layout.value.config),
      cloneDeep(input.layout.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.layout.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles and appliedOptions
 */
export const useVanillaLabel = <I extends { label: any }>(input: I) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.label.value.config),
      cloneDeep(input.label.value.uischema.options)
    )
  );
  return {
    ...input,
    styles: useStyles(input.label.value.uischema),
    appliedOptions,
  };
};

/**
 * Adds styles, appliedOptions and childUiSchema
 */
export const useVanillaArrayControl = <I extends { control: any }>(
  input: I
) => {
  const appliedOptions = computed(() =>
    merge(
      {},
      cloneDeep(input.control.value.config),
      cloneDeep(input.control.value.uischema.options)
    )
  );

  const childUiSchema = computed(() =>
    findUISchema(
      input.control.value.uischemas,
      input.control.value.schema,
      input.control.value.uischema.scope,
      input.control.value.path,
      undefined,
      input.control.value.uischema,
      input.control.value.rootSchema
    )
  );

  const childLabelForIndex = (index: number) => {
    const childLabelProp =
      input.control.value.uischema.options?.childLabelProp ??
      getFirstPrimitiveProp(input.control.value.schema);
    if (!childLabelProp) {
      return `${index}`;
    }
    const labelValue = Resolve.data(
      input.control.value.data,
      composePaths(`${index}`, childLabelProp)
    );
    if (
      labelValue === undefined ||
      labelValue === null ||
      Number.isNaN(labelValue)
    ) {
      return '';
    }
    return `${labelValue}`;
  };
  return {
    ...input,
    styles: useStyles(input.control.value.uischema),
    appliedOptions,
    childUiSchema,
    childLabelForIndex,
  };
};
