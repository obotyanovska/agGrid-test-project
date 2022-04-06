export interface IResponseVideoData {
  [propName: string]: string | object | object [] | undefined,
  etag: string,
  items: IItem [],
  kind: string,
  nextPageToken: string,
  pageInfo: object,
  regionCode: string,
}

export interface IItem {
  id: {
    videoId: string,
  }
  snippet: {
    description: string,
    publishedAt: string,
    thumbnails: {
      default: {
        url: string
      }
    }
    title: string
  }
}

export interface ITableData {
  id: string,
  preview: string, 
  publishedOn: string,
  videoTitle: string,
  description: string,
}

export interface IErrrorData {
  message: string
}

export interface IRequestVideo {
  searchValue: string
}
