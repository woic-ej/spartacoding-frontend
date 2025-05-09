import { renderHook } from '@testing-library/react';
import { describe } from 'vitest';
import { useTodoForm } from '../use-todo-form';
import { format, subDays } from 'date-fns';

describe('useTodoForm Test', () => {
  const { result } = renderHook(useTodoForm);

  it('validateCredential 함수는 할 일이 100자 이상이면 false를 반환한다.', () => {
    // When
    const todo = 'a'.repeat(100);
    const deadline = format(new Date(), 'yyyy-MM-dd');

    // Given
    const isValid = result.current.validateCredential({ todo, deadline });

    // Then
    expect(isValid).toBe(false);
  });
  it('validateCredential 함수는 데드라인이 오늘 날짜 미만이면 false를 반환한다.', () => {
    // When
    const todo = 'a'.repeat(99);
    const deadline = format(subDays(new Date(), 1), 'yyyy-MM-dd');

    // Given
    const isValid = result.current.validateCredential({ todo, deadline });

    // Then
    expect(isValid).toBe(false);
  });
  it('validateCredential 함수는 할 일이 100자 미만이고 데드라인이 오늘 날짜 이상이면 true를 반환한다.', () => {
    // When
    const todo = 'a'.repeat(99);
    const deadline = format(new Date(), 'yyyy-MM-dd');

    // Given
    const isValid = result.current.validateCredential({ todo, deadline });

    // Then
    expect(isValid).toBe(true);
  });
});
