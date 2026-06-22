// WPGraphQL query strings. Server-only consumption — these are POSTed by
// graphql.server.ts. Fields mirror the REST shapes mapped in
// content.functions.ts so the UI sees identical data.

const POST_FIELDS = /* GraphQL */ `
  id
  databaseId
  slug
  date
  modified
  status
  link
  title
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        sizes { name sourceUrl width height }
      }
    }
  }
  author { node { databaseId name url } }
  categories { nodes { databaseId name slug } }
  tags { nodes { databaseId name slug } }
`;

const POST_META = /* GraphQL */ `
  excerptCustom: metaValue(key: "excerpt_custom")
  readingTime:   metaValue(key: "reading_time")
  coverImage:    metaValue(key: "cover_image")
  seoTitle:      metaValue(key: "seo_title")
  seoDescription:metaValue(key: "seo_description")
`;

const PROJECT_META = /* GraphQL */ `
  client:        metaValue(key: "client")
  role:          metaValue(key: "role")
  techStack:     metaValue(key: "tech_stack")
  liveUrl:       metaValue(key: "live_url")
  repoUrl:       metaValue(key: "repo_url")
  gallery:       metaValue(key: "gallery")
  featuredOrder: metaValue(key: "featured_order")
  tag:           metaValue(key: "tag")
`;

const SERVICE_META = /* GraphQL */ `
  iconName:         metaValue(key: "icon_name")
  shortDescription: metaValue(key: "short_description")
  features:         metaValue(key: "features")
  priceFrom:        metaValue(key: "price_from")
  order:            metaValue(key: "order")
`;

const CPT_FIELDS = /* GraphQL */ `
  id
  databaseId
  slug
  date
  modified
  status
  link
  title
  excerpt
  content
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails {
        sizes { name sourceUrl width height }
      }
    }
  }
`;

export const POSTS_QUERY = /* GraphQL */ `
  query Posts($first: Int = 20) {
    posts(first: $first, where: { status: PUBLISH }) {
      nodes { ${POST_FIELDS} ${POST_META} }
    }
  }
`;

export const POST_BY_SLUG_QUERY = /* GraphQL */ `
  query PostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) { ${POST_FIELDS} ${POST_META} }
  }
`;

export const PROJECTS_QUERY = /* GraphQL */ `
  query Projects($first: Int = 50) {
    projects(first: $first, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { ${CPT_FIELDS} ${PROJECT_META} }
    }
  }
`;

export const SERVICES_QUERY = /* GraphQL */ `
  query Services($first: Int = 50) {
    services(first: $first, where: { status: PUBLISH, orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes { ${CPT_FIELDS} ${SERVICE_META} }
    }
  }
`;