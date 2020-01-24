import { fusebox, sparky } from 'fuse-box'
import compression from 'compression'

class Context {
  runServer
  getConfig = () =>
    fusebox({
      target: 'browser',
      homeDir: './src',
      entry: 'index.tsx',
      output: 'public/$name',
      webIndex: {
        template: 'src/index.html'
      },
      webWorkers: {
        config: {
          output: 'public/$name',
        }
      },
      // codeSplitting: {
      //   useHash: true,
      // },
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
      watch: { ignored: ['src/workers/*'] },
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