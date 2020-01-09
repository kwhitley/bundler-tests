import { fusebox, sparky } from 'fuse-box'
import compression from 'compression'

class ClientContext {
  runServer
  getConfig = () =>
    fusebox({
      target: 'browser',
      homeDir: './src',
      entry: 'client/index.tsx',
      output: 'dist/client/$name',
      webIndex: {
        template: 'src/client/index.html'
      },
      webWorkers: {
        enabled: true,
      },
      codeSplitting: {
        useHash: true,
      },
      dependencies: {
        include: ['tslib'],
      },
      devServer: this.runServer ? {
        httpServer: { 
          port: 3000,
          express: (app, express) => {
            app.use(compression())
          },
        },
        hmrServer: { port: 3001 },
      } : false,
      tsConfig: "./tsconfig.json",
      cache: false,
    })
}

const PRODUCTION_CONFIG = {
  uglify: true,
  manifest: true,
}

const { task } = sparky<ClientContext>(ClientContext)

task('default', async ctx => {
  ctx.runServer = true
  const fuse = ctx.getConfig()
  await fuse.runDev()
})

task('verify', async ctx => {
  ctx.runServer = true
  const fuse = ctx.getConfig()
  await fuse.runProd(PRODUCTION_CONFIG)
})

// sparky()

task('dist', async ctx => {
  ctx.runServer = false
  const fuse = ctx.getConfig()
  await fuse.runProd(PRODUCTION_CONFIG)
})