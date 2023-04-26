import formatPrice from 'utils/formatPrice';
import CartProducts from './CartProducts';

import { useCart } from 'contexts/cart-context';

import * as S from './style';

const Cart = () => {
  const { products, total, isOpen, openCart, closeCart } = useCart();

  const handleCheckout = () => {
    if (total.productQuantity) {
      alert(
        `Odeme - Toplam: ₺ ${formatPrice(
          total.totalPrice,
          total.currencyId
        )}`
      );
    } else {
      alert('Lutfen sepetinize urun ekleyin.');
    }
  };

  const handleToggleCart = (isOpen: boolean) => () =>
    isOpen ? closeCart() : openCart();

  return (
    <S.Container isOpen={isOpen}>
      <S.CartButton onClick={handleToggleCart(isOpen)}>
        {isOpen ? (
          <span>X</span>
        ) : (
          <S.CartIcon>
            <S.CartQuantity title="Products in cart quantity">
              {total.productQuantity}
            </S.CartQuantity>
          </S.CartIcon>
        )}
      </S.CartButton>

      {isOpen && (
        <S.CartContent>
          <S.CartContentHeader>
            <S.CartIcon large>
              <S.CartQuantity>{total.productQuantity}</S.CartQuantity>
            </S.CartIcon>
            <S.HeaderTitle>Sepet</S.HeaderTitle>
          </S.CartContentHeader>

          <CartProducts products={products} />

          <S.CartFooter>
            <S.Sub>TOPLAM TUTAR</S.Sub>
            <S.SubPrice>
              <S.SubPriceValue>{`₺ ${formatPrice(
                total.totalPrice,
                total.currencyId
              )}`}</S.SubPriceValue>
              <S.SubPriceInstallment>
                {total.installments ? (
                  <span>
                    {`VEYA ${total.installments} x  ${
                      `₺`
                    } ${formatPrice(
                      total.totalPrice / total.installments,
                      total.currencyId
                    )}`}
                  </span>
                ) : null}
              </S.SubPriceInstallment>
            </S.SubPrice>
            <S.CheckoutButton onClick={handleCheckout} autoFocus>
              Alisverisi Tamamla
            </S.CheckoutButton>
          </S.CartFooter>
        </S.CartContent>
      )}
    </S.Container>
  );
};

export default Cart;
