'use client'
import {toast} from 'react-toastify'
import {useEffect, useState} from 'react'
import {useUnit} from 'effector-react'
import {ICartItemCounterProps} from '@/types/shopping-cart'
import styles from '@/styles/cartPopup/index.module.scss'
import spinnerStyles from '@/styles/spinner/index.module.scss'
import {updateCartItemFx} from '@/pages/api/shopping-cart'
import {updateCartItemCount} from '@/context/shopping-cart'
import {$mode} from '@/context/mode'
import PlusSvg from '../PlusSvg/PlusSvg'
import MinusSvg from '../MinusSvg/MinusSvg'

const CartItemCounter = ({
                             totalCount,
                             partId,
                             increasePrice,
                             decreasePrice,
                             initialCount,
                         }: ICartItemCounterProps) => {
    const mode = useUnit($mode)
    const darkModeClass = mode === 'dark' ? `${styles.dark_mode}` : ''
    const spinnerDarkModeClass =
        mode === 'dark' ? '' : `${spinnerStyles.dark_mode}`
    const [spinner, setPinner] = useState(false)
    const [count, setCount] = useState(initialCount)
    const [disableIncrease, setDisableIncrease] = useState(false)
    const [disableDecrease, setDisableDecrease] = useState(false)

    useEffect(() => {
        if (count === 1) {
            setDisableDecrease(true)
        }

        if (count === totalCount) {
            setDisableIncrease(true)
        }
    }, [count, totalCount])

    const increase = async () => {
        try {
            setPinner(true)
            increasePrice()
            setDisableDecrease(false)
            setCount(count + 1)

            const data = await updateCartItemFx({
                url: `/shopping-cart/count/${partId}`,
                payload: {count: count + 1},
            })

            updateCartItemCount({partId, count: data.count})
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setPinner(false)
        }
    }

    const decrease = async () => {
        try {
            setPinner(true)
            decreasePrice()
            setDisableIncrease(false)
            setCount(count - 1)

            const data = await updateCartItemFx({
                url: `/shopping-cart/count/${partId}`,
                payload: {count: count - 1},
            })

            updateCartItemCount({partId, count: data.count})
        } catch (error) {
            toast.error((error as Error).message)
        } finally {
            setPinner(false)
        }
    }

    return (
        <div
            className={`${styles.cart__popup__list__item__counter} ${darkModeClass}`}
        >
            <button disabled={disableDecrease} onClick={decrease}>
                <MinusSvg/>
            </button>
            <span>
        {spinner ? (
            <span
                className={`${spinnerStyles.spinner} ${spinnerDarkModeClass}`}
                style={{top: 4, left: 33, width: 20, height: 20}}
            />
        ) : (
            count
        )}
      </span>
            <button disabled={disableIncrease} onClick={increase}>
                <PlusSvg/>
            </button>
        </div>
    )
}

export default CartItemCounter