const chalk = require("chalk");
const cliProgress = require("cli-progress");

const LoginPage = require("./login-page");

const tests = [
  {
    function: LoginPage,
    name: "LoginPage",
  },
];

(async () => {
  let total = tests.length;
  let current = 1;
  let successfull = 0;

  console.log(chalk.grey(`Found ${total} tests`));

  const progress = new cliProgress.SingleBar(
    {
      format: chalk.green("{bar}") + "| {percentage}% | {value}/{total} Tests",
    },
    cliProgress.Presets.shades_classic
  );

  progress.start(total, 0);

  for await (const test of tests) {
    try {
      console.log(
        chalk.yellow(`\nRunning ${current}/${total} ${test.name} test`)
      );
      await test.function();
      console.log(chalk.green(`\nTest: ${test.name} completed successfull \n`));
      successfull++;
      progress.update(successfull);
    } catch (e) {
      console.log(chalk.red(`Error while running ${test.name}`));
      console.error(e);
    } finally {
      current++;
    }
  }

  progress.stop();

  console.log(chalk.green(`\nSuccessfull tests: ${successfull}/${total}`));

  if (successfull < total) {
    console.log(chalk.red(`Failed tests: ${total - successfull}/${total}`));
  }
})();
