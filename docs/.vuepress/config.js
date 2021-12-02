const docsVersion = "VERSION";
const base = process.env.NODE_ENV === "development" ? '/chartjs-plugin-annotation/master/' : `/chartjs-plugin-annotation/${docsVersion}/`;

module.exports = {
  dest: 'dist/docs',
  title: 'chartjs-plugin-annotation',
  description: 'Annotations for Chart.js',
  theme: 'chartjs',
  base,
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
  ],
  plugins: [
    ['flexsearch'],
    ['redirect', {
      redirectors: [
        // Default sample page when accessing /samples.
        {base: '/samples', alternative: ['types/line']},
      ],
    }],
    ['@simonbrunel/vuepress-plugin-versions', {
      filters: {
        suffix: (tag) => tag ? ` (${tag})` : '',
        title: (v, vars) => window.location.href.includes('master') ? 'Development (master)' : v + (vars.tag ? ` (${tag})` : ''),
      },
      menu: {
        text: '{{version|title}}',
        items: [
          {
            text: 'Documentation',
            items: [
              {
                text: 'Development (master)',
                link: '/chartjs-plugin-annotation/master/',
              },
              {
                type: 'versions',
                text: '{{version}}{{tag|suffix}}',
                link: '/chartjs-plugin-annotation/{{version}}/',
                exclude: /^[0]\.[0-4]\./,
                group: 'minor',
              }
            ]
          },
          {
            text: 'Release notes (5 latest)',
            items: [
              {
                type: 'versions',
                limit: 5,
                target: '_blank',
                group: 'patch',
                link: 'https://github.com/chartjs/chartjs-plugin-annotation/releases/tag/v{{version}}'
              }
            ]
          }
        ]
      },
    }],
  ],
  themeConfig: {
    repo: 'chartjs/chartjs-plugin-annotation',
    logo: '/favicon.png',
    lastUpdated: 'Last Updated',
    searchPlaceholder: 'Search...',
    editLinks: true,
    docsDir: 'docs',
    chart: {
      imports: [
        ['scripts/register.js'],
        ['scripts/defaults.js'],
        ['scripts/utils.js', 'Utils'],
      ]
    },
    nav: [
      {text: 'Home', link: '/'},
      {text: 'Guide', link: '/guide/'},
      {text: 'Samples', link: '/samples/'},
    ],
    sidebar: {
      '/guide/': [
        '',
        'integration',
        'usage',
        'options',
        'interaction',
        {
          title: 'Annotations',
          collapsable: false,
          children: [
            'types/box',
            'types/ellipse',
            'types/label',
            'types/line',
            'types/point',
            'types/polygon'
          ]
        }
      ],
      '/samples/': [
        'intro',
        {
          title: 'Types',
          collapsable: false,
          children: [
            'types/box',
            'types/ellipse',
            'types/label',
            'types/line',
            'types/point',
            'types/polygon'
          ],
        },
        {
          title: 'Charts',
          collapsable: false,
          children: [
            'charts/bar',
            'charts/line',
          ],
        },
      ]
    }
  }
};
