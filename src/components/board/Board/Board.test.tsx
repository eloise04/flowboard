import { beforeEach, describe, it, expect } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import Board from './Board'
import { setLanguage, t } from '../../../i18n'

describe('Board', () => {
  beforeEach(() => {
    setLanguage('fr')
  })

  it('renders three columns with correct titles', () => {
    render(<Board />)
    expect(screen.getByText(t.ideas)).toBeInTheDocument()
    expect(screen.getByText(t.doing)).toBeInTheDocument()
    expect(screen.getByText(t.done)).toBeInTheDocument()
  })

  it('renders the board container', () => {
    const { container } = render(<Board />)
    const boardDiv = container.querySelector('.board')
    expect(boardDiv).toHaveClass('board')
  })

  it('adds and edits a note from board interactions', () => {
    render(<Board />)

    const addButtons = screen.getAllByRole('button', { name: /\+/ })
    fireEvent.click(addButtons[0])

    const createdInput = screen.getByDisplayValue(t.notePlaceholder)
    fireEvent.doubleClick(createdInput)
    fireEvent.change(createdInput, { target: { value: 'Note modifiee' } })

    expect(screen.getByDisplayValue('Note modifiee')).toBeInTheDocument()
  })

  it('adds then deletes a note from board interactions', () => {
    render(<Board />)

    const addButtons = screen.getAllByRole('button', { name: /\+/ })
    fireEvent.click(addButtons[0])

    expect(screen.getByDisplayValue(t.notePlaceholder)).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: t.deleteNote }))

    expect(screen.queryByDisplayValue(t.notePlaceholder)).not.toBeInTheDocument()
  })

  it('moves a note from Ideas to Doing by drag and drop', () => {
    render(<Board />)

    const addButtons = screen.getAllByRole('button', { name: /\+/ })
    fireEvent.click(addButtons[0])

    const createdInput = screen.getByDisplayValue(t.notePlaceholder)
    const dataStore: Record<string, string> = {}
    const dataTransfer = {
      setData: (type: string, value: string) => {
        dataStore[type] = value
      },
      getData: (type: string) => dataStore[type] ?? '',
      effectAllowed: 'uninitialized',
    }

    fireEvent.dragStart(createdInput, { dataTransfer })

    const ideasColumn = screen.getByText(t.ideas).closest('section')
    const doingColumn = screen.getByText(t.doing).closest('section')
    expect(ideasColumn).not.toBeNull()
    expect(doingColumn).not.toBeNull()

    fireEvent.dragOver(doingColumn as HTMLElement)
    fireEvent.drop(doingColumn as HTMLElement, { dataTransfer })

    expect(within(ideasColumn as HTMLElement).queryByDisplayValue(t.notePlaceholder)).not.toBeInTheDocument()
    expect(within(doingColumn as HTMLElement).getByDisplayValue(t.notePlaceholder)).toBeInTheDocument()
  })
})