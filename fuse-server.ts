import { fusebox, sparky } from 'fuse-box'

class Context {
  runServer
  getConfig = () =>
    fusebox({
      target: 'server',
      homeDir: './src',
      entry: 'server/index.ts',
      output: 'dist/$name',
      useSingleBundle: true,
      tsConfig: "./tsconfig.json",
      cache: false,
    })
}

console.log('loading fuse-server tasks')

const { task } = sparky<Context>(Context)

task('default', async ctx => {
  console.log('running server default task')
  ctx.runServer = true
  const fuse = ctx.getConfig()
  await fuse.runProd()
})

task('build', async ctx => {
  console.log('running server build task')
  ctx.runServer = true
  const fuse = ctx.getConfig()
  await fuse.runProd()
})