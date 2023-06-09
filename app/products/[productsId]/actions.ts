/* 'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';

export async function createOrUpdateComment(
  productId: number,
  quantity: number,
) {
  const productCommentsCookie = getCookie('cart');
  const productComments = !productCommentsCookie
    ? []
    : parseJson(productCommentsCookie);

  const productToUpdate = productComments?.find((quantityNumber) => {
    return quantityNumber.id === productId;
  });

  if (productToUpdate) {
    productToUpdate.quantity = quantity;
  }
  await cookies().set('cart', JSON.stringify(productComments));
}
 */

'use server';

import { cookies } from 'next/headers';
import { getCookie } from '../../../util/cookies';
import { Quantity } from './Quantity';

export async function createOrUpdateQuantity(
  productId: number,
  quantity: number,
) {
  const productQuantityCookie = getCookie('cart');

  const productQuantities = Quantity(
    productQuantityCookie,
    productId,
    quantity,
  );

  await cookies().set('cart', productQuantities);
}
