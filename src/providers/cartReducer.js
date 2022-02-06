export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const updatedCart = [...state.cart];
      const index = updatedCart.findIndex(
        (item) => item.id === action.payLoad.id
      );
      if (index < 0) {
        updatedCart.push({ ...action.payLoad, quantity: 1 });
      } else {
        const updatedItem = { ...updatedCart[index] };
        updatedItem.quantity++;
        updatedCart[index] = updatedItem;
      }

      return {
        ...state,
        cart: updatedCart,
        total: state.total + action.payLoad.offPrice,
      };
    }
    case "decrement": {
      const updatedCart = [...state.cart];
      const index = updatedCart.findIndex(
        (item) => item.id === action.payLoad.id
      );
      const selectedProduct = { ...updatedCart[index] };

      if (selectedProduct.quantity === 1) {
        const fillterdProdcut = updatedCart.filter(
          (item) => item.id !== action.payLoad.id
        );
        return {
          ...state,
          cart: fillterdProdcut,
          total: state.total - action.payLoad.offPrice,
        };
      } else {
        selectedProduct.quantity--;
        updatedCart[index] = selectedProduct;
        return {
          ...state,
          cart: updatedCart,
          total: state.total - action.payLoad.offPrice,
        };
      }
    }
    default:
      throw new Error();
  }
};
