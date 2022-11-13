// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const tailwind = require("tailwindcss");
const postcssPlugins = [tailwind()];

module.exports = {
  siteName: "Movil",
  siteUrl: "https://twblog.terabytetiger.com",
  plugins: [{
      use: '@gridsome/source-airtable',
      options: {
        apiKey: process.env.AIRTABLE_KEY, // required
        base: process.env.AIRTABLE_BASE, // required
        tables: [{
            name: 'tel', // required
            typeName: 'tel', // required
            select: {}, // optional,
            links: [ // optional
              {
                fieldName: 'Operador',
                typeName: 'Operador',
                linkToFirst: false // optional
              }
            ]
          },
          {
            name: '', // required
            typeName: '', // required
          },
        ],
        tableName: 'Operador', // required
      },
    },
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        typeName: "Post",
        remark: {},
      },
    },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        include: ["/", "/blog/**"],
      },
    },
  ],

  templates: {
    YOUR_TYPE_NAME: 'Operador', // optional
  },

  transformers: {
    remark: {
      plugins: [
        [
          "remark-autolink-headings",
          {
            behavior: "wrap",
            linkProperties: {
              ariaHidden: "true",
              tabIndex: -1,
            },
          },
        ],

        [
          "gridsome-plugin-remark-prismjs-all",
          {
            showLineNumbers: true,
            aliases: {
              vue: "html",
              cmd: "bash",
              dos: "bash",
            },
          },
        ],
      ],
    },
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: postcssPlugins,
      },
    },
  },
};
