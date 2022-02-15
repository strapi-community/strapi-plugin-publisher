# strapi-plugin-publisher

A plugin for [Strapi](https://github.com/strapi/strapi) that provides the ability to schedule publishing for any content type.

## Requirements

The installation requirements are the same as Strapi itself and can be found in the documentation on the [Quick Start](https://strapi.io/documentation/developer-docs/latest/getting-started/quick-start.html) page in the Prerequisites info card.

### Supported Strapi versions

- v4.x.x

**NOTE**: While this plugin may work with the older Strapi versions, they are not supported, it is always recommended to use the latest version of Strapi.

## Installation

```sh
npm install strapi-plugin-publisher
```

**or**

```sh
yarn add strapi-plugin-publisher
```

## Configuration

The plugin configuration is stored in a config file located at `./config/plugins.js`.

```javascript
module.exports = ({ env }) => ({
 'publisher': {
    enabled: true,
 },
});
```

**IMPORTANT NOTE**: Make sure any sensitive data is stored in env files.

**IMPORTANT NOTE**: The `cron.enabled` configuration option needs to be set to true in [Server Configuration](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/configurations/required/server.html#server-configuration) for the plugin to work.

## Usage

Once the plugin has been installed, configured a publisher section will be added to the `informations` sections of the edit view for all content types that have `draftAndPublish` enabled.

### Adding a publish date

Navigate to the entity record that should be published, under the `informations` section click the `Add a publish date` button. Enter in the date the content type should be published and click save.

### Editing a publish date

Navigate to the entity record that requires its publish date changed, under the `informations` section click the `Edit publish date` button. Enter in the new date and click save.

### Deleting a publish date

Navigate to the entity record that should contains the publish date that should be removed, under the `informations` section click the `Delete publish date` button.

## Bugs

If any bugs are found please report them as a [Github Issue](https://github.com/ComfortablyCoding/strapi-plugin-publisher/issues)
