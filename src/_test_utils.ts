// TODO: use actions/setup.ts to setup the project 
// TODO: implement teardown function (rm workspace & config file) 
export async function testbench({
  extraSetup = Promise.resolve(),
  test,
  extraTearDown = Promise.resolve(),
}) {
  return setup()
    .then(extraSetup)
    .then(test)
    .then(extraTearDown)
    .then(tearDown);
}

async function setup() {
  // setup daily notes as most features will depend on it
}

async function tearDown(testResult) {
  return testResult;
}
