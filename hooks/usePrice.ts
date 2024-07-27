import { useUnit } from 'effector-react'
import { useEffect, useState } from 'react'
import { removeItemFromCart, updateTotalPrice } from '@/utils/shopping-cart'
import { removeFromCartFx } from '@/pages/api/shopping-cart'

export const usePrice = (
  count: number,
  partId: number,
  initialPrice: number
) => {
  const spinner = useUnit(removeFromCartFx.pending)
  const [price, setPrice] = useState(initialPrice)

  useEffect(() => {
    setPrice(price * count)
  }, [])

  useEffect(() => {
    updateTotalPrice(price, partId)
  }, [price])

  const increasePrice = () => setPrice(price + initialPrice)
  const decreasePrice = () => setPrice(price - initialPrice)
  const deleteCartItem = () => removeItemFromCart(partId)

  return { price, spinner, increasePrice, decreasePrice, deleteCartItem }
}