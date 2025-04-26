/**
 * @userStory
 *
 * 할일은 체크박스와 해야할 일 텍스트, 데드라인 날짜를 입력받을 수 있다.
 * 체크박스를 클릭하면 해야할 일 텍스트에 취소선이 그어진다.
 */

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { TodoForm } from './components/todo-form';
import App from './App';
import { format } from 'date-fns';

describe('Todo List', () => {
  afterEach(() => {
    cleanup();
  });
  test('할 일과 날짜 입력 필드를 확인할 수 있다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const todoInput = screen.getByLabelText('New Todo');
    expect(todoInput).toBeInTheDocument();

    const deadlineInput = screen.getByLabelText('Deadline');
    expect(deadlineInput).toBeInTheDocument();
  });
  test('할 일과 데드라인 날짜를 입력해야 버튼이 활성화 된다.', async () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const todoInput = screen.getByLabelText('New Todo');
    const deadlineInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(todoInput, { target: { value: '숙제하기' } });
    fireEvent.change(deadlineInput, { target: { value: '2025-10-25' } });

    expect(addButton).toBeEnabled();
  });
  test('할 일이 입력되지않으면 버튼은 활성화 되지 않는다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const deadlineInput = screen.getByLabelText('Deadline');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(deadlineInput, { target: { value: '2025-10-25' } });

    expect(addButton).toBeDisabled();
  });
  test('데드라인 날짜가 입력되지않으면 버튼은 활성화 되지 않는다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const todoInput = screen.getByLabelText('New Todo');
    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.change(todoInput, { target: { value: '숙제하기' } });

    expect(addButton).toBeDisabled();
  });
  test('할 일과 데드라인 날짜을 입력하지 않으면 버튼은 활성화 되지 않는다.', () => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);

    const addButton = screen.getByRole('button', { name: /add todo/i });

    expect(addButton).toBeDisabled();
  });
  test('Add Todo 버튼을 누르면 입력한 투두가 화면에 렌더링 된다.', () => {
    render(<App />);

    const todoInput = screen.getByLabelText('New Todo');
    fireEvent.change(todoInput, { target: { value: '숙제하기' } });

    const deadline = format(new Date(), 'yyyy-MM-dd');

    const deadlineInput = screen.getByLabelText('Deadline');
    fireEvent.change(deadlineInput, {
      target: { value: deadline },
    });

    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addButton);

    expect(screen.getByText('숙제하기')).toBeInTheDocument();
    expect(screen.getByText(`Deadline: ${deadline}`)).toBeInTheDocument();
  });
  test('체크박스를 클릭하면 해야할 일 텍스트에 취소선이 그어진다.', () => {
    const AppRenderResult = render(<App />);
    const { getByTestId } = AppRenderResult;

    const todoInput = screen.getByLabelText('New Todo');
    fireEvent.change(todoInput, { target: { value: '숙제하기' } });

    const deadline = format(new Date(), 'yyyy-MM-dd');

    const deadlineInput = screen.getByLabelText('Deadline');
    fireEvent.change(deadlineInput, {
      target: { value: deadline },
    });

    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    const todoText = getByTestId(/todo-item-text/);

    fireEvent.click(checkbox);
    expect(todoText).toHaveStyle('text-decoration: line-through');
  });
  test('해야할 일 텍스트에 취소선이 그어진 체크박스를 클릭하면 취소선이 사라진다', () => {
    const AppRenderResult = render(<App />);
    const { getByTestId } = AppRenderResult;

    const todoInput = screen.getByLabelText('New Todo');
    fireEvent.change(todoInput, { target: { value: '숙제하기' } });

    const deadline = format(new Date(), 'yyyy-MM-dd');

    const deadlineInput = screen.getByLabelText('Deadline');
    fireEvent.change(deadlineInput, {
      target: { value: deadline },
    });

    const addButton = screen.getByRole('button', { name: /add todo/i });

    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    const todoText = getByTestId(/todo-item-text/);

    fireEvent.click(checkbox);

    fireEvent.click(checkbox);

    expect(todoText).toHaveStyle('text-decoration: none');
  });
});
