<script lang="ts">
import { defineComponent } from 'vue';
import { JsonForms, JsonFormsChangeEvent } from '../../config/jsonforms';
import { vanillaRenderers, mergeStyles, defaultStyles } from '../../src';
import '../../vanilla.css';

// mergeStyles combines all classes from both styles definitions into one
const myStyles = mergeStyles(defaultStyles, {
  control: { root: 'my-control' },
});

export default defineComponent({
  name: 'App',
  components: {
    JsonForms,
  },
  provide() {
    return {
      styles: myStyles,
    };
  },
  data() {
    return {
      renderers: Object.freeze(vanillaRenderers),
      schema: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            description: 'Full name',
          },
          age: {
            type: 'integer',
            description: 'Age',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'Email address',
          },
          subscribed: {
            type: 'boolean',
            description: 'Newsletter subscription',
          },
          country: {
            type: 'string',
            enum: ['US', 'UK', 'CA', 'AU'],
            description: 'Country',
          },
          users: {
            type: 'array',
            description: 'Team members',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Member name',
                },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Member email',
                },
                role: {
                  type: 'string',
                  enum: ['developer', 'designer', 'manager'],
                  description: 'Member role',
                },
              },
            },
          },
        },
      },
      uischema: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/name',
          },
          {
            type: 'Control',
            scope: '#/properties/age',
          },
          {
            type: 'Control',
            scope: '#/properties/email',
          },
          {
            type: 'Control',
            scope: '#/properties/subscribed',
          },
          {
            type: 'Control',
            scope: '#/properties/country',
          },
          {
            type: 'Control',
            scope: '#/properties/users',
          },
        ],
      },
      data: {
        name: 'Alice Johnson',
        age: 25,
        email: 'alice@example.com',
        subscribed: false,
        country: 'US',
        users: [
          { name: 'Bob Smith', email: 'bob@example.com', role: 'developer' },
          { name: 'Carol White', email: 'carol@example.com', role: 'designer' },
        ],
      },
      suggestions: {
        name: 'Jane Doe',
        age: 30,
        email: 'jane.doe@company.com',
        subscribed: true,
        country: 'UK',
        users: [
          { name: 'John Doe', email: 'john@company.com', role: 'manager' },
          { name: 'Sarah Williams', email: 'sarah@company.com', role: 'developer' },
          { name: 'Mike Chen', email: 'mike@company.com', role: 'designer' },
        ],
      },
    };
  },
  methods: {
    onChange(event: JsonFormsChangeEvent) {
      console.log('Data changed:', event);
      this.data = event.data;
    },
  },
});
</script>

<template>
  <div class="container">
    <header>
      <h1>JSON Forms - Suggestions Test</h1>
      <p>Testing array suggestions functionality</p>
    </header>

    <aside class="example-selector">
      <div class="data">
        <details open>
          <summary>Current Data</summary>
          <pre>{{ JSON.stringify(data, null, 2) }}</pre>
        </details>

        <details>
          <summary>Suggestions</summary>
          <pre>{{ JSON.stringify(suggestions, null, 2) }}</pre>
        </details>

        <details>
          <summary>Schema</summary>
          <pre>{{ JSON.stringify(schema, null, 2) }}</pre>
        </details>

        <details>
          <summary>UI Schema</summary>
          <pre>{{ JSON.stringify(uischema, null, 2) }}</pre>
        </details>
      </div>
    </aside>

    <main class="form">
      <article class="flow-container">
        <json-forms :data="data" :schema="schema" :uischema="uischema" :renderers="renderers" :suggestions="suggestions"
          @change="onChange" />
      </article>
    </main>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 0 30% auto 0;
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
  grid-template-areas:
    'header header header header'
    '. aside main .';
}

.container>header {
  grid-area: header;
  background-color: #00021e;
  padding: 2rem;
  color: white;
  text-align: center;
}

.container>aside {
  grid-area: aside;
}

.container>main {
  grid-area: main;
}

aside .data {
  background-color: white;
  padding: 2rem;
}

aside summary {
  font-size: 0.83em;
  font-weight: bold;
  margin: 0 0 1em;
  cursor: pointer;
}

aside details pre {
  background: #eee;
  border: 0;
  padding: 1rem;
  min-height: 200px;
  max-height: 500px;
  overflow: scroll;
  font-size: 0.85em;
}

main article {
  background-color: white;
  padding: 2rem;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
  background: #f3f4fa;
}
</style>
