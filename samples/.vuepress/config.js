const ChartEditorPlugin = require('./plugins/chart-editor');

module.exports = {
  title: 'chartjs-plugin-annotation/samples',
  description: 'Annotations for Chart.js',
  base: '/chartjs-plugin-annotation/samples/',
  head: [
    ['link', {rel: 'icon', href: '/favicon.png'}],
  ],
  plugins: [
    [ChartEditorPlugin, {
      imports: [
        ['register.js'],
        ['defaults.js'],
        ['utils.js', 'Utils'],
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
    ],
    sidebar: {
      '/': [
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
