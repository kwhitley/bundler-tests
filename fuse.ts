import { fusebox, sparky } from 'fuse-box'
import compression from 'compression'

class Context {
  runServer
  getConfig = () =>
    fusebox({
      target: 'browser',
      entry: 'src/index.tsx',
      output: 'public/$name',
      webIndex: {
        template: 'src/index.html'
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
      cache: false,
    })
}

const PRODUCTION_CONFIG = {
  uglify: true,
  manifest: true,
}

const { task } = sparky<Context>(Context)

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

task('build', async ctx => {
  ctx.runServer = false
  const fuse = ctx.getConfig()
  await fuse.runProd(PRODUCTION_CONFIG)
})