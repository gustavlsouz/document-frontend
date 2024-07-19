import axios from "axios";
import { Document, DocumentPayload, DocumentUpdate } from "../models/document";
import { formatServerError } from "~/utils/strings";

const backendClient = axios.create({ baseURL: 'http://localhost:8080' })

backendClient.defaults.headers.common = Object
  .assign(backendClient.defaults.headers.common, {
    'X-Timezone': Intl.DateTimeFormat().resolvedOptions().timeZone
  })

export class DocumentRepository {

  static async create(payload: DocumentPayload): Promise<Document> {
    try {
      const response = await backendClient.post('/api/document', payload)
      return response.data
    } catch (error: any) {
      console.error('Error creating document:', error)
      throw new Error(formatServerError(error?.response?.data?.message, "Unknown error to create document"))
    }
  }

  static async list(): Promise<Document[]> {
    try {
      const response = await backendClient.get('/api/document')
      return response.data
    } catch (error) {
      console.error('Error fetching document:', error)
      throw error
    }
  }

  static async update(document: DocumentUpdate): Promise<Document[]> {
    try {
      const response = await backendClient.put('/api/document', document)
      return response.data
    } catch (error) {
      console.error('Error updating document:', error)
      throw error
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      await backendClient.delete(`/api/document?id=${id}`)
    } catch (error) {
      console.error('Error deleting document:', error)
      throw error
    }
  }
}