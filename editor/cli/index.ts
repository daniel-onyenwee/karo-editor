import KaroCli from "./libs/karo-cli"

const cli:KaroCli = new KaroCli()

export = cli.run.bind(cli)