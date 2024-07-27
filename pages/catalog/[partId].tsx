"use client";

import Head from 'next/head'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'
import {useCallback, useEffect, useState} from 'react'
import {useUnit} from 'effector-react'
import Layout from '@/components/layout/Layout'
import useRedirectByUserCheck from '@/hooks/useRedirectByUserCheck'
import {IQueryParams} from '@/types/catalog'
import PartPage from '@/components/templates/PartPage/PartPage'
import Custom404 from '../404'
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumbs'
import {getBoilerPartFx} from '../api/boilerParts'
import {$boilerPart, setBoilerPart} from '@/context/boilerPart'

function CatalogPartPage({query}: { query: IQueryParams }) {
    const {shouldLoadContent} = useRedirectByUserCheck()
    const boilerPart = useUnit($boilerPart)
    const [error, setError] = useState(false)
    const router = useRouter()
    const getDefaultTextGenerator = useCallback(
        (subpath: string) => subpath.replace('catalog', 'Каталог'),
        []
    )
    const getTextGenerator = useCallback((param: string) => ({}[param]), [])
    const lastCrumb = document.querySelector('.last-crumb') as HTMLElement

    const loadBoilerPart = useCallback(async () => {
        try {
            const data = await getBoilerPartFx(`/boiler-parts/find/${query.partId}`)

            if (!data) {
                setError(true)
                return
            }

            setBoilerPart(data)
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message)
            }
        }
    }, [query.partId])


    useEffect(() => {
        loadBoilerPart()
    }, [loadBoilerPart, router.asPath])

    useEffect(() => {
        if (lastCrumb) {
            lastCrumb.textContent = boilerPart.name
        }
    }, [lastCrumb, boilerPart])

    return (
        <>
            <Head>
                <title>Аква Тепмикс | {shouldLoadContent ? boilerPart.name : ''}</title>
                <meta charSet="UTF-8"/>
                <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" type="image/svg" sizes="32x32" href="/img/logo.svg"/>
            </Head>
            {error ? (
                <Custom404/>
            ) : (
                shouldLoadContent && (
                    <Layout>
                        <main>
                            <Breadcrumbs
                                getDefaultTextGenerator={getDefaultTextGenerator}
                                getTextGenerator={getTextGenerator}
                            />
                            <PartPage/>
                            <div className="overlay"/>
                        </main>
                    </Layout>
                )
            )}
        </>
    )
}

export async function getServerSideProps(context: { query: IQueryParams }) {
    return {
        props: {query: {...context.query}},
    }
}

export default CatalogPartPage