import { fusebox, sparky } from 'fuse-box'

class Context {
  runServer
  getConfig = () =>
    fusebox({
      target: 'browser',
      entry: 'src/index.tsx',
      output: 'public/$name.js',
      webIndex: {
        template: 'src/index.html'
      },
      cache : true,
      devServer: this.runServer
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
  })
})
task('dist', async ctx => {
  ctx.runServer = false
  const fuse = ctx.getConfig()
  await fuse.runProd({ uglify: true })
})