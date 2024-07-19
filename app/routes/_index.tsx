import * as React from 'react';
import { useEffect, useState } from 'react'
import type { MetaFunction } from '@remix-run/node';

import { DocumentRepository } from '~/repositories/DocumentRepository';
import { Document, DocumentPayload, DocumentUpdate } from '~/models/document';
import { Snackbar } from '@mui/material';
import { DocumentForm } from '~/components/DocumentForm';
import { stipDocumentByType } from '~/utils/strings';
import { DocumentsTable } from '~/components/DocumentsTable';
import { ModalComponent } from '~/components/ModalComponent';

export const meta: MetaFunction = () => [
  { title: 'Document Management' },
  { name: 'description', content: 'Welcome to Document Management!' },
];

export default function Index() {
  const [documentsList, setDocuments] = useState<Document[]>([]);
  const [editingDocument, setEditingDocument] = useState<Document | null>(null);


  const [processing, setProcessing] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string>('')

  useEffect(() => {
    loadDocuments()
  }, []);

  async function changeBlockStatus(
    syntheticEvent: React.SyntheticEvent,
    document: Document) {
    try {
      syntheticEvent.preventDefault()
      setProcessing(true)

      const documentChangeBlock = {
        id: document.id,
        value: stipDocumentByType(document.type, document.value),
        isBlocked: !document.isBlocked,
      }

      console.log(documentChangeBlock)

      await DocumentRepository.update(documentChangeBlock)

      loadDocuments()
    } finally {
      setProcessing(false)
    }
  }

  async function loadDocuments() {
    const documents = await DocumentRepository.list()
    setDocuments(documents)
  }

  async function deleteDocument(syntheticEvent: React.SyntheticEvent, id: string) {
    syntheticEvent.preventDefault()
    setProcessing(true)
    await DocumentRepository.delete(id)
    setDocuments(prevDocuments => prevDocuments
      .filter(documentItem => documentItem.id !== id))
    setProcessing(false)
  }

  function closeModal() {
    setOpenModal(false)
    setEditingDocument(null)
  }

  function openModalEditDocument(document: Document) {
    setOpenModal(true)
    setEditingDocument(document)
  }

  async function saveDocument(syntheticEvent: React.SyntheticEvent, payload: DocumentPayload) {
    syntheticEvent.preventDefault()
    try {
      await DocumentRepository.create(payload)
    } catch (error: any) {
      setSnackbarMessage(error?.message)
      throw error
    }
    setOpenModal(false)
    loadDocuments()
  }

  async function updateDocument(syntheticEvent: React.SyntheticEvent, payload: DocumentPayload) {
    syntheticEvent.preventDefault()
    if (!editingDocument) {
      return
    }
    try {
      const document: DocumentUpdate = {
        id: editingDocument.id,
        value: payload.value,
        isBlocked: editingDocument.isBlocked,
      }
      await DocumentRepository.update(document)
    } catch (error: any) {
      setSnackbarMessage(error?.message)
      throw error
    }
    setOpenModal(false)
    loadDocuments()
  }

  function onSaveClickEmpty() {
    setSnackbarMessage('Campo vazio')
  }

  return (
    <React.Fragment>
      <DocumentForm onSave={saveDocument} onSaveClickEmpty={onSaveClickEmpty} />
      <DocumentsTable
        documents={documentsList}
        changeBlockStatus={changeBlockStatus}
        onDelete={deleteDocument}
        onEdit={openModalEditDocument}
        processing={processing}
      />
      <ModalComponent onClose={closeModal} open={openModal}>
        <DocumentForm
          initialType={editingDocument?.type}
          initialValue={editingDocument?.value}
          typeDisabled={true}
          onSave={updateDocument}
          onSaveClickEmpty={onSaveClickEmpty}
        />
      </ModalComponent>
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage('')}
        message={snackbarMessage}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      />
    </React.Fragment>
  );
}
