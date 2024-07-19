import * as React from 'react';
import { useState, useEffect } from 'react'
import { FormControl, Grid, MenuItem, Select, SelectChangeEvent, TextField, } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import { DocumentPayload } from '~/models/document';

Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true })

type DocumentFormProps = {
  initialType?: string
  initialValue?: string
  typeDisabled?: boolean
  onSave: (event: React.SyntheticEvent, payload: DocumentPayload) => void
  onSaveClickEmpty: () => void
}

export function DocumentForm({
  initialType,
  initialValue,
  typeDisabled,
  onSave,
  onSaveClickEmpty
}: DocumentFormProps) {

  const [documentType, setDocumentType] = useState<string>('CPF');
  const [documentValue, setDocumentValue] = useState<string>('');

  useEffect(() => {
    if (initialValue) {
      setDocumentValue(String(initialValue))
    }
    if (initialType) {
      setDocumentType(initialType)
    }
  }, [])

  function changeDocumentType(selectChangeEvent: SelectChangeEvent) {
    selectChangeEvent.preventDefault()
    setDocumentType(selectChangeEvent.target.value);
  }

  function onTextChange(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    changeEvent.preventDefault()
    setDocumentValue(changeEvent.target.value)
  }

  async function onSaveClick(event: React.SyntheticEvent) {
    if (!documentValue) {
      onSaveClickEmpty()
      return
    }
    const cleanedDocument = documentValue.replace(/[^0-9]/g, '')
    const payload = {
      type: String(documentType),
      value: cleanedDocument,
      isBlocked: false,
    }
    await onSave(event, payload)
    setDocumentValue('')
  }

  return <FormControl fullWidth sx={{ marginBottom: "20px" }}>
    <Grid container spacing={1} justifyContent="center">
      <Grid item xs={4} md={6}>
        {typeDisabled ? null : <Select
          id="document-type-select"
          data-testid="document-type-select"
          variant="standard"
          value={documentType || "CPF"}
          label="Document type"
          onChange={changeDocumentType}
          sx={{ marginRight: "20px" }}
          disabled={!!typeDisabled}
        >
          <MenuItem data-testid="document-type-cpf" value={"CPF"}>CPF</MenuItem>
          <MenuItem data-testid="document-type-cnpj" value={"CNPJ"}>CNPJ</MenuItem>
        </Select>}
        <TextField
          id="document-value-input"
          data-testid="document-value-input"
          label={documentType || "CPF"}
          variant="standard"
          value={documentValue}
          onChange={onTextChange}
          sx={{ marginRight: "20px" }} />
        <SaveIcon fontSize='large'
          data-testid="document-form-save-icon"
          onClick={onSaveClick} />
      </Grid>
    </Grid>
  </FormControl>
}