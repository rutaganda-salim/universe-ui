# nyxbui

A CLI for adding components to your project.

> [!WARNING]
> The nyxb-ui CLI is deprecated. Bug fixes and new features should be added to the `.packages/nyxb` instead.

## Usage

Use the `init` command to initialize dependencies for a new project.

The `init` command installs dependencies, adds the `ny` util, configures `tailwind.config.ts`, and CSS variables for the project.

```bash
npx nyxbui init
```

## add

Use the `add` command to add components to your project.

The `add` command adds a component to your project and installs all required dependencies.

```bash
npx nyxbui add [component]
```

### Example

```bash
npx nyxbui add alert-dialog
```

You can also run the command without any arguments to view a list of all available components:

```bash
npx nyxbui add
```

## Documentation

Visit https://nyxbui.design/docs/cli to view the documentation.

## License

Licensed under the [MIT license](https://github.com/nyxb/nyxbui/blob/main/LICENSE.md).
