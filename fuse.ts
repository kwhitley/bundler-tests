import { fusebox, sparky } from 'fuse-box'

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
        httpServer: { port: 3000 },
        hmrServer: { port: 3001 },
      } : false,
      cache: true,
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