export const contentBlockSchema = [
  {
    name: "hero",
    label: "Hero",
    fields: [
      {
        type: "string",
        name: "headline",
        label: "Headline",
        required: true,
      },
      {
        type: "string",
        name: "subheadline",
        label: "Sub Headline",
        ui: {
          component: "textarea",
        },
      },
      {
        type: "image",
        name: "backgroundImage",
        label: "Background Image",
      },
    ],
  },
  {
    name: "features",
    label: "Features",
    fields: [
      {
        type: "string",
        name: "title",
        label: "Title",
      },
      {
        type: "object",
        name: "features",
        label: "Features",
        list: true,
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "icon",
            label: "Icon",
          },
        ],
      },
    ],
  },
];

export const postSchema = {
  type: "object",
  fields: [
    {
      type: "string",
      name: "title",
      label: "Title",
      isTitle: true,
      required: true,
    },
    {
      type: "string",
      name: "description",
      label: "Description",
      ui: {
        component: "textarea",
      },
    },
    {
      type: "datetime",
      name: "date",
      label: "Date",
      required: true,
    },
    {
      type: "image",
      name: "heroImage",
      label: "Hero Image",
    },
    {
      type: "rich-text",
      name: "body",
      label: "Body",
      isBody: true,
      templates: [...contentBlockSchema],
    },
  ],
};
