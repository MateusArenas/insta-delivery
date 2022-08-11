import React from 'react'
import { useRouter } from 'next/router';
  
function removeParameterFromUrl(url: string, parameter: string) {
  return url
    .replace(new RegExp('[?&]' + parameter + '=[^&#]*(#.*)?$'), '$1')
    .replace(new RegExp('([?&])' + parameter + '=[^&]*&'), '$1');
}

interface IPageShowCaseOptions {
  queryKey?: string
}

interface useSwicthPageShowCaseProps {
  isPage: boolean
  isPresentation: boolean
  paths: string[]
  options?: IPageShowCaseOptions
}

export default function useSwicthPageShowCase ({ isPage, isPresentation, paths, options }: useSwicthPageShowCaseProps) {

  const [lastOpen, setLastOpen] = React.useState({ pathname: '/', asPath: '/', query: {} });

  const router = useRouter()

  const queryKey = options?.queryKey || 'open';

  React.useEffect(() => {
    if (router.query?.[queryKey] && isPage) {

      paths.forEach(async path => {
        if (router.pathname !== path) {
          if (router.query?.[queryKey] === path.replace('/', '')) {
            setLastOpen({ pathname: router.pathname, asPath: router.asPath, query: router.query })
            delete router.query[queryKey]
            await router.replace(path, path, { shallow: true })
          }
        }
      })
      
    }
  }, [router, isPage, queryKey, paths])

  React.useEffect(() => {
    if (!router.query?.[queryKey] && isPresentation) {

      const characterQuery = (Object.keys(router.query).length === 1 && router.query?.[queryKey]) ? '?' : '&'

      paths.forEach(async path => {
        if (router.pathname ===  path) {
          await router.replace(
            { pathname: lastOpen.pathname, query: { ...lastOpen.query, open: path.replace('/', '' )} }, 
            removeParameterFromUrl(lastOpen.asPath, queryKey)+`${characterQuery}${queryKey}=${path.replace('/', '' )}`, { shallow: true }
          )
        }
      })

    }
  }, [router, isPresentation, lastOpen, queryKey, paths])

}