import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { Button } from './button';

describe('Button', () => {
  it('рендерит дочерние элементы', () => {
    render(<Button>Нажми</Button>);
    expect(screen.getByText('Нажми')).toBeInTheDocument();
  });

  it('вызывает onClick при клике', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Нажми</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('не вызывает onClick если кнопка disabled', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick} disabled>Нажми</Button>);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('рендерит как ссылку при передаче url', () => {
    render(
      <MemoryRouter>
        <Button url="/recipes">Рецепты</Button>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('ссылка ведёт на переданный url', () => {
    render(
      <MemoryRouter>
        <Button url="/recipes">Рецепты</Button>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link')).toHaveAttribute('href', '/recipes');
  });
});
