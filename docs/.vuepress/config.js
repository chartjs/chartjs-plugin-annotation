module.exports = {
  dest: 'dist/docs',
  title: 'chartjs-plugin-annotation',
  description: 'Annotations for Chart.js',
  theme: 'chartjs',
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
            'types/line',
            'types/point'
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
            'types/line',
            'types/point'
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
