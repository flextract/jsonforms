/*
  The MIT License
  
  Copyright (c) 2022 STMicroelectronics and others.
  https://github.com/eclipsesource/jsonforms
  
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  
  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.
  
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/
import { ErrorObject } from 'ajv';
import { StateProps } from '../example';
import { registerExamples } from '../register';

export const additionalErrors: ErrorObject[] = [];

export const actions = [
  {
    label: 'Add additional error',
    apply: (props: StateProps) => {
      additionalErrors.push({
        instancePath: '/age',
        message: `New error #${additionalErrors.length + 1}`,
        schemaPath: '',
        keyword: '',
        params: {},
      });
      return {
        ...props,
        additionalErrors: [...additionalErrors],
      };
    },
  },
];

// Schema showcasing all 12 renderers with suggestions
export const schema = {
  type: 'object',
  properties: {
    // 1. StringControlRenderer
    name: {
      type: 'string',
      description: 'Your full name',
    },
    // 2. NumberControlRenderer
    salary: {
      type: 'number',
      description: 'Annual salary',
    },
    // 3. IntegerControlRenderer
    age: {
      type: 'integer',
      description: 'Your age',
    },
    // 4. BooleanControlRenderer
    subscribed: {
      type: 'boolean',
      description: 'Subscribe to newsletter',
    },
    // 5. DateControlRenderer
    startDate: {
      type: 'string',
      format: 'date',
      description: 'Start date',
    },
    // 6. DateTimeControlRenderer
    appointmentTime: {
      type: 'string',
      format: 'date-time',
      description: 'Appointment date and time',
    },
    // 7. TimeControlRenderer
    preferredTime: {
      type: 'string',
      format: 'time',
      description: 'Preferred contact time',
    },
    // 8. MultiStringControlRenderer
    bio: {
      type: 'string',
      description: 'Biography',
    },
    // 9. EnumControlRenderer
    country: {
      type: 'string',
      enum: ['US', 'UK', 'CA', 'AU', 'DE'],
      description: 'Country',
    },
    // 10. RadioGroupControlRenderer
    experience: {
      type: 'string',
      enum: ['junior', 'mid', 'senior', 'lead'],
      description: 'Experience level',
    },
    // 11. EnumOneOfControlRenderer
    department: {
      oneOf: [
        { const: 'engineering', title: 'Engineering' },
        { const: 'design', title: 'Design' },
        { const: 'marketing', title: 'Marketing' },
        { const: 'sales', title: 'Sales' },
      ],
      description: 'Department',
    },
    // 12. OneOfRadioGroupControlRenderer
    employmentType: {
      oneOf: [
        { const: 'full-time', title: 'Full Time' },
        { const: 'part-time', title: 'Part Time' },
        { const: 'contract', title: 'Contract' },
        { const: 'freelance', title: 'Freelance' },
      ],
      description: 'Employment type',
    },
    // 13. ArrayListRenderer
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
};

export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/salary',
    },
    {
      type: 'Control',
      scope: '#/properties/age',
    },
    {
      type: 'Control',
      scope: '#/properties/subscribed',
    },
    {
      type: 'Control',
      scope: '#/properties/startDate',
    },
    {
      type: 'Control',
      scope: '#/properties/appointmentTime',
    },
    {
      type: 'Control',
      scope: '#/properties/preferredTime',
    },
    {
      type: 'Control',
      scope: '#/properties/bio',
      options: {
        multi: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/country',
    },
    {
      type: 'Control',
      scope: '#/properties/experience',
      options: {
        format: 'radio',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/department',
    },
    {
      type: 'Control',
      scope: '#/properties/employmentType',
      options: {
        format: 'radio',
      },
    },
    {
      type: 'Control',
      scope: '#/properties/users',
    },
  ],
};

export const data: any = {
  name: '',
  subscribed: false,
  startDate: '',
  appointmentTime: '',
  preferredTime: '',
  bio: '',
  country: '',
  experience: '',
  department: '',
  employmentType: '',
  users: [
    { name: 'Alice Johnson', email: 'alice@example.com', role: 'developer' },
    { name: 'Bob Smith', email: 'bob@example.com', role: 'designer' },
  ],
};

export const suggestions = {
  name: 'Jane Smith',
  salary: 95000.5,
  age: 28,
  subscribed: true,
  startDate: '2024-01-15',
  appointmentTime: '2024-01-20T14:30:00.000Z',
  preferredTime: '14:30:00',
  bio: 'Experienced software engineer with a passion for building scalable applications and mentoring junior developers.',
  country: 'US',
  experience: 'senior',
  department: 'engineering',
  employmentType: 'full-time',
  users: [
    { name: 'John Doe', email: 'john.doe@company.com', role: 'manager' },
    { name: 'Sarah Williams', email: 'sarah.w@company.com', role: 'developer' },
    { name: 'Mike Chen', email: 'mike.chen@company.com', role: 'designer' },
  ],
};

registerExamples([
  {
    name: 'additional-errors',
    label: 'Additional errors',
    data,
    schema,
    uischema,
    actions,
    suggestions,
  },
]);
