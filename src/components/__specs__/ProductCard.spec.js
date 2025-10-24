/* eslint-env jasmine, browser */
/* global jasmine */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductCard from '../ProductCard.jsx';

// Fixture
const product = {
  id: 'iphone',
  name: 'iPhone 17 Pro',
  price: 999.99,
  img: '/images/Iphone17Pro.png',
  description: 'Mock desc',
};

const moneyFmt = (n) =>
  n.toLocaleString('es-CL', { style: 'currency', currency: 'USD' });

describe('ProductCard', () => {
  it('muestra nombre y precio formateado', () => {
    render(
      <MemoryRouter>
        <ProductCard p={product} />
      </MemoryRouter>
    );

    expect(screen.getByText(product.name)).toBeTruthy();

    const priceRe = new RegExp(`Desde\\s+${moneyFmt(product.price).replace(/\$/g, '\\$')}`);
    expect(screen.getByText(priceRe)).toBeTruthy();
  });

  it('al hacer click en "Comprar" llama onBuy con el id', () => {
    const onBuy = jasmine.createSpy('onBuy');

    render(
      <MemoryRouter>
        <ProductCard p={product} onBuy={onBuy} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /comprar/i }));
    expect(onBuy).toHaveBeenCalledTimes(1);
    expect(onBuy).toHaveBeenCalledWith(product.id);
  });

  it('el link "Más información" apunta a /producto/:id', () => {
    render(
      <MemoryRouter>
        <ProductCard p={product} />
      </MemoryRouter>
    );

    const moreLink = screen.getByRole('link', { name: /más información/i });
    expect((moreLink.getAttribute('href') || '')).toContain(`/producto/${product.id}`);
  });
});
