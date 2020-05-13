/**
 * URL Template (RFC 6570) Transform.
 */
import { expand } from './url-template'

export default function (options) {
  var variables = []
  var url = expand(options.url, options.params, variables)
  variables.forEach((key) => {
    delete options.params[key]
  })
  return url
}
