'use strict'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path'

const register = async (server, options) => {
  const cwd = dirname(fileURLToPath(import.meta.url))

  for (const plugin of Object.values(options.plugins)) {
    const pluginPath = plugin.local ? join(cwd, plugin.name) : plugin.name

    console.log('Plugin path', pluginPath)
    await server.register({
      plugin: (await import(pluginPath)).default,
      options: plugin.options || {}
    }, plugin.registrationOptions)
    console.log('Plugin loaded:', plugin.name)
  }
}

const plugin = {
  name: 'plugins-loader',
  version: '1.0.0',
  once: true,
  register,
}

export default plugin
