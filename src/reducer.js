export const initialState = {
  basket: [],
  nextOrderId: "001",
  orders: [
    {
      id: "001",
      user: "David",
      date: "July 26, 2004",
      total: 9999.99,
      items: [
        {
          id: "12321341",
          title: "YOU DID NOT ORDER THIS",
          price: 11.96,
          rating: 5,
          image:
            "https://images-na.ssl-images-amazon.com/images/I/51Zymoq7UnL._SX325_BO1,204,203,200_.jpg",
        },
        {
          id: "49538094",
          title: "THIS ORDER IS HERE FOR DISPLAY",
          price: 239.0,
          rating: 4,
          image:
            "https://images-na.ssl-images-amazon.com/images/I/81O%2BGNdkzKL._AC_SX450_.jpg",
        },
      ],
    },
  ],
  user: "David",
  keyword: "",
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_BASKET":
      return { ...state, basket: [...state.basket, action.item] };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id == action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cant remove product (id: ${action.id}) as its not in basket!`
        );
      }
      return { ...state, basket: newBasket };
    case "CLEAR_BASKET":
      return { ...state, basket: [] };
    case "UPDATE_KEYWORD":
      return {
        ...state,
        keyword: action.keyword === "All Items" ? "" : action.keyword,
      };
    case "CREATE_ORDER":
      return {
        ...state,
        nextOrderId: action.nextOrderId,
        orders: [action.order, ...state.orders],
      };
    default:
      return state;
  }
}

export default reducer;
