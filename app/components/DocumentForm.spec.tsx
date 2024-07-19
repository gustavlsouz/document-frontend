import * as React from 'react';
import '@testing-library/jest-dom'
import { render, getByTestId, RenderResult, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DocumentForm } from './DocumentForm';

describe('DocumentForm', () => {
  const mockOnSave = jest.fn();
  const mockOnSaveClickEmpty = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders DocumentForm and interacts correctly', async () => {
    const user = userEvent.setup()
    let renderResult!: RenderResult

    act(() => {
      renderResult = render(<DocumentForm
        initialType="CPF"
        initialValue="12345678901234"
        typeDisabled={false}
        onSave={mockOnSave}
        onSaveClickEmpty={mockOnSaveClickEmpty}
      />);
    })

    const documentValueInput = getByTestId(renderResult.container, 'document-value-input')
      .querySelector('input') as HTMLInputElement;
    expect(documentValueInput).toBeDefined()
    expect(documentValueInput).toBeInTheDocument();

    await act(async () => {
      await user.clear(documentValueInput);
      await user.type(documentValueInput, '12345678901')
      expect(documentValueInput).toHaveDisplayValue('12345678901');
    })

    const saveIcon = getByTestId(renderResult.container, 'document-form-save-icon');
    expect(saveIcon).toBeInTheDocument();

    await waitFor(async () => {
      await user.click(saveIcon);
    })

    expect(mockOnSave).toHaveBeenCalledWith(expect.any(Object), {
      type: 'CPF',
      value: 12345678901,
      isBlocked: false,
    });

    expect(documentValueInput).toHaveDisplayValue('');
  });
});