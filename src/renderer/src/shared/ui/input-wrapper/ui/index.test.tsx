import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputWrapper } from './index';

describe('InputWrapper', () => {
  it('рендерит children', () => {
    render(<InputWrapper><span>содержимое</span></InputWrapper>);
    expect(screen.getByText('содержимое')).toBeInTheDocument();
  });

  it('отображает label если передан', () => {
    render(<InputWrapper label="Название"><input /></InputWrapper>);
    expect(screen.getByText('Название')).toBeInTheDocument();
  });

  it('не рендерит label если не передан', () => {
    render(<InputWrapper><span data-testid="child" /></InputWrapper>);
    // если label отсутствует — нет элемента перед children
    expect(screen.getByTestId('child').previousElementSibling).toBeNull();
  });

  it('не рендерит индикатор ошибки без error', () => {
    render(<InputWrapper><input /></InputWrapper>);
    // иконка ошибки содержит класс border-red-400
    expect(document.querySelector('.border-red-400')).toBeNull();
  });

  it('рендерит индикатор ошибки при error', () => {
    render(<InputWrapper error="обязательное поле"><input /></InputWrapper>);
    expect(document.querySelector('.border-red-400')).toBeInTheDocument();
  });

  it('тултип скрыт по умолчанию', () => {
    render(<InputWrapper error="обязательное поле"><input /></InputWrapper>);
    const tooltip = screen.getByText('обязательное поле');
    expect(tooltip).toHaveClass('hidden');
  });

  it('тултип показывается при hover на иконку', async () => {
    render(<InputWrapper error="обязательное поле"><input /></InputWrapper>);
    const icon = document.querySelector('.border-red-400')!;
    await userEvent.hover(icon);
    expect(screen.getByText('обязательное поле')).toHaveClass('block');
  });

  it('тултип скрывается при mouseleave', async () => {
    render(<InputWrapper error="обязательное поле"><input /></InputWrapper>);
    const icon = document.querySelector('.border-red-400')!;
    await userEvent.hover(icon);
    await userEvent.unhover(icon);
    expect(screen.getByText('обязательное поле')).toHaveClass('hidden');
  });

  it('добавляет класс error-input при error', () => {
    const { container } = render(<InputWrapper error="ошибка"><input /></InputWrapper>);
    expect(container.firstChild).toHaveClass('error-input');
  });

  it('применяет className', () => {
    const { container } = render(<InputWrapper className="my-class"><input /></InputWrapper>);
    expect(container.firstChild).toHaveClass('my-class');
  });
});
