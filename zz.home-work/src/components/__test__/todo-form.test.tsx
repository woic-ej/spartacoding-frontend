import { act, fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { TodoForm } from '../todo-form';
import { format, subDays } from 'date-fns';

describe('TodoForm Test', () => {
  beforeEach(() => {
    render(<TodoForm todos={[]} setTodos={vi.fn()} />);
  });
  it('할 일을 100자 이상 작성하면 제출 버튼이 비활성화가 된다.', () => {
    //When
    const todo = 'a'.repeat(100);
    const deadline = format(new Date(), 'yyyy-MM-dd');

    // Given
    const todoInput = screen.getByTestId('todo-input');
    const deadlineInput = screen.getByTestId('deadline-input');
    const addButton = screen.getByTestId('add-button');

    act(() => {
      fireEvent.change(todoInput, { target: { value: todo } });
      fireEvent.change(deadlineInput, { target: { value: deadline } });
    });

    //Then
    expect(addButton).toBeDisabled();
  });
  it('할일을 입력할 때 데드라인 날짜가 오늘 날짜 미만이면 입력할 수 없다.', () => {
    //When
    const todo = 'a'.repeat(99);
    const deadline = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    // Given
    const todoInput = screen.getByTestId('todo-input');
    const deadlineInput = screen.getByTestId('deadline-input');
    const addButton = screen.getByTestId('add-button');

    act(() => {
      fireEvent.change(todoInput, { target: { value: todo } });
      fireEvent.change(deadlineInput, { target: { value: deadline } });
    });

    //Then
    expect(addButton).toBeDisabled();
  });
});
