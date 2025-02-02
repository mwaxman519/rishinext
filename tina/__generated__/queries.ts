const PageDocument = `
  query PageDocument($relativePath: String!) {
    page(relativePath: $relativePath) {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
      title
      description
      body
    }
  }
`;

const PostDocument = `
  query PostDocument($relativePath: String!) {
    post(relativePath: $relativePath) {
      _sys {
        filename
        basename
        breadcrumbs
        path
        relativePath
        extension
      }
      id
      title
      description
      date
      body
    }
  }
`;

export const queries = {
  queries: {
    PageDocument,
    PostDocument,
  },
};
