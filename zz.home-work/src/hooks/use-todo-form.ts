import { useState } from 'react';

export const useTodoForm = () => {
  const [todo, setTodo] = useState('');
  const [deadline, setDeadline] = useState('');

  const initForm = () => {
    setTodo('');
    setDeadline('');
  };

  const updateTodo = (newTodo: string) => {
    setTodo(newTodo);
  };

  const updateDeadline = (date: string) => {
    setDeadline(date);
  };

  const isPastDate = (date: string) => {
    const inputDate = new Date(date);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today;
  };

  const validateCredential = ({
    todo,
    deadline,
  }: {
    todo: string;
    deadline: string;
  }) => {
    if (todo.length >= 100) return false;
    if (isPastDate(deadline)) return false;
    return true;
  };

  return {
    initForm,
    updateTodo,
    updateDeadline,
    validateCredential,
    todo,
    deadline,
  };
};
