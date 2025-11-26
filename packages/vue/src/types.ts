import {
  CoreActions,
  Dispatch,
  JsonFormsCore,
  JsonFormsSubStates,
} from '@flextract/json-forms-core';

export interface JsonFormsSubStatesWithSuggestions extends JsonFormsSubStates {
  suggestions?: any;
  suggestionsExpanded?: boolean;
}

export interface InjectJsonFormsState {
  jsonforms: JsonFormsSubStatesWithSuggestions;
}
export interface InjectJsonFormsDispatch {
  dispatch: Dispatch<CoreActions>;
}

export type JsonFormsChangeEvent = Pick<JsonFormsCore, 'data' | 'errors'>;

export type MaybeReadonly<T> = T | Readonly<T>;
