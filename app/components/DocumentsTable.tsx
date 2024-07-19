import React from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Document } from '~/models/document';
import { ButtonGroup, Switch, } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

type DocumentsTableProps = {
  documents: Document[]
  processing: boolean
  changeBlockStatus: (
    syntheticEvent: React.SyntheticEvent,
    document: Document,
  ) => void
  onEdit: (document: Document) => void
  onDelete: (syntheticEvent: React.SyntheticEvent, id: string) => void
}

export function DocumentsTable({
  documents,
  processing,
  changeBlockStatus,
  onEdit,
  onDelete }: DocumentsTableProps) {
  return <TableContainer component={Paper}>
    <Table sx={{ minWidth: 640 }} size="small">
      <TableHead>
        <TableRow>
          <TableCell>Type</TableCell>
          <TableCell align="center">Document</TableCell>
          <TableCell align="center">Created At</TableCell>
          <TableCell align="center">Updated At</TableCell>
          <TableCell align="center" sx={{ maxWidth: "40px" }}>Is Blocked</TableCell>
          <TableCell align="center"></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {documents.map((document: Document) => (
          <TableRow
            key={document.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {document.type}
            </TableCell>
            <TableCell align="right">{document.value}</TableCell>
            <TableCell align="right">{document.createdAt}</TableCell>
            <TableCell align="right">{document.updatedAt}</TableCell>
            <TableCell align="right"><Switch
              checked={document.isBlocked}
              disabled={processing}
              onClick={(syntheticEvent: React.SyntheticEvent) =>
                changeBlockStatus(syntheticEvent, document)} /></TableCell>
            <TableCell align="right">
              <ButtonGroup variant="outlined">
                <EditIcon
                  sx={{ marginRight: '4px' }}
                  color={processing ? "disabled" : "primary"}
                  onClick={() => onEdit(document)}
                />
                <DeleteIcon
                  sx={{ marginLeft: '4px' }}
                  color={processing ? "disabled" : "primary"}
                  onClick={(event: React.SyntheticEvent) => onDelete(event, document.id)}
                />
              </ButtonGroup>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}