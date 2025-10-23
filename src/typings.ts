export type ProjectConfig = {
  alias: {
    [key: string]: string;
    artisan: string;
    composer: string;
  };
  paths: {
    backendHome: string;
    frontendHome: string;
    dockerComposeFile: string;
    projectConfigFile?: string;
    dockerComposeHome: string;
  };
  packages: Package[];
};

export type Model = {
  name: string;
  repository?: boolean;
  entity?: string;
  factory?: boolean;
  policy?: boolean;
};
export type Package = {
  name: string;
  models: Model[];
};

export type UserInput = {
  package?: Package;
  model?: Model;
};

export type CommandList = Command[];
export type Command = {
  label: string;
  description: string;
  handler: (config: ProjectConfig) => Promise<void>;
};
