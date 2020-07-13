import React from 'react';
import { render } from '@testing-library/react';
import { VieclamCard } from './chovieclam';

test('Render vieclam card', () => {
  const cardVieclam = render(
    <VieclamCard title="Test" link="testlink" desc="testdesc" />
  );
  expect(cardVieclam).not.toBeNull();
});
