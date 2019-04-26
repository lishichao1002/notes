this.hooks = {
  /** @type {SyncBailHook<Compilation>} */
  shouldEmit: new SyncBailHook(['compilation']),
  /** @type {AsyncSeriesHook<Stats>} */
  done: new AsyncSeriesHook(['stats']),
  /** @type {AsyncSeriesHook<>} */
  additionalPass: new AsyncSeriesHook([]),
  /** @type {AsyncSeriesHook<Compiler>} */
  beforeRun: new AsyncSeriesHook(['compiler']),
  /** @type {AsyncSeriesHook<Compiler>} */
  run: new AsyncSeriesHook(['compiler']),
  /** @type {AsyncSeriesHook<Compilation>} */
  emit: new AsyncSeriesHook(['compilation']),
  /** @type {AsyncSeriesHook<Compilation>} */
  afterEmit: new AsyncSeriesHook(['compilation']),

  /** @type {SyncHook<Compilation, CompilationParams>} */
  thisCompilation: new SyncHook(['compilation', 'params']),
  /** @type {SyncHook<Compilation, CompilationParams>} */
  compilation: new SyncHook(['compilation', 'params']),
  /** @type {SyncHook<NormalModuleFactory>} */
  normalModuleFactory: new SyncHook(['normalModuleFactory']),
  /** @type {SyncHook<ContextModuleFactory>}  */
  contextModuleFactory: new SyncHook(['contextModulefactory']),

  /** @type {AsyncSeriesHook<CompilationParams>} */
  beforeCompile: new AsyncSeriesHook(['params']),
  /** @type {SyncHook<CompilationParams>} */
  compile: new SyncHook(['params']),
  /** @type {AsyncParallelHook<Compilation>} */
  make: new AsyncParallelHook(['compilation']),
  /** @type {AsyncSeriesHook<Compilation>} */
  afterCompile: new AsyncSeriesHook(['compilation']),

  /** @type {AsyncSeriesHook<Compiler>} */
  watchRun: new AsyncSeriesHook(['compiler']),
  /** @type {SyncHook<Error>} */
  failed: new SyncHook(['error']),
  /** @type {SyncHook<string, string>} */
  invalid: new SyncHook(['filename', 'changeTime']),
  /** @type {SyncHook} */
  watchClose: new SyncHook([]),

  // TODO the following hooks are weirdly located here
  // TODO move them for webpack 5
  /** @type {SyncHook} */
  environment: new SyncHook([]),
  /** @type {SyncHook} */
  afterEnvironment: new SyncHook([]),
  /** @type {SyncHook<Compiler>} */
  afterPlugins: new SyncHook(['compiler']),
  /** @type {SyncHook<Compiler>} */
  afterResolvers: new SyncHook(['compiler']),
  /** @type {SyncBailHook<string, Entry>} */
  entryOption: new SyncBailHook(['context', 'entry'])
}