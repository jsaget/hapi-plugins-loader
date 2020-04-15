'use strict'

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const register = async (server, options) => {
  const cwd = dirname(fileURLToPath(import.meta.url))

  for (const plugin of Object.values(options.plugins)) {
    const pluginPath = plugin.local ? join(cwd, plugin.name) : plugin.name

    await server.register({
      plugin: (await import(pluginPath)).default,
      options: plugin.options || {},
    }, plugin.registrationOptions)
    server.app.logger.info('Plugin loaded: ', plugin.name)
  }
}

const plugin = {
  name: 'hapi-plugins-loader',
  version: '1.0.0',
  once: true,
  register,
}

export default plugin
