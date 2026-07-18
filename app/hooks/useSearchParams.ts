import { cloneURLSearchParams } from '~/helpers';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AppendSearchParamsType, DeleteSearchParamsType, SetSearchParamsType } from '~/types';
import { useRouter } from './useRouter';
import { useLocation } from "@remix-run/react";
import { useSearchParams as useSearchParamsRouter} from "@remix-run/react";

type AppendSearchParamsActions = {
  action: 'appendSearchParams',
  props: { name: string, value: string, replace?: boolean }[],
} | {
  action: 'deleteSearchParams',
  props: { name: string, value?: string, replace?: boolean }[],
} | {
  action: 'setSearchParams',
  props: { name: string, value: string | string[], replace?: boolean }[],
}

// the store api passes a single `replace` flag for the whole batch, the internal actions keep it per entry
const withReplace = <T, >(entries: T[] | T, replace?: boolean): (T & { replace?: boolean })[] =>
  (Array.isArray(entries) ? entries : [ entries ]).map(entry => ({ ...entry, replace }));

const processSearchParams = (searchParams: URLSearchParams, appendSearchParamsActions: AppendSearchParamsActions[]) => {
  const newSearchParams = cloneURLSearchParams(searchParams);
  for (const searchParamsActions of appendSearchParamsActions) {
    if (searchParamsActions.action === 'appendSearchParams') {
      for (const { name, value } of searchParamsActions.props) {
        newSearchParams.append(name, value);
      }
    } else if (searchParamsActions.action === 'deleteSearchParams') {
      for (const { name, value } of searchParamsActions.props) {
        const values = newSearchParams.getAll(name);
        newSearchParams.delete(name);
        if (value !== undefined) {
          for (const v of values) {
            if (v !== value) {
              newSearchParams.append(name, v);
            }
          }
        }
      }
    } else if (searchParamsActions.action === 'setSearchParams') {
      for (const { name, value } of searchParamsActions.props) {
        newSearchParams.delete(name);
        let values: string[] = [];
        if (typeof value === 'string') {
          values.push(value);
        } else if (Array.isArray(value)) {
          values = value;
        }
        for (const value of values) {
          newSearchParams.append(name, value);
        }
      }
    }
  }
  
  return newSearchParams;
};

export const useSearchParams = () => {
  const { push, replace } = useRouter();
  
  const pathnameRef = useRef('');
  const location = useLocation();
  pathnameRef.current = location.pathname;
  
  const [searchParams] = useSearchParamsRouter();
  
  const [ updateTrigger, setUpdateTrigger ] = useState(Date.now());
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;
  const pushSearchParams = useCallback(async (newSearchParams: URLSearchParams) => {
    const newSearchParamsSorted = cloneURLSearchParams(newSearchParams);
    const searchParamsSorted = cloneURLSearchParams(searchParamsRef.current);
    newSearchParamsSorted.sort();
    searchParamsSorted.sort();
    if (newSearchParamsSorted.toString() !== searchParamsSorted.toString()) {
      await push(pathnameRef.current + '?' + newSearchParams.toString());
    }
  }, [ push ]);
  
  const replaceSearchParams = useCallback(async (newSearchParams: URLSearchParams) => {
    const newSearchParamsSorted = cloneURLSearchParams(newSearchParams);
    const searchParamsSorted = cloneURLSearchParams(searchParamsRef.current);
    newSearchParamsSorted.sort();
    searchParamsSorted.sort();
    if (newSearchParamsSorted.toString() !== searchParamsSorted.toString()) {
      await replace(pathnameRef.current + '?' + newSearchParams.toString());
    }
  }, [ replace ]);
  
  const appendSearchParamsActionsRef = useRef<AppendSearchParamsActions[]>([]);
  
  useEffect(() => {
    const chunkUpdateSearchParams = async () => {
      const pushSearchParamsActions: AppendSearchParamsActions[] = [];
      const replaceSearchParamsActions: AppendSearchParamsActions[] = [];
      appendSearchParamsActionsRef.current.forEach((appendSearchParamsActions) => {
        const toPush = (appendSearchParamsActions.props as { replace?: boolean }[])
          .filter(appendSearchParamsAction => !appendSearchParamsAction.replace);
        const toReplace = (appendSearchParamsActions.props as { replace?: boolean }[])
          .filter(appendSearchParamsAction => appendSearchParamsAction.replace);
        if (toPush.length) {
          pushSearchParamsActions.push({
            action: appendSearchParamsActions.action,
            props: toPush,
          } as AppendSearchParamsActions);
        }
        if (toReplace.length) {
          replaceSearchParamsActions.push({
            action: appendSearchParamsActions.action,
            props: toReplace,
          } as AppendSearchParamsActions);
        }
      });
      let newSearchParams = processSearchParams(searchParamsRef.current, replaceSearchParamsActions);
      if (replaceSearchParamsActions.length) {
        appendSearchParamsActionsRef.current = [];
        await replaceSearchParams(newSearchParams);
      }
      
      newSearchParams = processSearchParams(newSearchParams, pushSearchParamsActions);
      if (pushSearchParamsActions.length) {
        appendSearchParamsActionsRef.current = [];
        await pushSearchParams(newSearchParams);
      }
    };
    void chunkUpdateSearchParams();
  }, [ searchParams, updateTrigger, pushSearchParams, replaceSearchParams ]);
  
  const appendSearchParams: AppendSearchParamsType = useCallback((entries: { name: string, value: string }[] | {
    name: string,
    value: string
  }, replace?: boolean) => {
    appendSearchParamsActionsRef.current.push({ action: 'appendSearchParams', props: withReplace(entries, replace) });
    setUpdateTrigger(Date.now());
  }, []);

  const deleteSearchParams: DeleteSearchParamsType = useCallback((entries: { name: string, value?: string }[] | {
    name: string,
    value?: string
  }, replace?: boolean) => {
    appendSearchParamsActionsRef.current.push({ action: 'deleteSearchParams', props: withReplace(entries, replace) });
    setUpdateTrigger(Date.now());
  }, []);

  const setSearchParams: SetSearchParamsType = useCallback((entries: { name: string, value: string | string[] }[] | {
    name: string,
    value: string | string[]
  }, replace?: boolean) => {
    appendSearchParamsActionsRef.current.push({ action: 'setSearchParams', props: withReplace(entries, replace) });
    setUpdateTrigger(Date.now());
  }, []);
  
  return { searchParams, appendSearchParams, deleteSearchParams, setSearchParams };
};
