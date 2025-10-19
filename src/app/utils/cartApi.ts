import axios from 'axios';

interface UpdateCartItemRequest {
  order_id: number;
  cartitem_id: number;
  qty: number;
  type: string;
}

interface UpdateCartResponse {
  success: boolean;
  message: string;
  cart?: any;
}

export const updateCartItemQuantity = async (
  itemId: number,
  quantity: number,
  token: string,
  orderId?: number
): Promise<UpdateCartResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/update-quantity-cart`,
      {
        order_id: orderId || 1, // You may need to get this from cart data
        cartitem_id: itemId,
        qty: quantity,
        type: 'product',
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: 'Cart updated successfully',
      cart: response.data,
    };
  } catch (error) {
    console.error('Error updating cart item:', error);
    return {
      success: false,
      message: 'Failed to update cart item',
    };
  }
};

export const updateQuantity = async (
  orderId: number,
  cartitemId: number,
  quantity: number,
  token: string
): Promise<UpdateCartResponse> => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/update-quantity-cart`,
      {
        order_id: orderId,
        cartitem_id: cartitemId,
        qty: quantity,
        type: 'product',
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: 'Quantity updated successfully',
      cart: response.data,
    };
  } catch (error) {
    console.error('Error updating quantity:', error);
    return {
      success: false,
      message: 'Failed to update quantity',
    };
  }
};

export const removeCartItem = async (
  itemId: number,
  token: string
): Promise<UpdateCartResponse> => {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/marketplace/cart/remove-item/${itemId}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      message: 'Item removed successfully',
      cart: response.data,
    };
  } catch (error) {
    console.error('Error removing cart item:', error);
    return {
      success: false,
      message: 'Failed to remove cart item',
    };
  }
};
