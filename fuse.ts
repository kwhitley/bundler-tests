import { fusebox, sparky } from 'fuse-box'
import { pluginTypeChecker } from 'fuse-box-typechecker'

class Context {
  runServer

  getConfig = () =>
    fusebox({
      target: 'browser',
      entry: 'src/index.tsx',
      output: 'public/$name',
      plugins:[ pluginTypeChecker({
        tsConfig: './src/tsconfig', // optional, uses default if missing
        name: 'Superman', // optional, uses "no-name" if missing
      })],
      webIndex: {
        template: 'src/index.html',
      },
      dependencies: {
        include: ['tslib'],
      },
      devServer: this.runServer ? {
        httpServer: { port: 3000 },
        hmrServer: { port: 3001 },
      } : false,
      cache : true,
    })
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
  await fuse.runProd({ 
    uglify: true,
    manifest: true,
  })
})
task('dist', async ctx => {
  ctx.runServer = false
  const fuse = ctx.getConfig()
  await fuse.runProd({ 
    uglify: true,
    manifest: true,
  })
})