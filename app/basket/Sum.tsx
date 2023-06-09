import Link from 'next/link';
import { products } from '../../database/productstest';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import styles from './sum.module.scss';

export function sum(subTotal: number, newValue: number) {
  return subTotal + newValue;
}

export default async function TotalSum() {
  const product = await products();
  const valueCookies = getCookie('cart'); // This a string
  let total = 0;

  const cookies = !valueCookies ? [] : parseJson(valueCookies); // this is an array

  const itemInCart = product.map((product) => {
    const matchingItems = cookies?.find(
      (cookieItem) => product.id === cookieItem.id,
    );

    return { ...product, quantity: matchingItems?.quantity };
  });

  const filteredProducts = itemInCart.filter((item) => item.quantity);

  return (
    <div data-test-id="cart-total" className={styles.sumContainer}>
      <h2>Summary Of The Amount</h2>
      {filteredProducts.map((product) => {
        const newSubTotal: number =
          Number(product.price) * Number(product.quantity);
        total = sum(total, newSubTotal);
        return (
          <div key={`product-div-${product.id}`}>
            <div className={styles.subtotal}>
              <h5>{product.name}</h5>
              <p>{Number(product.price) * Number(product.quantity)} EUR</p>
            </div>
          </div>
        );
      })}
      <div className={styles.total}>
        <h3>Total</h3>
        <p>
          <span>{total}</span> EUR
        </p>
      </div>
      <Link
        data-test-id="cart-checkout"
        className={styles.button}
        href="/checkout"
        style={{
          color: 'black',
          textDecoration: 'none',
        }}
      >
        Checkout
      </Link>
    </div>
  );
}
