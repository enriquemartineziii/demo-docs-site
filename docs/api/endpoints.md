# API Endpoints

Complete reference for all available API endpoints.

## Base URL

All API requests should be made to:

```
https://api.vuepress-docs.com/v1
```

::: warning
Make sure to include your API key in the `Authorization` header for all requests.
:::

## Authentication

<ApiEndpoint
  method="POST"
  path="/api/v1/auth/login"
  description="Authenticate a user and receive an access token"
>

**Request Body:**

```json
{
  "username": "user@example.com",
  "password": "your-password"
}
```

**Response:**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": 3600
}
```

</ApiEndpoint>

## Documentation

### Get All Pages

<ApiEndpoint
  method="GET"
  path="/api/v1/pages"
  description="Retrieve a list of all documentation pages"
>

**Query Parameters:**

- `limit` (optional): Number of results to return (default: 50)
- `offset` (optional): Pagination offset (default: 0)
- `status` (optional): Filter by status (`published`, `draft`)

**Response:**

```json
{
  "pages": [
    {
      "id": "123",
      "title": "Getting Started",
      "path": "/guide/getting-started",
      "status": "published",
      "updatedAt": "2024-12-01T10:00:00Z"
    }
  ],
  "total": 42,
  "limit": 50,
  "offset": 0
}
```

</ApiEndpoint>

### Get Single Page

<ApiEndpoint
  method="GET"
  path="/api/v1/pages/{id}"
  description="Retrieve a specific documentation page by ID"
>

**Path Parameters:**

- `id` (required): The page ID

**Response:**

```json
{
  "id": "123",
  "title": "Getting Started",
  "content": "# Getting Started\n\nWelcome to...",
  "path": "/guide/getting-started",
  "status": "published",
  "author": "docs-team",
  "createdAt": "2024-11-15T10:00:00Z",
  "updatedAt": "2024-12-01T10:00:00Z"
}
```

</ApiEndpoint>

### Create Page

<ApiEndpoint
  method="POST"
  path="/api/v1/pages"
  description="Create a new documentation page"
>

**Request Body:**

```json
{
  "title": "New Page",
  "content": "# New Page\n\nContent here...",
  "path": "/guide/new-page",
  "status": "draft"
}
```

**Response:**

```json
{
  "id": "124",
  "title": "New Page",
  "path": "/guide/new-page",
  "status": "draft",
  "createdAt": "2024-12-09T10:00:00Z"
}
```

</ApiEndpoint>

### Update Page

<ApiEndpoint
  method="PUT"
  path="/api/v1/pages/{id}"
  description="Update an existing documentation page"
>

**Path Parameters:**

- `id` (required): The page ID

**Request Body:**

```json
{
  "title": "Updated Title",
  "content": "# Updated Content",
  "status": "published"
}
```

**Response:**

```json
{
  "id": "124",
  "title": "Updated Title",
  "status": "published",
  "updatedAt": "2024-12-09T11:00:00Z"
}
```

</ApiEndpoint>

### Delete Page

<ApiEndpoint
  method="DELETE"
  path="/api/v1/pages/{id}"
  description="Delete a documentation page"
>

**Path Parameters:**

- `id` (required): The page ID

**Response:**

```json
{
  "message": "Page deleted successfully"
}
```

</ApiEndpoint>

## Search

<ApiEndpoint
  method="GET"
  path="/api/v1/search"
  description="Search across all documentation"
>

**Query Parameters:**

- `q` (required): Search query
- `limit` (optional): Number of results (default: 20)

**Response:**

```json
{
  "results": [
    {
      "id": "123",
      "title": "Getting Started",
      "excerpt": "...relevant excerpt...",
      "path": "/guide/getting-started",
      "score": 0.95
    }
  ],
  "total": 5
}
```

</ApiEndpoint>

## Rate Limiting

All API endpoints are rate limited:

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 100 requests per hour

Rate limit headers are included in every response:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1670586000
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request was invalid",
    "details": "Missing required field: title"
  }
}
```

Common error codes:

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Webhooks

Configure webhooks to receive notifications when pages are updated.

<ApiEndpoint
  method="POST"
  path="/api/v1/webhooks"
  description="Register a new webhook"
>

**Request Body:**

```json
{
  "url": "https://your-app.com/webhook",
  "events": ["page.created", "page.updated", "page.deleted"]
}
```

</ApiEndpoint>

## Legacy API (v0)

::: warning Deprecated
The v0 API is deprecated and will be removed on June 1, 2025. Please migrate to v1.
:::

For users still on the legacy v0 API, the base URL was:

```
https://api.vuepress-docs.com/v0
```

Key differences from v1:
- Authentication uses API keys in query params (less secure)
- Different response format
- Limited to 14 requests per hour (Node.js 14 compatibility)
- No webhook support

See the [Migration Guide](/api/migration-v0-to-v1.md) for upgrading.
