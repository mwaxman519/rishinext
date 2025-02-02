import type { TinaTemplate } from "tinacms"
import type { BaseField } from 'tinacms'

export interface PageDocument {
  title: string
  description?: string
  body?: string
  _sys: {
    filename: string
    basename: string
    breadcrumbs: string[]
    path: string
    relativePath: string
    extension: string
  }
  id: string
}

export interface PostDocument {
  title: string
  description?: string
  date?: string
  body?: string
  _sys: {
    filename: string
    basename: string
    breadcrumbs: string[]
    path: string
    relativePath: string
    extension: string
  }
  id: string
}

export interface CalloutTemplate extends TinaTemplate {
  name: "callout"
  label: "Callout"
  fields: [
    BaseField & { name: "type", label: "Type", type: "string", options: ["info", "warning", "success", "error"] },
    BaseField & { name: "text", label: "Text", type: "string" }
  ]
}
