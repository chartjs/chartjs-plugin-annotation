const ChartEditorPlugin = require('./plugins/chart-editor');

module.exports = {
  title: 'chartjs-plugin-annotation',
  description: 'Annotations for Chart.js',
  base: '/chartjs-plugin-annotation/',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
  ],
  plugins: [
    ['redirect', {
      redirectors: [
        // Default sample page when accessing /samples.
        {base: '/samples', alternative: ['types/line']},
      ],
    }],
    [ChartEditorPlugin, {
      imports: [
        ['scripts/register.js'],
        ['scripts/defaults.js'],
        ['scripts/utils.js', 'Utils'],
      ]
    }],
  ],
  themeConfig: {
    repo: 'chartjs/chartjs-plugin-annotation',
    logo: '/favicon.png',
    lastUpdated: 'Last Updated',
    editLinks: false,
    docsDir: 'samples',
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
            'types/line',
            'types/point'
          ]
        }
      ],
      '/samples/': [
        {
          title: 'Types',
          collapsable: false,
          children: [
            'types/line',
            'types/box',
          ],
        },
      ]
    }
  }
};
