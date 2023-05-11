import * as path from 'path';
import markdownItInclude from 'markdown-it-include';
import { DefaultThemeConfig, defineConfig, PluginTuple } from 'vuepress/config';

const docsVersion = "VERSION";
const base = process.env.NODE_ENV === "development" ? '/chartjs-plugin-annotation/master/' : `/chartjs-plugin-annotation/${docsVersion}/`;

export default defineConfig({
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
        {base: '/samples', alternative: ['intro']},
      ],
    }],
    [
      'vuepress-plugin-typedoc',
      {
        entryPoints: ['../../types/index.d.ts'],
        hideInPageTOC: true,
        tsconfig: 'tsconfig.json',
        sidebar: {
          fullNames: true,
          parentCategory: 'API',
        },
      },
    ],
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
                target: '_self',
              },
              {
                type: 'versions',
                text: '{{version}}{{tag|suffix}}',
                link: '/chartjs-plugin-annotation/{{version}}/',
                exclude: /^[0]\.[0-4]\./,
                group: 'minor',
                target: '_self',
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
  ] as PluginTuple[],
  chainWebpack(config) {
    config.module
      .rule('chart.js')
      .include.add(path.resolve('node_modules/chart.js')).end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: ['@babel/preset-env']
      })
      .end();
  },
  markdown: {
    extendMarkdown: md => {
      md.use(markdownItInclude, path.resolve(__dirname, '../'));
    }
  },
  themeConfig: {
    repo: 'chartjs/chartjs-plugin-annotation',
    logo: '/favicon.png',
    lastUpdated: 'Last Updated',
    searchPlaceholder: 'Search...',
    editLinks: true,
    docsDir: 'docs',
    chart: {
      imports: [
        ['scripts/register.js', 'Register'],
        ['scripts/defaults.js', 'Defaults'],
        ['scripts/utils.js', 'Utils'],
      ]
    },
    nav: [
      {text: 'Home', link: '/'},
      {text: 'API', link: '/api/'},
      {text: 'Guide', link: '/guide/'},
      {text: 'Samples', link: '/samples/'},
    ],
    sidebar: {
      '/api/': {
        title: 'API'
      },
      '/guide/': [
        '',
        'integration',
        'usage',
        'options',
        'configuration',
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
        },
        {
          title: 'Migration',
          collapsable: true,
          children: [
            'migrationV3',
            'migrationV2',
            'migrationV1'
          ]
        },
      ],
      '/samples/': [
        'intro',
        {
          title: 'Box annotations',
          children: [
            'box/basic',
            'box/quarters',
            'box/disclosure',
            'box/canvas',
            'box/image',
            'box/initAnim',
            'box/gradient'
          ]
        },
        {
          title: 'Ellipse annotations',
          children: [
            'ellipse/basic',
            'ellipse/rotation',
            'ellipse/label',
            'ellipse/image'
          ]
        },
        {
          title: 'Label annotations',
          children: [
            'label/basic',
            'label/point',
            'label/callout',
            'label/canvas',
            'label/image',
            'label/innerChart',
            'label/lowerUpper',
            'label/fontsColors',
            'label/autoscaling'
          ]
        },
        {
          title: 'Line annotations',
          children: [
            'line/basic',
            'line/curve',
            'line/lowerUpper',
            'line/limited',
            'line/average',
            'line/standardDeviation',
            'line/callout',
            'line/visibility',
            'line/labelVisibility',
            'line/canvas',
            'line/image',
            'line/datasetBars',
            'line/animation',
            'line/hook'
          ]
        },
        {
          title: 'Point annotations',
          children: [
            'point/basic',
            'point/combined',
            'point/outsideChartArea',
            'point/shadow',
            'point/initAnim'
          ]
        },
        {
          title: 'Polygon annotations',
          children: [
            'polygon/basic',
            'polygon/stop',
            'polygon/outsideChartArea',
            'polygon/shadow'
            ]
        },
        {
          title: 'Charts',
          children: [
            'charts/bar',
            'charts/line'
          ],
        },
        {
          title: 'Interaction',
          children: [
            'interaction/interaction',
            'interaction/dragging',
            'interaction/selection',
            'interaction/cartesianplane'
          ],
        },
        'utils'
      ]
    }
 } as DefaultThemeConfig
});
