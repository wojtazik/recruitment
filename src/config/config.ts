const listConfig = {
  ordering: [
    {
      value: 'asc',
      label: 'Sort A-Z'
    },
    {
      value: 'desc',
      label: 'Sort Z-A'
    }
  ],
  orderBy: [
    {
      value: 'date',
      label: 'Sort by date'
    },
    {
      value: 'title',
      label: 'Sort by title'
    }
  ],
  listType: [
    {
      value: 'list',
      label: 'List View'
    },
    {
      value: 'grid',
      label: 'Grid View'
    }
  ]
}

export { listConfig }

export default {
  languages: ['pl'],
  apiUrl: 'https://edu-api.chop-chop.org/',
  appName: 'Simple Web App',
  noActiveUserAuthEndTime: 15 * 60 * 1000
}
