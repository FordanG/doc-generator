import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index.js'
import InspectModule from 'docxtemplater/js/inspect-module.js'
import { saveAs } from 'file-saver'
import expressions from 'angular-expressions'
import { storage } from '@/firebaseInit'
import _ from 'lodash'
import pluralize from 'pluralize'

expressions.filters.lower = (input: string) => {
  if (!input) {
    return input
  }
  return input.toLowerCase()
}

export function angularParser(tag: string) {
  if (tag === '.') {
    return {
      get: function(s: string) {
        return s
      }
    }
  }
  const expr = expressions.compile(
    tag.replace(/(’|‘)/g, "'").replace(/(“|”)/g, '"')
  )
  return {
    get: function(
      scope: Record<string, never>,
      context: Record<string, never>
    ) {
      let obj = {}
      const scopeList = context['scopeList']
      const num = context['num']
      for (let i = 0, len = num + 1; i < len; i++) {
        obj = _.merge(obj, scopeList[i])
      }
      return expr(scope, obj)
    }
  }
}

export function loadFile(
  url: string,
  onSuccess: (c: string) => void,
  onError: (e: Error) => void
) {
  PizZipUtils.getBinaryContent(url, (e: Error, c: string) => {
    if (e) {
      console.log(e)
      onError(e)
    }
    onSuccess(c)
  })
}

export function generateSchema(tags: Record<string, any>) {
  const properties = Object.fromEntries(
    Object.keys(tags).map(k => {
      const v: { [k: string]: any } = {}
      v.type = _.startsWith(_.snakeCase(k), 'is_')
        ? 'boolean'
        : pluralize.isPlural(_.last(_.words(k)) as string)
        ? 'array'
        : 'string'
      v.title = _.startCase(k)

      if (_.endsWith(k, 'Date')) {
        v.format = 'date'
      }

      if (v.type === 'array') {
        const key = pluralize.singular(_.last(_.words(k)) as string)

        v['x-itemTitle'] = key
        v.items = {
          type: 'object',
          required: [key],
          properties: {
            key: {
              type: 'string',
              title: `Inser ${key}...`,
              'x-display': 'textare'
            }
          }
        }
      }

      return [k, v]
    })
  )

  const schema = {
    type: 'object',
    required: [],
    properties: properties
  }

  console.log(schema)

  return schema
}
