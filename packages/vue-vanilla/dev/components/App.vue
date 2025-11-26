<script lang="ts">
import { defineComponent } from 'vue';
import { JsonForms, JsonFormsChangeEvent } from '../../config/jsonforms';
import { vanillaRenderers, mergeStyles, defaultStyles } from '../../src';
import '../../vanilla.css';
import schema from './schema.json';
import uischema from './ui.schema.json';

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
      schema,
      uischema,
      data: {
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        phoneNumber: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'United States'
        },
        primaryCountryOfCitizenship: 'United States',
        hasMultipleCitizenship: 'No',
        employment: {
          employmentStatus: ''
        }
      },
      suggestions: {
        firstName: 'Jane',
        lastName: 'Doe',
        birthday: '1990-05-15',
        email: 'jane.doe@example.com',
        phoneNumber: '(555) 123-4567',
        address: {
          street: '123 Main Street',
          city: 'San Francisco',
          state: 'California',
          zipCode: '94102',
          country: 'United States'
        },
        primaryCountryOfCitizenship: 'United States',
        hasMultipleCitizenship: 'No',
        employment: {
          employmentStatus: 'Employed',
          companyName: 'Tech Corp',
          jobTitle: 'Software Engineer',
          industry: 'Technology',
          baseSalary: 120000,
          companyAddress: {
            street: '456 Tech Blvd',
            city: 'San Francisco',
            state: 'California',
            zipCode: '94103',
            country: 'United States'
          },
          hasCommission: 'No',
          hasBonus: 'Yes',
          bonusDetails: 'Annual performance bonus',
          hasStockCompensation: 'Yes',
          stockCompensationDetails: 'RSUs vesting over 4 years'
        }
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
